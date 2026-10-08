import type { Guide } from "./types";

export const guidesB: Guide[] = [
  {
    slug: "how-to-convert-images-on-android",
    kind: "usecase",
    title: "How to Convert JPG to PNG on Android",
    metaTitle: "Convert JPG to PNG on Android for Free Online",
    description: "Convert JPG to PNG on Android in your browser with no app install, no signup, and no watermark. Your photo stays on your phone and downloads as a PNG.",
    summary: "You can convert a JPG to PNG on Android in a browser tab: choose the photo, generate the PNG, and download it. The conversion runs on your phone, so the image is never uploaded and no app or account is needed.",
    updated: "2026-09-24",
    keywords: ["convert JPG to PNG on Android", "JPG to PNG Android", "convert image on Android", "change photo format Android", "JPG to PNG", "PNG converter", "Android image converter"],
    tool: { href: "/convert-image/jpg-to-png", label: "JPG to PNG converter" },
    related: [
      { href: "/convert-image", label: "Convert image" },
      { href: "/guides/how-to-convert-jpg-to-png", label: "Convert JPG to PNG" },
      { href: "/convert-image/png-to-jpg", label: "PNG to JPG converter" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
      { href: "/glossary/png", label: "PNG format" },
    ],
    sections: [
      {
        heading: "Convert in a browser tab instead of installing an app",
        paragraphs: [
          "Most Android cameras save photos as JPEG, and a lot of converter apps in the Play Store add a watermark, show ads, or demand an account before they write a file. A browser tab skips all of that. Open the JPG to PNG converter, tap the drop zone, and pick a photo from your gallery.",
          "The page reads the image from your phone storage, converts it locally, and hands back a download. Because the work happens in the browser, the file is never sent to a server. There is no sign-in step, no stored copy of your photo, and no watermark on the result.",
        ],
        links: [{ href: "/convert-image/jpg-to-png", label: "JPG to PNG converter" }],
      },
      {
        heading: "What changes when the file becomes PNG",
        paragraphs: [
          "Conversion does not add detail that the JPEG no longer has. The JPEG discarded some data when it was saved, and PNG stores the remaining pixels without compressing them away again. Fine texture and smooth gradients come across exactly as they were, for better or worse.",
          "PNG is lossless, so the result is normally much larger than the photo you started with. You are trading bytes for a format requirement or for crisp edges on text and line art. If the size matters more than the container, compress the result before you send it.",
        ],
        list: [
          "An upload form that lists PNG and nothing else",
          "Screenshots where text edges need to stay sharp",
          "A logo or icon that needs a transparent background",
          "An editor that will re-save the file several times",
        ],
        links: [{ href: "/compare/jpg-vs-png", label: "JPG vs PNG comparison" }],
      },
      {
        heading: "HEIC photos need one extra step",
        paragraphs: [
          "Many Android phones shoot HEIC instead of JPEG. Filekind accepts JPEG, PNG, and static WebP, but it does not convert HEIC, GIF, BMP, TIFF, SVG, or AVIF files, so a HEIC photo is refused before the conversion begins.",
          "Open your camera settings and set the save format to JPEG, then reopen the photo. Your Files app shows the extension: jpg means the file is ready to convert, and heic means you still need to change the format. Some gallery apps also offer a Save as JPG or Export option that does the same job.",
        ],
        links: [{ href: "/glossary/heic", label: "HEIC files" }],
      },
      {
        heading: "Check the result before you share it",
        paragraphs: [
          "After you generate, the page shows the original size, the output size, and the pixel dimensions side by side. Download the PNG and view the preview at full size once, so you can confirm that nothing was cropped, stretched, or rotated during the conversion.",
          "The converter accepts files up to 25 MB, 16,000 pixels per side, and 48 megapixels, which covers every photo a phone produces. If the new PNG is heavier than the place you are sending it allows, run it through the compressor before you upload.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
      {
        heading: "Send the PNG where a JPEG is not accepted",
        paragraphs: [
          "The finished file keeps the original name with a .png ending, so a form or app that checks extensions will accept it. Rename nothing by hand: changing the letters after the dot does not convert the image data, and the file will still be a JPEG inside.",
          "If the same photo also has to fit a size limit, compress it after converting and compare the output size on the result screen. Both steps run in the same browser, and you can repeat them as many times as you need without creating an account.",
        ],
        links: [{ href: "/glossary/file-extension", label: "File extensions" }],
      },
    ],
    faqs: [
      {
        question: "Can I convert JPG to PNG on Android without installing an app?",
        answer: "Yes. Open the JPG to PNG converter in Chrome or any browser on your phone, choose the photo, and download the PNG. The conversion runs in the browser, so nothing is uploaded and no app is installed.",
      },
      {
        question: "Does converting a JPG to PNG improve the image quality?",
        answer: "No. A JPEG has already discarded some data, and PNG only stores what remains without losing more. The file gets larger and the format changes, but blur, noise, and artifacts from the original capture stay the same.",
      },
      {
        question: "Why is the PNG file bigger than the original photo?",
        answer: "PNG is a lossless format, so it keeps every remaining pixel instead of throwing data away. Photos usually grow well past their JPEG size after conversion, which is expected rather than a sign of a failed conversion.",
      },
      {
        question: "Why will my HEIC photo not convert?",
        answer: "Filekind accepts JPEG, PNG, and static WebP only. Change your camera save format to JPEG, or export the photo as JPG from your gallery app, then run the conversion again.",
      },
    ],
  },
  {
    slug: "how-to-make-a-pdf-from-photos",
    kind: "howto",
    title: "How to Make a PDF From Photos",
    metaTitle: "Make a PDF From Photos for Free on Any Device",
    description: "Make a PDF from photos in your browser: choose the pictures, set the page size and margins, and download one PDF with one image per page. No signup needed.",
    summary: "You can make a PDF from photos by loading the images into a browser tool, arranging them, and generating a single file with one image per page. The whole job runs on your device, and the result downloads as a normal PDF.",
    updated: "2026-09-24",
    keywords: ["make a PDF from photos", "photos to PDF", "create PDF from images", "image to PDF converter", "photo PDF", "JPG to PDF", "PDF from pictures"],
    tool: { href: "/images-to-pdf", label: "Images to PDF tool" },
    related: [
      { href: "/jpg-to-pdf", label: "JPG to PDF" },
      { href: "/guides/how-to-combine-images-into-one-pdf", label: "Combine images into one PDF" },
      { href: "/guides/how-to-make-a-photo-pdf-on-a-phone", label: "Make a photo PDF on a phone" },
      { href: "/compare/a4-vs-letter", label: "A4 vs Letter" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "Load the photos you want in the file",
        paragraphs: [
          "Open the images to PDF tool and select the pictures from your device. You can add JPEG, PNG, and static WebP files up to 25 MB each, and you can select several at once or use Add more images to keep going. Animated WebP files are rejected rather than silently flattened.",
          "Every selected image appears as a thumbnail in a numbered list. That list is your future page order, so it is worth a quick scan before you change any settings. The images stay in the browser while you work, and nothing is uploaded.",
        ],
        links: [{ href: "/images-to-pdf", label: "Images to PDF" }],
      },
      {
        heading: "Decide how the pages should look",
        paragraphs: [
          "Page settings control the paper, not the picture. Fit each image sizes the page around the photo, A4 gives every page the same 210 by 297 mm sheet, and US Letter uses the 8.5 by 11 inch sheet common in the United States. Orientation can follow each image or be forced to portrait or landscape.",
          "Margins are off by default, and a custom margin in millimeters adds white space inside the page edge. Fixed paper sizes fit and center each image without cropping or stretching, so white bands appear whenever the photo shape does not match the sheet.",
        ],
        list: [
          "Fit each image for a document that follows your photos",
          "A4 for printing outside the United States",
          "US Letter for printing in the United States",
          "No margins for photos that should fill the page",
        ],
        links: [{ href: "/compare/a4-vs-letter", label: "A4 vs Letter" }],
      },
      {
        heading: "Check the order before you generate",
        paragraphs: [
          "Drag any thumbnail to a new position to change the page order. This matters for contracts, receipts, and photo sets where the sequence carries meaning, because the tool does not renumber pages after the PDF is created.",
          "Remove a picture with its remove control if you selected the wrong file. The generator always writes one image per page, so two photos never share a sheet.",
        ],
      },
      {
        heading: "Create the PDF and download it",
        paragraphs: [
          "Select Create PDF and wait for the confirmation screen, which reports the page count and the file size of the finished document. Check that both numbers match what you expected before you download, since a missing photo usually means it was removed from the list.",
          "The downloaded file keeps a generic name, so rename it before filing it away. It opens in any PDF viewer, can be printed, and can be attached to a message like any other file.",
        ],
        links: [{ href: "/glossary/pdf", label: "PDF format" }],
      },
      {
        heading: "What this tool does not do",
        paragraphs: [
          "The result contains the images themselves, not selectable text. There is no OCR, so a photo of a printed page becomes a picture of that page rather than searchable text, and there is no PDF editing, page deletion, or PDF compression after the fact.",
          "If the file turns out too heavy for an upload form, compress the source photos first and build the PDF again. Smaller images produce a smaller document, and the source pictures can be reduced to a custom limit before you start.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    steps: [
      { name: "Choose your photos", text: "Open the images to PDF tool and select the JPEG, PNG, or static WebP files you want, up to 25 MB each." },
      { name: "Arrange the order", text: "Drag the thumbnails into the sequence you want, because each image becomes one page in the final document." },
      { name: "Set the page size", text: "Pick Fit each image, A4, or US Letter, then choose the orientation and add a margin if you need one." },
      { name: "Create the PDF", text: "Select Create PDF and wait for the page count and file size to appear." },
      { name: "Download the file", text: "Save the PDF, check the page order, and rename it before filing it away." },
    ],
    faqs: [
      {
        question: "How do I make a PDF from photos on my phone?",
        answer: "Open the images to PDF page in your phone browser, select the photos, drag them into order, and tap Create PDF. The pictures never leave the device.",
      },
      {
        question: "Does each photo become its own page?",
        answer: "Yes. The tool writes one image per page in the order shown in the list, so two photos never share a page.",
      },
      {
        question: "Can I choose A4 or US Letter paper?",
        answer: "Yes. Set the page size to A4, US Letter, or Fit each image, and set orientation to automatic, portrait, or landscape. Fixed paper sizes center the photo without cropping it.",
      },
      {
        question: "Is there a limit to how many photos I can add?",
        answer: "Each image may be up to 25 MB, and a long document grows heavy fast. Compressing or resizing the photos first lets you work with a much larger set.",
      },
    ],
  },
  {
    slug: "how-to-combine-images-into-one-pdf",
    kind: "howto",
    title: "How to Combine Images Into One PDF",
    metaTitle: "Combine Multiple Images Into One PDF File",
    description: "Combine multiple images into one PDF file in your browser. Drag pages into order, pick the paper size, and download a single PDF with no watermark or signup.",
    summary: "Combining images into one PDF takes a single browser tool: add the files, drag them into order, choose the paper size, and generate one document. Each image becomes one page, and the finished PDF downloads in one step.",
    updated: "2026-09-24",
    keywords: ["combine images into one PDF", "merge images to PDF", "multiple images to one PDF", "join pictures into PDF", "image to PDF", "combine photos PDF", "one PDF file"],
    tool: { href: "/images-to-pdf", label: "Images to PDF tool" },
    related: [
      { href: "/jpg-to-pdf", label: "JPG to PDF" },
      { href: "/png-to-pdf", label: "PNG to PDF" },
      { href: "/guides/how-to-make-a-pdf-from-photos", label: "Make a PDF from photos" },
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/compare/a4-vs-letter", label: "A4 vs Letter" },
    ],
    sections: [
      {
        heading: "Gather the images you want to join",
        paragraphs: [
          "Start by collecting the files in one place on your device, then add them all at once. The tool accepts JPEG, PNG, and static WebP images up to 25 MB each, which covers screenshots, scans, drawings, and ordinary photos.",
          "Mixed formats are fine in the same document. A PNG screenshot, a JPEG photo, and a static WebP graphic can sit next to each other, because each one is rendered onto its own page when the PDF is built.",
        ],
        links: [{ href: "/images-to-pdf", label: "Images to PDF" }],
      },
      {
        heading: "Put the pages in the right order",
        paragraphs: [
          "The list of thumbnails is the page order from top to bottom. Drag any item to a new position, and the numbering follows, so you can fix a selection you made in the wrong sequence without removing and re-adding files.",
          "Order matters most for receipts, signed pages, and step-by-step instructions, where a shuffled page changes the meaning of the document. Take ten seconds to read the numbers before generating, because the PDF is written in a single pass. The numbering stays visible in the list while you drag, so you can confirm the new order immediately.",
        ],
        list: [
          "Read the page numbers from top to bottom",
          "Drag a page up or down to correct the sequence",
          "Remove a duplicate with the remove control",
          "Add more images at any time before generating",
        ],
        links: [{ href: "/guides/how-to-make-a-photo-pdf-on-a-phone", label: "Photo PDF on a phone" }],
      },
      {
        heading: "Choose paper size, orientation, and margins",
        paragraphs: [
          "Fit each image builds a page around the picture, which suits artwork and photos whose proportions should not change. A4 and US Letter force every page to one standard sheet, which suits printing and office submission requirements.",
          "Orientation can follow each image automatically or be locked to portrait or landscape. Margins are off by default; a custom margin in millimeters adds a white border, and white space appears whenever the image shape differs from the sheet.",
        ],
        links: [{ href: "/compare/a4-vs-letter", label: "A4 vs Letter comparison" }],
      },
      {
        heading: "Generate one file and check the page count",
        paragraphs: [
          "Press Create PDF and read the confirmation, which shows the page count and the file size. A count lower than your thumbnail list means an image dropped out before generation.",
          "Download the PDF and open it once to confirm the order and the framing. From there you can print it, attach it to a message, or store it with your other documents like any PDF.",
        ],
        links: [{ href: "/glossary/pdf", label: "About PDF files" }],
      },
      {
        heading: "Keep the combined file under an upload limit",
        paragraphs: [
          "A document made from large photos grows quickly, because every page carries the full image. If the destination rejects the file, compress the source images to a lower limit first, then build the PDF again from the smaller versions.",
          "Resizing helps too when the pages only need to be read on screen, because fewer pixels per page means a lighter document. The layout settings apply in exactly the same way afterward.",
        ],
        links: [{ href: "/resize-image", label: "Resize image" }],
      },
    ],
    steps: [
      { name: "Add the images", text: "Open the images to PDF tool and select the JPEG, PNG, or static WebP files you want to join." },
      { name: "Reorder the pages", text: "Drag thumbnails up or down until the numbered list matches the order you want in the document." },
      { name: "Pick a paper size", text: "Choose Fit each image, A4, or US Letter, then set orientation to automatic, portrait, or landscape." },
      { name: "Add margins if needed", text: "Leave margins off for full-bleed pages, or enter a custom margin in millimeters for a white border." },
      { name: "Create and download", text: "Select Create PDF, confirm the page count, and download the finished file." },
    ],
    faqs: [
      {
        question: "How do I combine several images into one PDF for free?",
        answer: "Open the images to PDF tool, select every file at once, arrange the thumbnails, and press Create PDF. The tool is free, needs no account, and does not add a watermark to the document.",
      },
      {
        question: "Can I combine JPG and PNG images in the same PDF?",
        answer: "Yes. JPEG, PNG, and static WebP files can be mixed in one document, and each image is rendered onto its own page regardless of its original format.",
      },
      {
        question: "Can I change the page order after adding images?",
        answer: "Yes, at any point before you generate. Drag a thumbnail to a new position and the page numbers update, so you do not need to remove and re-add files to fix the sequence.",
      },
      {
        question: "Does the combined PDF keep the original image quality?",
        answer: "The images are placed on the pages as rendered, so a large photo stays sharp but also keeps its large file size. Compress or resize the sources first if the final document has to fit an upload limit.",
      },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-jpg",
    kind: "howto",
    title: "How to Convert a PDF to JPG",
    metaTitle: "Convert PDF to JPG Images Online for Free",
    description: "Convert a PDF to JPG images in your browser: render each page as a photo file, then download one page or the whole set as a ZIP. No signup required.",
    summary: "Converting a PDF to JPG means rendering each page as a separate photo file in your browser. You choose the PDF, generate the pages, and download them individually or together as a ZIP archive.",
    updated: "2026-09-24",
    keywords: ["convert PDF to JPG", "PDF to JPG", "PDF to images", "PDF pages to JPEG", "PDF to picture", "change PDF to JPG", "PDF to image converter"],
    tool: { href: "/pdf-to-jpg", label: "PDF to JPG tool" },
    related: [
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/pdf-to-png", label: "PDF to PNG" },
      { href: "/guides/how-to-convert-pdf-to-png", label: "Convert a PDF to PNG" },
      { href: "/guides/how-to-extract-images-from-a-pdf", label: "Extract images from a PDF" },
      { href: "/glossary/pdf", label: "PDF format" },
    ],
    sections: [
      {
        heading: "Why a PDF becomes a set of pictures",
        paragraphs: [
          "A PDF page can hold text, vectors, and images at once, which is why some apps refuse to accept it where a picture is expected. Rendering the page to JPG flattens all of that into pixels, so the result opens anywhere a photo can open.",
          "The trade is that the text stops being selectable. What you get is a picture of the page, which is ideal for previews, slides, and message attachments, and less useful if you need to copy passages out of the document. Hyperlinks and form fields on the page disappear too, because a JPG carries pixels and nothing else.",
        ],
        links: [{ href: "/pdf-to-jpg", label: "PDF to JPG tool" }],
      },
      {
        heading: "Load the PDF and pick JPG",
        paragraphs: [
          "Choose the PDF from your device. The supported limits are 50 MB per file and 100 pages, and password-protected documents are rejected with a clear message instead of producing broken output.",
          "Set the output format to JPG before you generate. JPG files are smaller than PNG files and suit photographs, screenshots, and pages you only need to view rather than edit later.",
        ],
        links: [{ href: "/glossary/pdf", label: "About PDF files" }],
      },
      {
        heading: "Generate the pages in your browser",
        paragraphs: [
          "Press the generate button and let the tool render the pages one at a time. Processing happens locally, so the document is not uploaded to a server, and a progress state tells you when the render is running.",
          "If generation stops with an error, the file is usually corrupt or protected. The total output is capped at 150 MB, so a very long or very dense document may need to be split before it can finish.",
        ],
        list: [
          "PDF up to 50 MB in size",
          "Up to 100 pages in one document",
          "Up to 150 MB of rendered output",
          "JPG or PNG as the output format",
        ],
      },
      {
        heading: "Download one page or the whole set",
        paragraphs: [
          "Each rendered page appears as a numbered thumbnail with its own download button, which is the fastest route when you only need page three. Use the ZIP option to collect every page into a single archive in one click.",
          "The archive keeps the page numbers in the filenames, so the order survives extraction. Unzip it into a folder and the pages line up with the original document from first to last.",
        ],
        links: [{ href: "/glossary/zip-file", label: "ZIP archives" }],
      },
      {
        heading: "Match the JPG to where it is going",
        paragraphs: [
          "Rendered pages carry the full resolution of the document, so a single page can still be heavy. If the destination enforces a size limit, compress each JPG after downloading, or reduce the dimensions when the page only needs to be read on screen. The result screen shows the original and output sizes side by side, so you can see exactly what the reduction saved.",
          "When the job is the reverse, building a document from pictures, send the files the other way and assemble them into a single PDF instead of attaching several separate images.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    steps: [
      { name: "Choose the PDF", text: "Open the PDF to JPG tool and select a document up to 50 MB and 100 pages." },
      { name: "Select JPG output", text: "Pick JPG as the image format so each page renders as a compressed photo file." },
      { name: "Generate the pages", text: "Start the render and wait for the numbered page thumbnails to appear." },
      { name: "Download what you need", text: "Save a single page with its download button, or take every page as one ZIP archive." },
    ],
    faqs: [
      {
        question: "How do I convert a PDF to JPG for free?",
        answer: "Open the PDF to JPG tool, choose the document, select JPG, and press generate. The pages render in your browser, and you can download them individually or as a ZIP with no account and no watermark.",
      },
      {
        question: "Does converting a PDF to JPG keep the text selectable?",
        answer: "No. Each page becomes a flat picture, so the letters are pixels rather than text you can highlight or search. Use the original PDF when you need to copy text out of the document.",
      },
      {
        question: "Why is my PDF not converting?",
        answer: "Password-protected documents are not supported, and a corrupt file will fail as well. Files over 50 MB or documents longer than 100 pages also exceed the current limits.",
      },
      {
        question: "Can I convert only one page of a PDF?",
        answer: "Generate the pages and download just the thumbnail you want. The tool still renders the whole document, but you are free to save a single page instead of the full set.",
      },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-png",
    kind: "howto",
    title: "How to Convert a PDF to PNG",
    metaTitle: "Convert PDF to PNG Images Online for Free",
    description: "Convert a PDF to PNG images in your browser and render every page as a lossless PNG, then download pages one by one or as a ZIP file. Free with no signup.",
    summary: "Converting a PDF to PNG renders each page of the document as a separate PNG image in your browser. You set the format, generate the pages, and download them individually or together as a ZIP.",
    updated: "2026-09-24",
    keywords: ["convert PDF to PNG", "PDF to PNG", "PDF pages to PNG", "PDF to image", "change PDF to PNG", "PDF to pictures", "render PDF as PNG"],
    tool: { href: "/pdf-to-png", label: "PDF to PNG tool" },
    related: [
      { href: "/pdf-to-jpg", label: "PDF to JPG" },
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/guides/how-to-convert-pdf-to-jpg", label: "Convert a PDF to JPG" },
      { href: "/glossary/png", label: "PNG format" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
    ],
    sections: [
      {
        heading: "Pick PNG when the page has to stay crisp",
        paragraphs: [
          "PNG stores every pixel without discarding data, so diagrams, tables, and screenshots full of small text keep hard edges after rendering. JPG is kinder to file size but softens fine detail, which is visible on dense pages and thin lines. If the page will be proofread or re-read later, the lossless render gives you a cleaner surface to work from.",
          "The difference shows up in the download. A PNG page is normally much heavier than the same page as a JPG, so choose PNG for accuracy and JPG when the image only has to be viewed or shared quickly.",
        ],
        links: [{ href: "/compare/jpg-vs-png", label: "JPG vs PNG" }],
      },
      {
        heading: "Load the PDF and set the output format",
        paragraphs: [
          "Choose the document from your device. Inputs are limited to 50 MB and 100 pages, and password-protected files are rejected with a clear message rather than rendered as blank images.",
          "Select PNG as the output format, then start the render. Everything happens locally in the browser, so the document is not uploaded to a server and no account is involved in the job.",
        ],
        links: [{ href: "/pdf-to-png", label: "PDF to PNG tool" }],
      },
      {
        heading: "Let the pages render one at a time",
        paragraphs: [
          "Pages are rendered sequentially with a bounded resolution so browser memory stays predictable. Dense documents take longer than text-only ones, and the progress state tells you the tool is still working rather than stalled.",
          "The output ceiling is 150 MB of images in total. If the render stops with an error, the document is probably corrupt, or the combined pages would pass that ceiling, in which case splitting the PDF first is the way forward.",
        ],
        list: [
          "PDF input up to 50 MB",
          "Up to 100 pages per document",
          "Up to 150 MB of rendered images",
          "No support for password-protected files",
        ],
      },
      {
        heading: "Download individual pages or one archive",
        paragraphs: [
          "Every page appears as a numbered thumbnail with its own download button, which is quickest when you need a single page out of a long document. The ZIP option collects all of them into one archive in a single click.",
          "Filenames keep their page numbers, so the sequence survives extraction. That makes it easy to line the PNGs up against the original document or to rename only the pages you plan to use.",
        ],
        links: [{ href: "/glossary/zip-file", label: "ZIP archives" }],
      },
      {
        heading: "Reduce the pages if the set is too heavy",
        paragraphs: [
          "PNG pages from a graphically rich document can be large, and a hundred of them add up fast. If the destination has a size limit, compress the pages you downloaded or resize them to the dimensions they will actually be displayed at.",
          "The compressor takes JPEG or PNG and writes a smaller JPEG, so expect a format change on the way down. Use it when the page only has to be read on screen, and keep the PNG masters for anything you will edit later. Open the result screen first and compare the original size with the output size, so you know how much each page shrank.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    steps: [
      { name: "Choose the PDF", text: "Open the PDF to PNG tool and select a document up to 50 MB and 100 pages." },
      { name: "Select PNG output", text: "Set the image format to PNG so each page renders without further lossy compression." },
      { name: "Generate the pages", text: "Start the render and wait until the numbered page thumbnails are ready." },
      { name: "Download the images", text: "Save the pages you need individually, or take the whole document as one ZIP archive." },
    ],
    faqs: [
      {
        question: "How do I convert a PDF to PNG without losing quality?",
        answer: "Use PNG as the output format, because the render writes every pixel of the page into the file. The conversion itself adds no compression loss, and the work happens in your browser with no signup.",
      },
      {
        question: "What is the difference between PDF to JPG and PDF to PNG?",
        answer: "Both render each page as an image. JPG produces smaller files and suits photographs, while PNG keeps fine lines and text edges exact but produces noticeably larger pages.",
      },
      {
        question: "Can I convert a password-protected PDF to PNG?",
        answer: "No. Password-protected documents are not supported, and the tool reports that instead of producing blank pages. Remove the password with the program that set it, then run the conversion again.",
      },
      {
        question: "Is the text in the PNG still searchable?",
        answer: "No. Each page becomes pixels, so there is no selectable or searchable text layer. Keep the original PDF when you need to copy passages out of the document.",
      },
    ],
  },
  {
    slug: "how-to-extract-images-from-a-pdf",
    kind: "howto",
    title: "How to Extract Images From a PDF",
    metaTitle: "Extract Images From a PDF for Free Online",
    description: "Extract images from a PDF for free by rendering each page as a JPG or PNG in your browser, then download a single page or the whole set as a ZIP.",
    summary: "You can extract images from a PDF by rendering each page as a JPG or PNG in your browser and downloading the results. The tool produces full-page images, not the individual photos embedded inside a page.",
    updated: "2026-09-24",
    keywords: ["extract images from PDF", "PDF image extractor", "pull pictures from PDF", "PDF to images", "save PDF pages as images", "PDF to JPG", "PDF pictures"],
    tool: { href: "/pdf-to-images", label: "PDF to images tool" },
    related: [
      { href: "/pdf-to-jpg", label: "PDF to JPG" },
      { href: "/pdf-to-png", label: "PDF to PNG" },
      { href: "/guides/how-to-convert-pdf-to-jpg", label: "Convert a PDF to JPG" },
      { href: "/images-to-pdf", label: "Images to PDF" },
      { href: "/glossary/pdf", label: "PDF format" },
    ],
    sections: [
      {
        heading: "Know what you will get back",
        paragraphs: [
          "A PDF page can contain several separate pictures, but it is delivered to your screen as one flat page. This tool follows that rule: it renders the complete page, so what you receive is an image of the whole page with all of its content in place.",
          "That is exactly right for previews, slides, lesson handouts, and sharing a page with someone who cannot open PDF files. It is the wrong tool when you want one embedded photo by itself, because the surrounding page comes with it. In that case, treat the page render as a starting point rather than the final asset.",
        ],
        links: [{ href: "/pdf-to-images", label: "PDF to images tool" }],
      },
      {
        heading: "Choose the PDF and the image format",
        paragraphs: [
          "Select a document up to 50 MB. Password-protected files are not supported, and a corrupt file is reported rather than half-rendered, so you always know whether the job can continue.",
          "JPG is the better choice for pages that are mostly photographs or scans, since the files stay smaller. PNG suits pages full of text, tables, and line drawings where hard edges matter more than bytes.",
        ],
        links: [{ href: "/glossary/pdf", label: "About PDF files" }],
      },
      {
        heading: "Render the pages and download what you need",
        paragraphs: [
          "Press generate and wait for the numbered thumbnails. Each page has its own download button, so saving page seven alone takes one click and leaves the rest of the document alone.",
          "Use the ZIP button to pull every page down as a single archive. The filenames carry the page numbers, which keeps the order intact once the files are extracted into a folder on your device.",
        ],
        list: [
          "One PDF up to 50 MB and 100 pages",
          "JPG or PNG as the output format",
          "Individual page downloads or one ZIP archive",
          "Up to 150 MB of rendered output in total",
        ],
      },
      {
        heading: "Limits worth checking before you start",
        paragraphs: [
          "Long documents and image-heavy pages push the 150 MB output ceiling quickly. If the render stops partway, the document is likely too dense to finish in one pass, and splitting it will let the remaining pages render. Documents that sit inside all three limits normally finish on the first attempt.",
          "There is no OCR anywhere in the workflow, so a scanned page becomes a picture of words rather than words you can select. The files are produced in the browser, and none of the document is sent to a server.",
        ],
        links: [{ href: "/glossary/ocr", label: "OCR" }],
      },
      {
        heading: "When you need only part of a page",
        paragraphs: [
          "Filekind has no crop tool, so a rendered page keeps everything it contains, including margins and surrounding content. If you need a fragment, take the page image into an editor that can cut it down.",
          "For the reverse job, when the pictures already exist as files, skip the PDF step and build the document directly from them. That path keeps the original photos intact instead of round-tripping them through a page render.",
        ],
        links: [{ href: "/images-to-pdf", label: "Images to PDF" }],
      },
    ],
    steps: [
      { name: "Choose the PDF", text: "Open the PDF to images tool and select a document up to 50 MB, with no password on it." },
      { name: "Pick JPG or PNG", text: "Choose JPG for smaller files or PNG when fine text and lines need to stay exact." },
      { name: "Render the pages", text: "Press generate and wait for the numbered thumbnails to appear." },
      { name: "Download the results", text: "Save single pages with their own buttons, or take the full set as one ZIP archive." },
    ],
    faqs: [
      {
        question: "Can I extract the individual photos embedded in a PDF?",
        answer: "Not with this tool. It renders complete pages as JPG or PNG images, so embedded pictures arrive with the rest of the page around them. Extracting a single embedded photo would need a different kind of program.",
      },
      {
        question: "How do I extract images from a PDF for free?",
        answer: "Open the PDF to images tool, choose the document, select the output format, and press generate. Pages render in your browser, and you can download them one at a time or as a ZIP with no account and no watermark.",
      },
      {
        question: "Does this work on scanned PDFs?",
        answer: "Yes, as long as the file is not password-protected. A scanned document is a picture of a page to begin with, so rendering it gives you a clean image file of each page.",
      },
      {
        question: "Why is the extracted image so large?",
        answer: "Pages render at the resolution of the document, and PNG keeps every pixel. Compress or resize the downloaded images if they have to fit an upload limit or a folder budget.",
      },
    ],
  },
  {
    slug: "how-to-resize-an-image",
    kind: "howto",
    title: "How to Resize an Image",
    metaTitle: "Resize an Image Online Free in Your Browser",
    description: "Resize an image online free: set the exact pixel width and height, keep the aspect ratio locked, and download a JPG or PNG without installing software.",
    summary: "Resizing an image means changing its pixel dimensions, and you can do it in a browser by entering a width and height or a percentage. The tool keeps the aspect ratio locked and writes a JPG or PNG file you can download.",
    updated: "2026-09-24",
    keywords: ["resize an image", "image resizer", "resize photo", "change image dimensions", "resize image online", "scale image", "image size in pixels"],
    tool: { href: "/resize-image", label: "Resize image tool" },
    related: [
      { href: "/compress-image", label: "Compress image" },
      { href: "/guides/how-to-reduce-photo-resolution", label: "Reduce photo resolution" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
      { href: "/glossary/image-resizing", label: "Image resizing" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
    ],
    sections: [
      {
        heading: "Work out the size you need first",
        paragraphs: [
          "Resizing works best when you know the destination. A form may state a maximum of 600 pixels wide, a website layout may have a fixed slot, and a print job may need a specific pixel count. Write that number down before you open the tool.",
          "If no size is specified, decide how large the image will actually be displayed. A photo shown in a narrow column does not need camera-resolution pixels, and carrying the full size only makes the file heavier for no visible benefit.",
        ],
        links: [{ href: "/glossary/image-dimensions", label: "Image dimensions" }],
      },
      {
        heading: "Resize by pixels or by percent",
        paragraphs: [
          "Pixel mode sets the output exactly: enter a width and height and the image is resampled to those numbers. Percent mode scales the current size, so entering 50 percent halves each side and leaves you with a quarter of the original pixels.",
          "The aspect ratio lock keeps the shape of the picture. With the lock on, entering one dimension calculates the other, which is what stops faces and circles from stretching. Turn it off only when a form demands an exact non-matching shape.",
        ],
        list: [
          "Pixels for an exact target such as 1200 by 630",
          "Percent for a quick reduction such as 50 percent",
          "Aspect lock on to keep proportions and avoid distortion",
          "JPG output for photos, PNG output for transparency",
        ],
        links: [{ href: "/glossary/aspect-ratio", label: "Aspect ratio" }],
      },
      {
        heading: "Choose the output format",
        paragraphs: [
          "The tool writes a JPG or a PNG file. JPG suits photographs and keeps the result small, while PNG holds a transparent background instead of filling it with white.",
          "Resizing does not convert the file into something it was not. A JPG stays a JPG unless you choose PNG output, and neither format restores detail that a previous edit already threw away.",
        ],
        links: [{ href: "/convert-image", label: "Convert image" }],
      },
      {
        heading: "Check the numbers on the result",
        paragraphs: [
          "Check the new dimensions after you generate, because a single wrong digit is the difference between a 1200 pixel image and a 120 pixel one. Download only once the numbers match the target you set.",
          "Inputs are accepted up to 25 MB, 16,000 pixels per side, and 48 megapixels. Oversized files are rejected with a message that shows the current width and height, so you can see exactly which limit was hit.",
        ],
      },
      {
        heading: "Resize when you want fewer bytes, compress when you want a limit",
        paragraphs: [
          "Fewer pixels almost always means a smaller file, which is why resizing is the first move when an image is too heavy. It is not a guarantee of a specific size, because detail and format still decide how many bytes each pixel costs.",
          "When a form names a hard limit such as 200 KB, follow resizing with compression. The compressor takes the resized image and works toward a maximum you choose, then reports the final size so you can verify it.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    steps: [
      { name: "Open the resize tool", text: "Load the resize page and choose the image you want to change, up to 25 MB." },
      { name: "Enter the target size", text: "Type the pixel width and height, or switch to percent mode to scale the current dimensions." },
      { name: "Keep the aspect ratio", text: "Leave the aspect lock on so the tool calculates the second dimension and the picture is not distorted." },
      { name: "Pick the output format", text: "Choose JPG for a photograph or PNG when the image has a transparent background." },
      { name: "Generate and check", text: "Press generate, check the new dimensions, and download the file once they match your target." },
    ],
    faqs: [
      {
        question: "Does resizing an image reduce its file size?",
        answer: "Usually, yes, because fewer pixels carry fewer bytes. It does not guarantee a specific size, so use the compressor when a form names a hard limit in KB or MB.",
      },
      {
        question: "Will resizing make my photo look bad?",
        answer: "Reducing dimensions moderately looks clean, because the tool averages pixels down. Enlarging beyond the original size cannot invent detail, so an upscaled image looks soft rather than sharper.",
      },
      {
        question: "How do I resize an image without changing its proportions?",
        answer: "Leave the aspect ratio lock on and enter one dimension; the tool calculates the other. The shape of the picture stays the same and nothing is stretched or squashed.",
      },
      {
        question: "Can I resize a PNG with a transparent background?",
        answer: "Yes, and choose PNG output so the transparency is kept. JPG has no way to store transparency, so a JPG result fills the empty background with white.",
      },
    ],
  },
  {
    slug: "how-to-reduce-photo-resolution",
    kind: "howto",
    title: "How to Reduce Photo Resolution",
    metaTitle: "Reduce Photo Resolution in Megapixels Online",
    description: "Reduce photo resolution in megapixels by entering smaller pixel dimensions in your browser. Keep the aspect ratio locked and download the resized JPG or PNG.",
    summary: "Reducing photo resolution means lowering the number of pixels the image contains, which you can do by entering a smaller width and height in a browser tool. Fewer pixels means a lighter file and a lower megapixel count.",
    updated: "2026-09-24",
    keywords: ["reduce photo resolution", "lower image resolution", "reduce megapixels", "change photo resolution", "reduce image pixels", "image resolution reducer", "megapixel calculator"],
    tool: { href: "/resize-image", label: "Resize image tool" },
    related: [
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
      { href: "/glossary/megapixel", label: "Megapixel" },
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "What a megapixel actually counts",
        paragraphs: [
          "A megapixel is one million pixels, and a pixel is one stored dot in a raster image. Multiply the width by the height and you have the pixel count, so a 4000 by 3000 photo holds 12 million pixels, which is 12 megapixels.",
          "Resolution is therefore a property of size in pixels, not of how sharp the photo looks. A camera can produce a high-resolution file of a soft scene, and a modest file can look perfectly crisp at the size it is displayed.",
        ],
        links: [{ href: "/glossary/megapixel", label: "Megapixel explained" }],
      },
      {
        heading: "Calculate the dimensions you want",
        paragraphs: [
          "Decide the target count and then pick dimensions that fit your aspect ratio. A 4 by 3 image at 1600 by 1200 is 1.92 million pixels, just under 2 megapixels, while 1920 by 1080 is about 2.07 megapixels in a 16 by 9 shape.",
          "Doubling or halving each side changes the count much faster than it changes the look. Halving both dimensions leaves you with a quarter of the pixels, which is why resolution drops so quickly in percent mode.",
        ],
        list: [
          "Multiply width by height to get the pixel count",
          "Divide by one million to read it in megapixels",
          "Halve both sides to drop to a quarter of the pixels",
          "Keep the same ratio so nothing is distorted",
        ],
      },
      {
        heading: "Enter the new size with the aspect lock on",
        paragraphs: [
          "Open the resize tool, choose the photo, and enter the target width and height in pixels. With the aspect ratio lock on, typing one dimension fills in the other, so the shape of the image survives the reduction.",
          "Percent mode is the quick route when you only know that the image should be smaller. Enter 50 percent to halve each side, or 25 percent to keep a quarter of the original dimensions.",
        ],
        links: [{ href: "/resize-image", label: "Resize image tool" }],
      },
      {
        heading: "Resolution, file size, and DPI are three different things",
        paragraphs: [
          "File size is the amount of stored data, resolution is the width and height in pixels, and DPI describes how those pixels are spaced when the image is printed. Reducing resolution usually reduces file size, but compression decides the final number of bytes.",
          "Changing DPI alone does not shrink a file, because the stored pixels stay exactly the same. Adjust it only when a print workflow asks for a specific value, and treat pixel dimensions as the control that matters on screen.",
        ],
        links: [{ href: "/glossary/dpi", label: "DPI" }],
      },
      {
        heading: "Confirm the reduction and go further if needed",
        paragraphs: [
          "Check the new dimensions once the job finishes, so you can verify that the megapixel count really dropped. Inputs are accepted up to 16,000 pixels per side and 48 megapixels, and larger files are refused with a clear message.",
          "If the file still exceeds a size limit after reduction, compress it next. Fewer pixels give the compressor less work, so a reduced image reaches a modest target far more easily than the original does.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    steps: [
      { name: "Check the current resolution", text: "Note the width and height of the photo and multiply them to see how many megapixels it holds." },
      { name: "Set a target pixel count", text: "Decide the dimensions you need for the destination, keeping the same aspect ratio as the original." },
      { name: "Open the resize tool", text: "Choose the photo and enter the new width and height, or use percent mode for a proportional cut." },
      { name: "Keep the aspect ratio locked", text: "Leave the lock on so the tool calculates the missing dimension and the image is not distorted." },
      { name: "Verify the result", text: "Check the new dimensions after generating, then download the file and confirm the megapixel count." },
    ],
    faqs: [
      {
        question: "How do I reduce the resolution of a photo to 2 megapixels?",
        answer: "Enter pixel dimensions that multiply to about two million, such as 1600 by 1200 for a 4 by 3 photo, in the resize tool, then check the new pixel count before you download.",
      },
      {
        question: "Does lower resolution mean a smaller file?",
        answer: "Almost always, because there are fewer pixels to store. The exact size still depends on the format and detail, so use the compressor when a form states a specific KB or MB limit.",
      },
      {
        question: "Does changing DPI reduce the resolution?",
        answer: "No. DPI only affects how pixels are spaced in print, and the stored image is unchanged. Reduce the pixel dimensions if you want a genuinely lower resolution.",
      },
      {
        question: "Can I undo a resolution reduction?",
        answer: "Not on the file you already saved, because the discarded pixels are gone. Keep the original photo somewhere safe and make a reduced copy for the task at hand.",
      },
    ],
  },
  {
    slug: "how-to-resize-a-photo-for-a-website",
    kind: "usecase",
    title: "How to Resize a Photo for a Website",
    metaTitle: "Resize Photos for Websites in Exact Sizes",
    description: "Resize a photo for a website in the exact pixels the page needs, keep the proportions intact, and compress it so the upload passes your site limit.",
    summary: "Resizing a photo for a website means matching the pixel dimensions the page calls for, then compressing the file so it loads quickly. You can do both in a browser, with the aspect ratio locked and no software installed.",
    updated: "2026-09-24",
    keywords: ["resize photo for website", "website image size", "resize image for web", "exact image size", "web image dimensions", "compress image for website", "featured image size"],
    tool: { href: "/resize-image", label: "Resize image tool" },
    related: [
      { href: "/compress-image", label: "Compress image" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/glossary/aspect-ratio", label: "Aspect ratio" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/guides/how-to-keep-image-quality-when-compressing", label: "Compress without losing quality" },
    ],
    sections: [
      {
        heading: "Find the size the page expects",
        paragraphs: [
          "Every slot on a website has a shape and a width. A blog header, a product thumbnail, and a profile picture each call for different pixels, and the required number is usually written in the theme documentation, the form instructions, or the upload dialog that rejected your file.",
          "If nothing states a size, measure the slot in the browser or check the other images already on the page. Consistency matters more than a magic number, so images that share a row should share a width and a shape.",
        ],
        links: [{ href: "/glossary/image-dimensions", label: "Image dimensions" }],
      },
      {
        heading: "Resize to exact pixels without distortion",
        paragraphs: [
          "Open the resize tool, choose the photo, and enter the width and height the page wants in pixel mode. Keep the aspect ratio lock on while you type, and the tool fills in the second dimension so the picture is not stretched.",
          "When the required shape differs from your photo, decide what to give up. Filekind has no crop tool, so a mismatched ratio is written as it stands and the destination site may trim the edges itself. Choose dimensions that already match the slot and the problem disappears.",
        ],
        list: [
          "Match the width of the slot the image sits in",
          "Match the height when the layout fixes it",
          "Use the aspect lock to keep the subject undistorted",
          "Give every image in the same row the same width",
        ],
        links: [{ href: "/resize-image", label: "Resize image tool" }],
      },
      {
        heading: "Consider a larger image for sharp screens",
        paragraphs: [
          "A photo displayed at 800 pixels wide can look soft on a high-density phone screen if that is all the file holds. Serving a file with more pixels than the visible slot lets the browser scale it down, which keeps edges clean on those displays.",
          "The cost is bytes, so this is a deliberate trade rather than a default. Use it for hero images that carry the design, and stick to the exact slot size for thumbnails and galleries where dozens of files load together.",
        ],
        links: [{ href: "/glossary/resolution", label: "Resolution" }],
      },
      {
        heading: "Compress so the upload passes",
        paragraphs: [
          "Hosting panels, content forms, and page builders often state a maximum file size. After resizing, run the image through the compressor with that maximum as your target, and read the reported output size before you download it.",
          "The compressor searches for a JPEG at or below the limit you enter rather than promising an exact number, and it checks the final file before it reports success. Very detailed images may lose some pixel dimensions on the way down to a tight target.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
      {
        heading: "Format, naming, and the final check",
        paragraphs: [
          "JPG is the safe default for photographs, PNG holds transparency for logos, and WebP is worth considering for a modern site because it keeps quality at a lower byte count. The converter handles all three conversions when the site asks for a specific format.",
          "Rename the file with words that describe the picture before you upload, because the name becomes part of the page address. Then preview the post or form once, and confirm that the image sits at the size you planned rather than blowing past its slot.",
        ],
        links: [{ href: "/convert-image", label: "Convert image" }],
      },
    ],
    faqs: [
      {
        question: "What size should I resize my photo to for a website?",
        answer: "Match the slot the image will occupy, since the theme or form usually lists a width. If no size is given, match the width of the images already on that page so the layout stays even.",
      },
      {
        question: "Does a bigger image make my website slower?",
        answer: "It adds bytes that every visitor downloads, so oversized files do slow a page down. Resize to the slot, compress to a sensible limit, and save the extra pixels only for images that genuinely need them.",
      },
      {
        question: "Should I upload JPG, PNG, or WebP?",
        answer: "Use JPG for photographs, PNG when the image has transparency, and WebP when the site accepts it and you want a smaller file at similar quality. The converter moves any of them to either of the others.",
      },
      {
        question: "Why does my image get cropped after I upload it?",
        answer: "The site is trimming it to fit its own slot, which usually means the shape did not match. Resize to the dimensions the layout expects and the crop disappears.",
      },
    ],
  },
  {
    slug: "how-to-make-a-photo-pdf-on-a-phone",
    kind: "usecase",
    title: "How to Make a Photo PDF on Your Phone",
    metaTitle: "Make a Photo PDF on iPhone or Android Free",
    description: "Make a photo PDF on iPhone or Android from your phone browser: pick the pictures, set A4 or Letter pages, and download one PDF with no app or account.",
    summary: "You can make a photo PDF on your phone by opening the images to PDF tool in your mobile browser, selecting the pictures, and downloading the finished document. No app is needed, and the photos never leave the device.",
    updated: "2026-09-24",
    keywords: ["photo PDF on phone", "make PDF from photos on iPhone", "PDF from photos Android", "phone photo to PDF", "scan photos to PDF", "images to PDF on phone", "mobile PDF creator"],
    tool: { href: "/images-to-pdf", label: "Images to PDF tool" },
    related: [
      { href: "/guides/how-to-make-a-pdf-from-photos", label: "Make a PDF from photos" },
      { href: "/jpg-to-pdf", label: "JPG to PDF" },
      { href: "/compare/a4-vs-letter", label: "A4 vs Letter" },
      { href: "/compress-image", label: "Compress image" },
      { href: "/glossary/heic", label: "HEIC files" },
    ],
    sections: [
      {
        heading: "Open the tool in your phone browser",
        paragraphs: [
          "The images to PDF page works in Safari, Chrome, and any other mobile browser, so there is nothing to install and no account to create. Load the page, and the drop zone becomes a button that opens your photo picker.",
          "Everything runs on the phone itself. The selected pictures are read from your library, arranged in the page, and written into a PDF locally, so the file is never uploaded to a server while you work.",
        ],
        links: [{ href: "/images-to-pdf", label: "Images to PDF" }],
      },
      {
        heading: "Select the photos, and check the format first",
        paragraphs: [
          "Tap the picker and choose several pictures at once. JPEG, PNG, and static WebP files up to 25 MB each are accepted, and each one you select appears as a numbered thumbnail ready to become a page.",
          "iPhones save photos as HEIC by default, and many Android phones do the same. Those files are rejected, so change your camera format to Most Compatible or JPEG, or export the pictures as JPEG from your gallery, before you start.",
        ],
        links: [{ href: "/glossary/heic", label: "HEIC files" }],
      },
      {
        heading: "Arrange the pages for the job",
        paragraphs: [
          "Drag thumbnails into the order you want, because the list order is the page order. Receipts, forms, and a set of photos meant to be read in sequence all depend on getting this right the first time.",
          "Choose Fit each image when the pictures should keep their own proportions, A4 for printing in most of the world, and US Letter for printing in the United States. Orientation follows each photo unless you lock it, and margins stay off until you add them.",
        ],
        list: [
          "Fit each image to keep photo proportions",
          "A4 for printing outside the United States",
          "US Letter for printing in the United States",
          "A custom margin when you need a white border",
        ],
        links: [{ href: "/compare/a4-vs-letter", label: "A4 vs Letter" }],
      },
      {
        heading: "Download and send it from your phone",
        paragraphs: [
          "Press Create PDF and the confirmation shows the page count and file size. Download the document, and it lands in your Files or Downloads folder like any other download, ready to open in your PDF viewer.",
          "From there the share sheet handles the rest: attach it to a message, upload it to a portal, or send it to a printer. Rename it while it is still easy to find, so a week later you can tell which document it is.",
        ],
      },
      {
        heading: "Keep the document light enough to send",
        paragraphs: [
          "Photo PDFs grow quickly on a phone, because camera images carry many megapixels. If the recipient or portal sets a size limit, compress the pictures first and build the document again from the smaller files.",
          "Resizing helps too when the pages only need to be read on a screen. Fewer pixels per page means a lighter attachment, and the page settings you chose apply in exactly the same way afterward.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    faqs: [
      {
        question: "Can I make a PDF from photos on my iPhone for free?",
        answer: "Yes. Open the images to PDF page in Safari, select the photos, and download the result. The tool is free, needs no account, and does not add a watermark to the document.",
      },
      {
        question: "Why won't my iPhone photos add to the PDF?",
        answer: "They are probably saved as HEIC, which the tool does not accept. Switch your camera format to Most Compatible, or export the photos as JPEG, and they will load normally.",
      },
      {
        question: "How many photos can I put in one PDF on a phone?",
        answer: "Each image may be up to 25 MB, and the pages add up in file size quickly. Compressing the photos first keeps the document manageable when it has to be sent from a phone.",
      },
      {
        question: "Can I print the photo PDF directly from my phone?",
        answer: "Yes. Download the file, open it in your PDF viewer, and use the print option. Choose A4 or US Letter before generating if you already know which paper is in the printer.",
      },
    ],
  },
  {
    slug: "how-to-check-an-image-file-size",
    kind: "howto",
    title: "How to Check an Image File Size",
    metaTitle: "How to Check an Image File Size on Any Device",
    description: "Learn how to check an image file size on Windows, Mac, iPhone, and Android in a few taps, then compare it with a limit and compress if it is too big.",
    summary: "Checking an image file size takes a moment on any device: open the file's details and read the number in kilobytes or megabytes. You can then compare it against the limit you need to meet and compress the image if it is too large.",
    updated: "2026-09-24",
    keywords: ["check image file size", "how to see image size", "image file size", "check photo size KB", "view image size", "image size on phone", "picture file size"],
    tool: { href: "/compress-image", label: "Compress image tool" },
    related: [
      { href: "/glossary/file-size", label: "File size" },
      { href: "/glossary/kilobyte", label: "Kilobytes" },
      { href: "/guides/why-is-my-image-file-so-big", label: "Why your image file is so big" },
      { href: "/resize-image", label: "Resize image" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
    ],
    sections: [
      {
        heading: "Check the size on a computer",
        paragraphs: [
          "On Windows, right-click the image, open Properties, and read the size on the General tab; the Details tab shows the pixel dimensions alongside it. On a Mac, select the file and press Command plus I, or use Get Info from the File menu.",
          "Both dialogs report the same thing: how many bytes the file occupies on the disk. That number is what an upload form measures when it rejects a file, so compare it directly against the stated limit.",
        ],
        links: [{ href: "/glossary/file-size", label: "File size explained" }],
      },
      {
        heading: "Check the size on a phone",
        paragraphs: [
          "On Android, open the Files by Google app, select the image, and open Details from the menu to see the size in kilobytes or megabytes. Most gallery apps hide this number, which is why the file manager is the quicker route.",
          "On an iPhone or iPad, open the Files app, locate the image, and open its information panel to read the size. If the picture still lives only in your Photos library, save a copy to Files first so the details are available.",
        ],
        links: [{ href: "/glossary/kilobyte", label: "Kilobytes and megabytes" }],
      },
      {
        heading: "Read the number against the limit",
        paragraphs: [
          "Limits are usually written in KB or MB, and the difference matters. Filekind counts 1 KB as 1,000 bytes, so a 2 MB allowance is 2,000 KB, and an image showing 1.8 MB sits comfortably inside it while one showing 2.4 MB does not.",
          "File size and image dimensions are separate values. A photo can measure 600 by 400 pixels and still weigh too much, and a large image can be small if it was compressed well, so check both numbers when a form specifies them.",
        ],
        list: [
          "KB for small images such as profile photos",
          "MB for full-size camera pictures",
          "Pixels for the width and height of the picture",
          "Compare the size with the limit, not with another file",
        ],
      },
      {
        heading: "Check the size after you change the file",
        paragraphs: [
          "The compressor shows the original size and the output size side by side on its result screen, which is the fastest way to confirm a change without leaving the browser. The reported number is measured on the finished file.",
          "Browsers also list downloaded files with their sizes in the downloads page, so you can verify a file straight after saving it. Differences of a few bytes between tools are normal rounding, not a sign that the file changed.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
      {
        heading: "Compress when the file is over the limit",
        paragraphs: [
          "Enter the maximum the destination allows, in KB or MB, and generate. The tool searches for a JPEG at or below that maximum and verifies the final file, because it cannot promise an exactly matching size.",
          "If the first result is still further from the limit than you would like, reduce the pixel dimensions and try again. Smaller images need fewer bytes, and a combined resize and compress pass usually clears even tight requirements.",
        ],
        links: [{ href: "/resize-image", label: "Resize image" }],
      },
    ],
    steps: [
      { name: "Locate the image", text: "Find the file in your file manager, Files app, or browser downloads list." },
      { name: "Open its details", text: "Right-click and open Properties on Windows, use Get Info on a Mac, or open Details in a phone file manager." },
      { name: "Read the size", text: "Note the value in KB or MB, and check the pixel dimensions if the requirement mentions them." },
      { name: "Compare with the limit", text: "Put the size next to the stated maximum to see whether the file already qualifies." },
      { name: "Compress if needed", text: "Enter the maximum as your target, generate, and confirm the reported output size before downloading." },
    ],
    faqs: [
      {
        question: "How do I check the size of an image without an app?",
        answer: "Right-click the file and open Properties on Windows, or select it and press Command plus I on a Mac. On a phone, open the Files app and read the file details.",
      },
      {
        question: "What is the difference between file size and image dimensions?",
        answer: "File size is the number of bytes the file takes up, while dimensions are the width and height in pixels. Reducing one does not automatically reduce the other, which is why forms often state both.",
      },
      {
        question: "How do I check the size of an image on Android?",
        answer: "Open a file manager such as Files by Google, select the picture, and open Details. Gallery apps usually hide the size, so the file manager gives you the number faster.",
      },
      {
        question: "Why does the size look different in different places?",
        answer: "Tools round numbers differently, and some count a kilobyte as 1,024 bytes while others use 1,000, so small gaps are normal. The number that matters is the one the destination measures when it checks your upload.",
      },
    ],
  },
  {
    slug: "how-to-open-a-webp-image",
    kind: "guide",
    title: "How to Open a WebP Image",
    metaTitle: "How to Open a WebP Image File on Any Device",
    description: "Learn how to open a WebP image on any device, why some apps refuse the format, and how to convert it to JPG or PNG in your browser in seconds.",
    summary: "A WebP image opens in any modern browser, and apps that refuse it can be satisfied by converting the file to JPG or PNG. The conversion runs in your browser, so the picture is never uploaded and no software is installed.",
    updated: "2026-09-24",
    keywords: ["open WebP image", "WebP file", "how to view WebP", "WebP to JPG", "WebP won't open", "open WebP on phone", "convert WebP"],
    tool: { href: "/convert-image/webp-to-jpg", label: "WebP to JPG converter" },
    related: [
      { href: "/convert-image/webp-to-png", label: "WebP to PNG" },
      { href: "/glossary/webp", label: "WebP format" },
      { href: "/glossary/static-webp", label: "Static WebP" },
      { href: "/compare/jpg-vs-webp", label: "JPG vs WebP" },
      { href: "/guides/how-to-convert-webp-to-jpg", label: "Convert WebP to JPG" },
    ],
    sections: [
      {
        heading: "Open it in a browser first",
        paragraphs: [
          "The fastest way to look at a WebP file is to drag it into a browser tab, or to right-click it and choose your browser as the program to open it with. Every current browser renders WebP natively, on a phone or a computer.",
          "You can also make the browser the default program for WebP files, so a double-click opens the picture straight away. This is a viewing route only: the file stays in WebP format, and the next program you try may still refuse it.",
        ],
        links: [{ href: "/glossary/webp", label: "About WebP" }],
      },
      {
        heading: "Convert the file when an app refuses it",
        paragraphs: [
          "Older image editors, some Windows photo apps, and plenty of upload forms still expect JPG or PNG. Open the WebP to JPG converter, choose the file, and generate a JPG that those programs accept without complaint.",
          "The conversion happens locally in the browser and the file is not sent anywhere. Inputs are limited to 25 MB, 16,000 pixels per side, and 48 megapixels, which covers images from the web and from a camera alike.",
        ],
        links: [{ href: "/convert-image/webp-to-jpg", label: "WebP to JPG converter" }],
      },
      {
        heading: "Do not just rename the extension",
        paragraphs: [
          "Changing the letters after the dot from webp to jpg does not convert anything. The bytes inside are still WebP, so careful programs will keep refusing the file, and programs that trust the name may open it and then save a broken copy.",
          "A real conversion rewrites the image data into the new format, which is what those applications actually read. It takes a few seconds and produces a file that behaves correctly everywhere, not just in the app that happened to trust the name.",
        ],
        links: [{ href: "/glossary/file-extension", label: "File extensions" }],
      },
      {
        heading: "Static or animated makes a difference",
        paragraphs: [
          "WebP comes in two flavors. A static WebP is a single still picture, while an animated WebP holds a moving sequence like a GIF. The difference decides which programs will accept the file and which tools can work with it.",
          "Filekind accepts static WebP only, and animated files are rejected rather than flattened into their first frame. If you need to work with an animated file, keep it as it is and use a tool built for animation, because a still conversion silently drops the motion.",
        ],
        links: [{ href: "/glossary/static-webp", label: "Static WebP" }],
      },
      {
        heading: "Choose the output that suits the next step",
        paragraphs: [
          "JPG is the right answer when the file is a photograph or the destination only lists JPG, because it stays small and opens everywhere. Choose PNG when the original has transparency that you need to keep, since JPG has no way to store an empty background.",
          "WebP itself is already small at similar quality, so if your goal is a lighter page rather than compatibility, leaving the file alone is usually the right call. Converting is about what the receiving program accepts, not about which format is better in general.",
        ],
        links: [{ href: "/convert-image/webp-to-png", label: "WebP to PNG converter" }],
      },
    ],
    faqs: [
      {
        question: "How do I open a WebP image on Windows?",
        answer: "Right-click the file, choose Open with, and pick a browser, since every current browser renders WebP. If the built-in photo app will not open it, convert the file to JPG and open the result instead.",
      },
      {
        question: "How do I open a WebP image on my phone?",
        answer: "Tap the file and it should open in your browser or gallery, because phone browsers support WebP natively. When an app shows an unsupported format message, convert the file in the browser and open the JPG.",
      },
      {
        question: "Can I convert WebP to JPG for free?",
        answer: "Yes. Open the WebP to JPG converter, choose the image, and generate the result. The conversion runs in your browser with no account, no watermark, and no upload to a server.",
      },
      {
        question: "Will renaming a WebP file to JPG make it open?",
        answer: "It may fool an app that only reads the extension, but the data inside is still WebP. Convert the file properly instead, so the program receives an image it can decode without errors.",
      },
    ],
  },
  {
    slug: "how-to-upload-large-photos-to-a-website",
    kind: "usecase",
    title: "How to Upload Large Photos to a Website",
    metaTitle: "Upload Large Photos When a Size Limit Applies",
    description: "Upload large photos to a website with a size limit by compressing the file to just under the maximum, then checking the result before you send it.",
    summary: "When a website refuses a photo for being too large, the fix is to compress the file to just under the stated limit and upload the result. You can do that in a browser, and the tool reports the final size so you know the upload will pass.",
    updated: "2026-09-24",
    keywords: ["upload large photos", "photo too big to upload", "reduce photo size for upload", "image upload limit", "compress photo for upload", "photo over size limit", "website photo limit"],
    tool: { href: "/compress-image", label: "Compress image tool" },
    related: [
      { href: "/glossary/upload-limit", label: "Upload limits" },
      { href: "/resize-image", label: "Resize image" },
      { href: "/guides/how-to-compress-a-photo-to-200kb", label: "Compress a photo to 200 KB" },
      { href: "/guides/how-to-compress-a-picture-for-email", label: "Compress a picture for email" },
      { href: "/glossary/file-size", label: "File size" },
    ],
    sections: [
      {
        heading: "Read the limit before you touch the photo",
        paragraphs: [
          "Most rejections state the maximum in KB or MB, and the number in the error message is the one that counts. Forms sometimes mention pixel dimensions as well, and a file can fail for either reason, so note both before you start changing anything.",
          "If no message appears, check the upload instructions or the help page for the portal. Knowing whether the ceiling is 200 KB or 2 MB changes the approach entirely, because a photograph from a camera can sit well above both.",
        ],
        links: [{ href: "/glossary/upload-limit", label: "Upload limits" }],
      },
      {
        heading: "Check the current size of the photo",
        paragraphs: [
          "Open the file details on your device and read the size, then compare it with the limit. The gap tells you how aggressive the reduction has to be: a photo that is slightly over needs a light pass, while one many times over needs fewer pixels as well.",
          "Check the dimensions too. Some sites reject a file on pixel count even when the bytes are acceptable, and a large photo can be brought down in size and pixels in two quick steps.",
        ],
        links: [{ href: "/resize-image", label: "Resize image" }],
      },
      {
        heading: "Compress to just under the maximum",
        paragraphs: [
          "Open the compressor, choose the photo, and enter the limit as your target in KB or MB, or use the 200 KB preset when that matches the requirement. The tool searches for a JPEG at or below that maximum and verifies the finished file before it reports success.",
          "It does not promise an exactly matching size, so read the output number on the result screen. If the target is very tight for a detailed image, the tool may also reduce pixel dimensions to get under it, which is usually fine for an upload.",
        ],
        list: [
          "Enter the site limit as the maximum size",
          "Use the 200 KB preset when that is the stated cap",
          "Check the reported output size before downloading",
          "Resize first if the target is far below the original",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
      {
        heading: "Watch for transparency and format changes",
        paragraphs: [
          "The compressor always writes a JPEG, so a PNG logo with a transparent background comes back with a white background instead. If transparency matters, keep the original PNG and reduce the image by other means, or accept the filled background before you upload.",
          "JPEG output suits photographs and screenshots, which is what most upload forms expect. When a portal explicitly asks for PNG or WebP, convert the compressed result afterward so the file matches the stated format exactly.",
        ],
        links: [{ href: "/convert-image", label: "Convert image" }],
      },
      {
        heading: "Work through a folder one image at a time",
        paragraphs: [
          "There is no batch compression here, so a folder of photos means repeating the same short pass for each file. Choose an image, enter the target, generate, and download, then move to the next one.",
          "That rhythm is quick once the target is set, and it has a useful side effect: you see every result. Files that come out surprisingly small or still look heavy stand out immediately, and you can adjust the target for the rest of the batch.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does a website say my photo is too large to upload?",
        answer: "The file exceeds the maximum the site accepts, which is usually stated in KB or MB. Compress the image to just under that number and upload the new file instead of the original.",
      },
      {
        question: "How do I get a photo under 200 KB for an upload?",
        answer: "Enter 200 KB as the maximum in the compressor, or use the 200 KB preset, and generate. The result screen shows the final size, so you can confirm it sits at or below the limit before uploading.",
      },
      {
        question: "Can I compress many photos at once?",
        answer: "Not with this tool, which handles one image per pass. Repeat the steps for each file; it takes a few seconds each and lets you check the reported size individually.",
      },
      {
        question: "Will compressing change my photo?",
        answer: "The output is a JPEG, so quality is adjusted to reach the target and a transparent background becomes white. Very small targets may also reduce the pixel dimensions, which is how the file gets under a tight limit.",
      },
    ],
  },
  {
    slug: "why-is-my-image-file-so-big",
    kind: "guide",
    title: "Why Is My Image File So Big?",
    metaTitle: "Why Your Image File Is So Large and How to Fix It",
    description: "Find out why your image file is so large, from high resolution to lossless formats, and learn how to reduce it in your browser without guesswork.",
    summary: "An image file is usually large because it holds a lot of pixels or because it is stored in a format that keeps every one of them. Both causes are fixable: reduce the dimensions, compress to a target size, and keep an original copy for later.",
    updated: "2026-09-24",
    keywords: ["why is my image file so big", "image file too large", "photo file size too big", "reduce image file size", "large image file", "image size reduction", "why are photos so big"],
    tool: { href: "/compress-image", label: "Compress image tool" },
    related: [
      { href: "/resize-image", label: "Resize image" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/glossary/image-compression", label: "Image compression" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
      { href: "/guides/how-to-reduce-image-size-in-kb", label: "Reduce image size in KB" },
    ],
    sections: [
      {
        heading: "More pixels means more bytes",
        paragraphs: [
          "Camera phones write files with many millions of pixels, and every one of them has to be stored. A photo measuring 4000 by 3000 pixels holds 12 million values, which is why a single picture can weigh several megabytes straight out of the camera.",
          "Resolution is the width and height of the image, and it is the factor you can change most decisively. Halving both dimensions leaves a quarter of the pixels, so the file shrinks sharply while the picture still looks fine at normal viewing sizes.",
        ],
        links: [{ href: "/glossary/megapixel", label: "Megapixels" }],
      },
      {
        heading: "The format decides how each pixel is stored",
        paragraphs: [
          "JPEG throws away some information to stay small, while PNG keeps every pixel exactly and pays for it in bytes. The same photograph saved as PNG will be far larger than the same photo as JPEG, with no visible gain on a screen.",
          "Screenshots and line art belong in PNG, because hard edges and flat colors are worth preserving. Photographs belong in JPEG or WebP. Files saved as BMP or TIFF are heavy by design, and Filekind accepts only JPEG, PNG, and static WebP, so those formats have to be saved as JPEG or PNG first.",
        ],
        links: [{ href: "/glossary/image-compression", label: "Image compression" }],
      },
      {
        heading: "Metadata is rarely the main cause",
        paragraphs: [
          "Photographs carry records of the camera, the settings, and sometimes the location. That information is real, but it is small compared with the pixel data, so stripping it alone will not turn a heavy file into a light one.",
          "Treat metadata as a minor factor and resolution as the major one. If a file surprises you with its size, look at the dimensions first, because they explain the number far more often than anything stored alongside the picture.",
        ],
        links: [{ href: "/glossary/exif-data", label: "EXIF data" }],
      },
      {
        heading: "Fix it by reducing pixels, then bytes",
        paragraphs: [
          "Resize the image to the size it will actually be displayed at, keeping the aspect ratio locked so nothing distorts. Fewer pixels give the compressor less data to work with, which is why resizing first makes a tight size target much easier to reach.",
          "Then compress with the limit you need as the maximum. The tool works toward that number, verifies the final JPEG, and reports the output size, so you can see the result rather than guess at it.",
        ],
        list: [
          "Resize to the display size when the image is far larger than needed",
          "Compress with a KB or MB target that matches the real limit",
          "Keep the original file somewhere safe for future edits",
          "Repeat one image at a time, since batch compression is not offered",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
      {
        heading: "What will not make a file smaller",
        paragraphs: [
          "Renaming the file or changing the letters after the dot changes nothing, because the image data inside is untouched. The same is true of copying it to a cloud folder or attaching it to a message: the bytes travel as they are.",
          "There is no PDF compression here either, so a heavy document needs smaller source images before it is rebuilt. Reduce the pictures, then generate the document again from the lighter versions.",
        ],
        links: [{ href: "/glossary/file-extension", label: "File extensions" }],
      },
    ],
    faqs: [
      {
        question: "Why is my photo file so big when it looks normal?",
        answer: "It probably holds far more pixels than the screen it is displayed on, and it may be stored as PNG rather than JPEG. The size is in the data, not in how the picture appears.",
      },
      {
        question: "How can I make an image file smaller without losing it?",
        answer: "Keep the original untouched and work on a copy. Resize it to the dimensions you need, then compress with the limit you have to meet, so the source photo stays available at full quality.",
      },
      {
        question: "Does a higher resolution always mean a bigger file?",
        answer: "Almost always, because more pixels means more data to store. Compression settings can offset that to a degree, which is why two photos of the same size in pixels can still weigh different amounts.",
      },
      {
        question: "Why does a PNG weigh so much more than a JPEG?",
        answer: "PNG keeps every pixel exactly, while JPEG discards information to reduce size. For photographs that trade is invisible at normal sizes, but for text and line art the PNG is worth the extra bytes.",
      },
    ],
  },
  {
    slug: "image-quality-vs-file-size",
    kind: "guide",
    title: "Image Quality vs File Size, Explained",
    metaTitle: "Image Quality vs File Size Explained Simply",
    description: "Understand image quality vs file size: what compression discards, when a smaller file is worth it, and how to judge the trade-off before you send an image.",
    summary: "Image quality and file size pull in opposite directions: keeping more detail costs more bytes, and cutting bytes gives up some detail. The practical goal is to find the point where the file fits its purpose without showing damage you can see.",
    updated: "2026-09-24",
    keywords: ["image quality vs file size", "image compression quality", "quality and file size", "lossy vs lossless", "image quality explained", "compression trade-off", "file size vs quality"],
    tool: { href: "/compress-image", label: "Compress image tool" },
    related: [
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/glossary/lossless-compression", label: "Lossless compression" },
      { href: "/compare/lossy-vs-lossless", label: "Lossy vs lossless" },
      { href: "/glossary/jpeg-artifacts", label: "JPEG artifacts" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
    ],
    sections: [
      {
        heading: "What the file size is actually counting",
        paragraphs: [
          "File size is the number of bytes stored on disk. For a raster image those bytes describe the pixels: their color values, the structure around them, and a little information about the file itself.",
          "That is why two pictures that look identical can weigh very different amounts. One may repeat smooth areas efficiently while the other stores every variation, and the difference shows up in the number you see in your file manager.",
        ],
        links: [{ href: "/glossary/file-size", label: "File size" }],
      },
      {
        heading: "What quality loss looks like in practice",
        paragraphs: [
          "Lossy compression, which JPEG uses, removes information that the eye is less likely to notice. Pushed gently, the result looks the same at normal size. Pushed hard, it shows up as blocking around edges, smeared gradients, and mush around fine text.",
          "Lossless compression, which PNG uses, removes nothing: the pixels that went in are the pixels that come out, and the file stays large as a result. There is no quality setting to tune, only the decision of how much detail you are willing to give up.",
        ],
        links: [{ href: "/glossary/jpeg-artifacts", label: "JPEG artifacts" }],
      },
      {
        heading: "The trade-off is not a straight line",
        paragraphs: [
          "Early reductions usually cost very little you can see, because the first data removed is the least visible. Keep pushing and each further step buys fewer bytes while taking more noticeable detail with it, so the last stretch toward a tight limit is always the most expensive.",
          "Resolution behaves the same way. Dropping from a camera-sized image to a screen-sized one is barely noticeable, while squeezing far below the display size starts to blur edges and thin lines that were once crisp.",
        ],
        links: [{ href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" }],
      },
      {
        heading: "Decide by what the image is for",
        paragraphs: [
          "A photo meant for print or for your own archive should stay large and lightly compressed, because you may need the detail later. A picture inside an email, a form, or a long web page has a job that a modest file does perfectly well.",
          "When a destination sets a limit, treat that number as the constraint and aim for the largest file that still sits under it. Going far below the limit throws away detail nobody asked you to give up.",
        ],
        links: [{ href: "/glossary/image-quality", label: "Image quality" }],
      },
      {
        heading: "How this tool handles the balance",
        paragraphs: [
          "Enter a maximum in KB or MB and the compressor searches for a JPEG at or below that size, then verifies the finished file before reporting success. It targets a ceiling rather than an exact match, because encoding varies slightly between browsers.",
          "For very tight targets it may reduce pixel dimensions to get under the limit, and a transparent PNG background comes back white in the JPEG output. The result screen shows the original and output sizes together, so you can judge the trade-off with numbers as well as your eyes.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
    ],
    faqs: [
      {
        question: "What is the relationship between image quality and file size?",
        answer: "Keeping more detail requires more bytes, and removing bytes removes detail. The aim is not the smallest file possible, but the smallest file that still does its job without visible damage.",
      },
      {
        question: "Is smaller file size always worse quality?",
        answer: "No. Early reductions often remove data you would never notice, and resizing an oversized photo to its display size usually looks identical. Only when the target gets tight does the loss become visible.",
      },
      {
        question: "What is the difference between lossy and lossless compression?",
        answer: "Lossy compression discards information to reach a smaller size, and JPEG works this way. Lossless compression keeps every pixel and mainly removes repetition, which is why PNG files stay large.",
      },
      {
        question: "How do I know if an image has been compressed too much?",
        answer: "Look at flat areas and high-contrast edges at full size: blocking, ringing, or smeared detail means the limit was too aggressive. Raise the target, or reduce the dimensions first so the same limit is easier to reach.",
      },
    ],
  },
  {
    slug: "how-to-keep-image-quality-when-compressing",
    kind: "guide",
    title: "How to Keep Image Quality When Compressing",
    metaTitle: "Compress Images Without Losing Quality in Browser",
    description: "Compress images without losing visible quality by setting a realistic target, resizing first, and checking the result at full size before you download it.",
    summary: "You can compress an image without visible quality loss by aiming for the largest target that still fits the limit and by reducing pixels only as far as you must. Check every result at full size before you send it, and keep the original file untouched.",
    updated: "2026-09-24",
    keywords: ["compress image without losing quality", "keep image quality", "compress photo quality", "best compression quality", "reduce file size keep quality", "image compression tips", "compress without blur"],
    tool: { href: "/compress-image", label: "Compress image tool" },
    related: [
      { href: "/glossary/image-quality", label: "Image quality" },
      { href: "/glossary/compression-ratio", label: "Compression ratio" },
      { href: "/guides/image-quality-vs-file-size", label: "Image quality vs file size" },
      { href: "/resize-image", label: "Resize image" },
      { href: "/glossary/jpeg-artifacts", label: "JPEG artifacts" },
    ],
    sections: [
      {
        heading: "Aim for the largest file that still fits",
        paragraphs: [
          "The single biggest mistake is choosing a target far below the limit that applies to you. If the form accepts 2 MB, there is no benefit in forcing the picture to 300 KB, and every kilobyte you shave below what is needed is detail you gave away for nothing.",
          "Read the requirement, set that number as your maximum, and stop there. The compressor works toward a file at or below the target and reports the final size, so you can confirm the result rather than assume it.",
        ],
        links: [{ href: "/compress-image", label: "Compress image" }],
      },
      {
        heading: "Reduce pixels before you squeeze bytes",
        paragraphs: [
          "A photo displayed at a modest size rarely needs camera-resolution pixels. Resize it to the dimensions it will actually occupy, keeping the aspect lock on, and the compressor has far less work to do at the same target.",
          "This is the route to a small file that still looks clean. Rather than pushing the encoder harder and harder on a huge image, you remove data that was never going to be visible in the first place, which is a much gentler way to lose bytes.",
        ],
        links: [{ href: "/resize-image", label: "Resize image" }],
      },
      {
        heading: "Compress from the original, not from a copy",
        paragraphs: [
          "Every time a JPEG is saved, it is re-encoded and some detail is lost again. Compressing an already-compressed file stacks those losses, so start each attempt from your best original rather than from the file you downloaded last time.",
          "The same applies to screenshots that have been edited and re-saved several times. Fewer passes between the source and the final file means cleaner edges and smoother gradients in the result.",
        ],
        links: [{ href: "/glossary/jpeg-artifacts", label: "JPEG artifacts" }],
      },
      {
        heading: "Inspect the result at full size",
        paragraphs: [
          "Look at the preview the way the image will really be seen: open it full size and check the areas that fail first, such as text, faces, hard edges, and smooth skies or walls. Small thumbnails hide damage that is obvious when you zoom in.",
          "Compare the original and output numbers on the result screen as well. If the size dropped far below your target, you went further than necessary, and a second pass with a higher maximum will treat the picture more kindly. If the result looks soft, raise the target and try again from the original file rather than accepting the loss.",
        ],
        links: [{ href: "/glossary/image-quality", label: "Image quality" }],
      },
      {
        heading: "Know what the output will always be",
        paragraphs: [
          "The compressor writes a JPEG, so the result is always a lossy file: the goal is no visible loss rather than no loss at all. A transparent PNG background becomes white on the way through, because JPEG cannot store transparency.",
          "There is no batch mode, so each image is compressed and checked on its own. That takes a few extra clicks, and it gives you the chance to judge every file individually before it goes anywhere.",
        ],
        links: [{ href: "/glossary/lossy-compression", label: "Lossy compression" }],
      },
    ],
    faqs: [
      {
        question: "Can I compress an image without losing any quality?",
        answer: "Not with a JPEG output, which is always lossy. What you can do is compress gently enough that the loss is not visible at the size the image is used, by setting a realistic target and reducing pixels only when you must.",
      },
      {
        question: "What target size keeps a photo looking good?",
        answer: "The largest target the destination allows, because extra room means fewer reductions. Use the stated limit rather than a much smaller number, and check the preview at full size to confirm the result suits you.",
      },
      {
        question: "Does compressing an image twice make it worse?",
        answer: "Yes. Each re-encode discards a little more detail, so work from your original file every time instead of re-compressing a previous output.",
      },
      {
        question: "Should I resize or compress first?",
        answer: "Resize first when the image is much larger than it needs to be, then compress toward your limit. Removing excess pixels first makes the same size target reachable with far less visible damage.",
      },
    ],
  },
];
