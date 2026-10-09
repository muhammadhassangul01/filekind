import JsonLd from "./json-ld";
import { faqSchema, howToSchema, type Crumb } from "@/lib/seo";
import type { Faq, HowToStep } from "@/lib/content/types";

export function ToolFaq({
  faqs,
  howTo,
  extraFaqs,
}: {
  faqs: Faq[];
  howTo?: { name: string; description: string; path: string; steps: HowToStep[] };
  extraFaqs?: Faq[];
}) {
  const schemaFaqs = extraFaqs?.length ? [...faqs, ...extraFaqs] : faqs;
  if (!faqs.length) return null;
  return (
    <section className="info-panel seo-content faq-section" aria-labelledby="faq-heading">
      <JsonLd data={[faqSchema(schemaFaqs), ...(howTo ? [howToSchema(howTo)] : [])]} />
      <h2 id="faq-heading">Frequently asked questions</h2>
      {faqs.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </section>
  );
}

export const compressFaqs: Faq[] = [
  {
    question: "Can this make a file exactly 200 KB?",
    answer:
      "The compressor searches for a JPEG at or below the size you enter and verifies the final file before reporting success. It does not promise an exactly matching size, because JPEG encoding varies slightly between browsers and very detailed photos may need smaller dimensions to reach a small target.",
  },
  {
    question: "Does compressing reduce image quality?",
    answer:
      "Usually. The output is a JPEG, so visible quality can drop and PNG transparency becomes white. Reducing dimensions affects file size far more than quality settings alone, which is why the tool may scale a large photo down when a small target is set.",
  },
  {
    question: "Is my photo uploaded anywhere?",
    answer:
      "No. Compression runs in your browser with JavaScript, so the file never leaves your device. Filekind only records limited anonymous page-view and click counts, never filenames, file contents, or IP addresses.",
  },
  {
    question: "What are the size limits?",
    answer:
      "Images up to 25 MB, 16,000 pixels per side, and 48 megapixels are supported. That ceiling still covers high-resolution photos such as 7,952 by 5,304 pixels.",
  },
  {
    question: "Can I compress PNG images and keep transparency?",
    answer:
      "You can choose a PNG as the input, but the output is always a JPEG, so transparency becomes white. If you need a PNG result, compress first and then convert the file back to PNG.",
  },
];

export const compressHowTo = {
  name: "How to compress an image to a target size",
  description:
    "Choose an image, enter a KB or MB limit, and download the JPEG that fits under that limit in your browser.",
  path: "/compress-image",
  steps: [
    {
      name: "Choose an image",
      text: "Select a JPEG or PNG image up to 25 MB from your device, or drop it into the upload area.",
    },
    {
      name: "Enter your target size",
      text: "Type the maximum size in KB or MB, or start from the 200 KB preset.",
    },
    {
      name: "Generate the compressed file",
      text: "Filekind searches for a JPEG output at or below your limit and verifies the result.",
    },
    {
      name: "Download the result",
      text: "Compare the reported size and dimensions, then download the compressed JPEG.",
    },
  ] satisfies HowToStep[],
};

export const convertFaqs: Faq[] = [
  {
    question: "Which image formats can I convert?",
    answer:
      "JPG, PNG, and static WebP, in all six directions: JPG to PNG, PNG to JPG, JPG to WebP, WebP to JPG, PNG to WebP, and WebP to PNG. JPG and JPEG are the same format.",
  },
  {
    question: "Does converting a JPG to PNG restore lost quality?",
    answer:
      "No. PNG stores the pixels it receives, so JPEG compression artifacts stay in the image. Converting changes the container, not the detail that was already discarded.",
  },
  {
    question: "Are animated images supported?",
    answer:
      "Animated WebP files are rejected instead of silently losing their animation. Convert a static frame or use a tool built for animation if you need to keep it moving.",
  },
  {
    question: "Is the conversion private?",
    answer:
      "Yes. Decoding and encoding happen in your browser, so the file is never uploaded. Only anonymous page-view counts are recorded.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Every tool on Filekind is free, with no signup, no watermark, and no file history stored on a server.",
  },
];

export const imagesToPdfFaqs: Faq[] = [
  {
    question: "How do I combine several photos into one PDF?",
    answer:
      "Select your JPG, PNG, or static WebP images, drag them into the order you want, choose a page size, and create the PDF. Each image becomes one page.",
  },
  {
    question: "Which page sizes are supported?",
    answer:
      "Fit each image sizes the page around the picture, and fixed A4 or US Letter pages centre the image with optional margins and automatic or forced orientation.",
  },
  {
    question: "Can I reorder the images before creating the PDF?",
    answer:
      "Yes. Drag any row in the list to change the page order, remove rows you no longer want, and add more images before generating the file.",
  },
  {
    question: "Does this add searchable text or OCR?",
    answer:
      "No. The tool creates pages from images only, so there is no OCR and no text layer. Page content is never edited here; joining, splitting, rotating, and shrinking an existing document each have their own tool.",
  },
  {
    question: "How large can my images be?",
    answer:
      "Each image can be up to 25 MB, 16,000 pixels per side, and 48 megapixels. Files are processed locally, so the practical limit is also your device's memory.",
  },
];

export const imagesToPdfHowTo = {
  name: "How to convert images to a PDF",
  description:
    "Select images, arrange their order, pick a page size, and download one PDF with one image per page.",
  path: "/images-to-pdf",
  steps: [
    {
      name: "Select your images",
      text: "Choose one or more JPG, PNG, or static WebP images up to 25 MB each.",
    },
    {
      name: "Arrange the pages",
      text: "Drag images into the order you want them to appear in the PDF and remove any you do not need.",
    },
    {
      name: "Choose page settings",
      text: "Pick fit page, A4, or US Letter, then set orientation and an optional margin.",
    },
    {
      name: "Create and download the PDF",
      text: "Generate the file in your browser and download it as a single PDF with one image per page.",
    },
  ] satisfies HowToStep[],
};

export const pdfToImagesFaqs: Faq[] = [
  {
    question: "Does this extract the pictures inside a PDF page?",
    answer:
      "No. The tool renders each complete PDF page as one image. Embedded photos, charts, and screenshots become part of that page render instead of separate files.",
  },
  {
    question: "What are the limits?",
    answer:
      "PDFs up to 50 MB and 100 pages, with a maximum of 120 million rendered pixels and 150 MB of total output. Files are processed sequentially to keep memory use predictable.",
  },
  {
    question: "Can I download every page at once?",
    answer:
      "Yes. Use Download all ZIP to get one archive of numbered pages, or download single pages from the thumbnails.",
  },
  {
    question: "Can it open password-protected PDFs?",
    answer:
      "No. Password-protected and corrupt PDFs are rejected with a clear message. Remove the password with your PDF app first, then convert.",
  },
  {
    question: "Is my PDF uploaded?",
    answer:
      "No. Pages are rendered locally with pdf.js in your browser, so the document never leaves your device.",
  },
];

export const resizeFaqs: Faq[] = [
  {
    question: "How do I resize an image?",
    answer:
      "Choose an image, enter a percentage or an exact width and height in pixels, pick JPG or PNG output, and generate. The resized file is created in your browser and downloaded straight to your device.",
  },
  {
    question: "Does resizing reduce file size?",
    answer:
      "Usually. Fewer pixels means less data, so a downscaled photo is almost always smaller. Enlarging an image adds pixels without adding detail, so the file grows while the picture does not get sharper.",
  },
  {
    question: "Will resizing stretch my photo?",
    answer:
      "Not while the aspect ratio lock is on. Both sides scale from the original shape, so proportions stay the same. Unlock the ratio only when a form or website requires an exact width and height.",
  },
  {
    question: "What size should I choose?",
    answer:
      "Match the requirement of the place you are uploading to, or keep the long edge under 2,000 pixels for general web use. For a screen-only photo, halving both sides usually cuts the file size dramatically.",
  },
  {
    question: "Is my image uploaded?",
    answer:
      "No. The browser draws the scaled image onto a canvas on your device. Nothing is sent to a server, and no copy is kept after you close the tab.",
  },
];

export const resizeHowTo = {
  name: "How to resize an image",
  description:
    "Choose an image, set a percentage or exact pixel dimensions, pick an output format, and download the resized file from your browser.",
  path: "/resize-image",
  steps: [
    {
      name: "Choose an image",
      text: "Select a JPEG, PNG, or static WebP file up to 25 MB from your device.",
    },
    {
      name: "Set the new size",
      text: "Enter a percentage to scale the image, or type an exact width and height in pixels with the aspect ratio locked.",
    },
    {
      name: "Pick the output format",
      text: "Choose JPG for a smaller file or PNG for lossless output, and adjust JPEG quality if needed.",
    },
    {
      name: "Generate and download",
      text: "Compare the new dimensions and file size with the original, then download the resized image.",
    },
  ] satisfies HowToStep[],
};

export const mergePdfFaqs: Faq[] = [
  {
    question: "How many PDFs can I merge at once?",
    answer:
      "Up to 20 files in one run, each up to 50 MB, with a combined total of 100 pages in the finished document. If the result would be larger, remove a file or split it first.",
  },
  {
    question: "Does merging reduce the quality of the pages?",
    answer:
      "No. Pages are copied from the source files into a new document rather than printed again, so text, links, fonts, and images arrive exactly as they were.",
  },
  {
    question: "Can I change the order of the files?",
    answer:
      "Yes. Drag any file up or down the list before merging, or use the handle with the arrow keys. The order you see is the order of the pages in the result.",
  },
  {
    question: "Are my documents uploaded?",
    answer:
      "No. Each file is read and combined on your device with JavaScript. Nothing is sent to a server, and no copy is kept after you close the tab.",
  },
  {
    question: "What happens to password-protected PDFs?",
    answer:
      "They are rejected with a clear message. Remove the password in your PDF app first, then merge the unlocked copies.",
  },
];

export const mergePdfHowTo = {
  name: "How to merge PDF files",
  description: "Choose the PDFs, drag them into order, and combine them into one document in your browser.",
  path: "/merge-pdf",
  steps: [
    { name: "Choose your PDFs", text: "Select up to 20 PDF files, each up to 50 MB, from your device." },
    { name: "Arrange the order", text: "Drag the files into the sequence you want, with the first pages at the top." },
    { name: "Merge the documents", text: "Select Merge PDFs to combine everything into a single file in your browser." },
    { name: "Download the result", text: "Check the page count and size, then save the merged PDF to your device." },
  ] satisfies HowToStep[],
};

export const splitPdfFaqs: Faq[] = [
  {
    question: "How do I keep only certain pages?",
    answer:
      "Click pages in the preview to select or clear them, or type a range such as 1-3, 5, 8-10 and press Apply. The saved file contains the selected pages in their original order.",
  },
  {
    question: "Can I save every page as its own PDF?",
    answer:
      "Yes. Choose the one-PDF-per-page option and the tool returns a ZIP of single-page files, each named after its page number.",
  },
  {
    question: "Does splitting change the page content?",
    answer:
      "No. Pages are copied out of the source document, so fonts, links, images, and text stay exactly as they were. Nothing is re-rendered or re-compressed.",
  },
  {
    question: "What are the limits?",
    answer:
      "PDFs up to 50 MB and 100 pages. Thumbnails are rendered locally so you can see each page before choosing it.",
  },
  {
    question: "Can it open a password-protected PDF?",
    answer:
      "No. Password-protected and corrupt files are rejected with a clear message. Remove the password first, then split the unlocked file.",
  },
];

export const splitPdfHowTo = {
  name: "How to split a PDF",
  description: "Open a PDF, choose the pages you need by preview or range, and save them as one PDF or as single-page files.",
  path: "/split-pdf",
  steps: [
    { name: "Choose a PDF", text: "Select a PDF up to 50 MB and 100 pages. Page previews render on your device." },
    { name: "Pick the pages", text: "Click pages individually, or enter a range such as 2-4, 7 and apply it." },
    { name: "Choose how to save", text: "Keep the selection as one PDF, or save each page as a separate file in a ZIP." },
    { name: "Download", text: "Generate the split and save the result to your device." },
  ] satisfies HowToStep[],
};

export const compressPdfFaqs: Faq[] = [
  {
    question: "What do the three compression levels change?",
    answer:
      "Light re-encodes embedded photos gently, Medium drops their quality further, and Strong rebuilds them at a smaller size as well as a lower quality. The level you pick decides how much detail the pictures keep.",
  },
  {
    question: "Will the text still be selectable after compressing?",
    answer:
      "Yes. Only the images inside the PDF are rebuilt. Text, links, fonts, and page order are untouched, so copy and search keep working in the smaller file.",
  },
  {
    question: "How much smaller can my PDF get?",
    answer:
      "It depends on what is inside. Scanned pages and photo-heavy documents shrink the most, while text-only PDFs are usually already small. The result screen shows the before and after sizes so you can decide.",
  },
  {
    question: "Why did my PDF barely shrink?",
    answer:
      "Files with little or no embedded image data have almost nothing this tool can rebuild. Vector drawings, fonts, and text streams are already compact, so the tool reports that the file is already as small as it can make it.",
  },
  {
    question: "Is the document uploaded?",
    answer:
      "No. The PDF is opened, re-encoded, and saved on your device. Nothing is sent to a server, and the tab does not keep a copy.",
  },
];

export const compressPdfHowTo = {
  name: "How to compress a PDF",
  description: "Choose a PDF, pick a compression level, and download a smaller document with its text still selectable.",
  path: "/compress-pdf",
  steps: [
    { name: "Choose a PDF", text: "Select a PDF up to 50 MB and 100 pages from your device." },
    { name: "Pick a level", text: "Start with Medium, or choose Light for closest to the original and Strong for the biggest saving." },
    { name: "Compress", text: "The tool rebuilds the embedded images in your browser and keeps the text streams untouched." },
    { name: "Compare and download", text: "Check the before and after sizes, then download the smaller PDF." },
  ] satisfies HowToStep[],
};

export const rotatePdfFaqs: Faq[] = [
  {
    question: "How do I rotate one page or every page?",
    answer:
      "Use the Left and Right buttons under a page to turn just that page, or Rotate all left and Rotate all right to turn the whole document. The angle shown on each preview is applied when you save.",
  },
  {
    question: "Does rotating change the image quality?",
    answer:
      "No. Only the page display angle is stored, so the content streams are copied as they are. The result looks identical to the original, just turned.",
  },
  {
    question: "Does it fix pages that were already sideways?",
    answer:
      "Yes. The angle already set in the source file is kept and yours is added to it, so a page that opens at 90 degrees can be turned back to upright with one click.",
  },
  {
    question: "What are the limits?",
    answer:
      "PDFs up to 50 MB and 100 pages. Password-protected files are rejected, so remove the password in your PDF app first.",
  },
  {
    question: "Is my PDF uploaded?",
    answer:
      "No. Page previews render with pdf.js and the new file is written on your device. The document never leaves your browser.",
  },
];

export const rotatePdfHowTo = {
  name: "How to rotate PDF pages",
  description: "Open a PDF, turn single pages or the whole document left or right, and save a new file with the original quality.",
  path: "/rotate-pdf",
  steps: [
    { name: "Choose a PDF", text: "Select a PDF up to 50 MB and 100 pages. Previews are rendered on your device." },
    { name: "Turn the pages", text: "Rotate individual pages, or use the rotate all buttons for a document that opens sideways." },
    { name: "Save the file", text: "Select Save rotated PDF to write the new angles into a fresh document." },
    { name: "Download", text: "Save the rotated PDF to your device and check it in your PDF reader." },
  ] satisfies HowToStep[],
};

export type BreadcrumbProp = { breadcrumbs?: Crumb[] };
