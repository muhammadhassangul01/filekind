declare module "libheif-js/wasm-bundle" {
  export type HeifDisplayTarget = { data: Uint8ClampedArray; width: number; height: number };

  export type HeifImage = {
    get_width(): number;
    get_height(): number;
    display(target: HeifDisplayTarget, callback: (result: unknown) => void): void;
    free(): void;
  };

  export class HeifDecoder {
    constructor();
    decode(data: ArrayBuffer | Uint8Array): HeifImage[];
  }

  const libheif: { HeifDecoder: typeof HeifDecoder };
  export default libheif;
}
