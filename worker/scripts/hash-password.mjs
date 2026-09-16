import { pbkdf2Sync, randomBytes } from "node:crypto";
import { stdin, stdout } from "node:process";

const iterations = 310000;
const salt = randomBytes(16);

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    stdout.write(prompt);
    const wasRaw = stdin.isRaw;
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    let value = "";
    function cleanup() {
      stdin.removeListener("data", onData);
      if (stdin.isTTY) stdin.setRawMode(wasRaw ?? false);
      stdout.write("\n");
    }
    function onData(chunk) {
      const text = String(chunk);
      for (const character of text) {
        if (character === "\u0003") { cleanup(); reject(new Error("Cancelled.")); return; }
        if (character === "\r" || character === "\n") { cleanup(); resolve(value); return; }
        if (character === "\u007f") value = value.slice(0, -1);
        else value += character;
      }
    }
    stdin.on("data", onData);
  });
}

const password = await readHidden("Password: ");
if (password.length < 12) throw new Error("Use at least 12 characters.");
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
console.log(`pbkdf2$${iterations}$${salt.toString("base64url")}$${hash.toString("base64url")}`);
