import type { GlossaryTerm } from "./types";

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "jpeg",
    term: "JPEG",
    title: "JPEG",
    metaTitle: "JPEG: Definition, Uses, and File Size Guide",
    description:
      "Learn what a JPEG is, how its lossy compression changes quality and file size, and how to shrink a JPEG below a chosen limit in your browser.",
    summary:
      "JPEG is the most common format for photographs on the web and on phones. It trades a small amount of visible detail for a much smaller file, which keeps photos easy to share and upload.",
    definition:
      "JPEG is a widely supported lossy image format that reduces file size by discarding visual detail that is hardest for the eye to notice, which makes it a common choice for photographs.",
    updated: "2026-09-24",
    keywords: [
      "jpeg",
      "what is jpeg",
      "jpeg image format",
      "jpeg file size",
      "jpeg compression",
      "jpeg vs jpg",
      "jpeg extension",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/jpg", label: "JPG" },
      { href: "/compare/jpeg-vs-jpg", label: "JPEG vs JPG" },
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/convert-image/png-to-jpg", label: "PNG to JPG" },
      { href: "/guides/why-is-my-image-file-so-big", label: "Why your image file is so big" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "How JPEG reduces file size",
        paragraphs: [
          "JPEG uses lossy compression. The encoder looks at small blocks of pixels, then removes color and brightness information that has the least effect on how the picture looks. The result is a file that can be far smaller than the original pixel data.",
          "The trade is permanent. Once detail is discarded, no later step can bring it back. Saving an already compressed JPEG inside another format keeps the same visible flaws and only adds container overhead.",
        ],
      },
      {
        heading: "When JPEG is the right choice",
        paragraphs: [
          "JPEG suits photographs, gradients, and any image with many smooth color changes. Nearly every camera, phone, browser, and social platform can open it, so it is a safe default when broad compatibility matters.",
          "Formats that keep hard edges or transparent pixels are a better fit for other cases.",
        ],
        list: [
          "Photographs and screenshots with smooth color transitions",
          "Images that must sit under a website upload limit",
          "Pictures sent by email or messaging apps",
          "Web pages where faster loading matters",
        ],
      },
      {
        heading: "Quality, size, and practical limits",
        paragraphs: [
          "File size depends on pixel dimensions, quality settings, and how much detail the scene contains. A large, detailed photo at high quality can easily exceed what an upload form accepts. Reducing quality first and dimensions second is the usual path to a small file.",
          "Filekind compresses JPEG and PNG images in the browser to a size at or below a limit you choose. It accepts images up to 25 MB, 16,000 pixels per side, and 48 megapixels, and your files never leave the device.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is JPEG the same as JPG?",
        answer:
          "Yes. They are the same format. The short .jpg name exists because early operating systems allowed only three characters after the dot, while .jpeg keeps the full four-letter name.",
      },
      {
        question: "Does compressing a JPEG always reduce quality?",
        answer:
          "JPEG compression is lossy, so each pass can soften fine detail. Filekind searches for an output at or below your chosen size and may lower quality or dimensions to reach it, so preview the result before you download.",
      },
      {
        question: "Can a JPEG have a transparent background?",
        answer:
          "No. JPEG has no transparency channel, so transparent areas are filled with a solid color when a file becomes JPEG. Keep PNG or static WebP when transparent pixels must survive.",
      },
    ],
  },
  {
    slug: "jpg",
    term: "JPG",
    title: "JPG",
    metaTitle: "JPG: What It Is and How It Differs From JPEG",
    description:
      "JPG is the short form of JPEG. See why both names mean the same image format, where the extension comes from, and how to convert or shrink JPG files.",
    definition:
      "JPG is a three-letter name for the JPEG image format, used because older operating systems allowed only three characters after the dot in a file name.",
    summary:
      "JPG and JPEG point to the same image format, so any tool that reads one reads the other. The only real difference is the length of the file extension.",
    updated: "2026-09-24",
    keywords: [
      "jpg",
      "what is jpg",
      "jpg vs jpeg",
      "jpg file format",
      "jpg image",
      "jpg extension",
      "jpg conversion",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/compare/jpeg-vs-jpg", label: "JPEG vs JPG" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/guides/how-to-convert-png-to-jpg", label: "Convert PNG to JPG" },
      { href: "/convert-image/png-to-jpg", label: "PNG to JPG" },
    ],
    sections: [
      {
        heading: "JPG and JPEG are the same format",
        paragraphs: [
          "Both extensions describe the format defined by the JPEG standard. A file named photo.jpg and a file named photo.jpeg contain the same kind of image data, and software treats them identically.",
          "Nothing changes when you rename an extension. The bytes inside the file stay the same, so renaming only affects which program opens the file by default.",
        ],
      },
      {
        heading: "Why the three-letter name exists",
        paragraphs: [
          "Early personal computer systems limited file extensions to three characters, so .jpg became the working shorthand for a JPEG file. The convention stuck after that restriction disappeared, and both spellings remain common today.",
          "Search results, camera settings, and upload forms use the two spellings interchangeably. If a site only lists one of them, the other file still matches the same format.",
        ],
      },
      {
        heading: "Converting and shrinking JPG files",
        paragraphs: [
          "Because JPG and JPEG are identical, conversion only matters when you are moving to a different format. A JPG can be converted to PNG when you need transparency preserved from an original PNG, or to WebP when a smaller modern file suits your workflow.",
          "To reduce the size of a JPG, use compression rather than renaming. Filekind runs in the browser and finds a JPEG at or below the limit you set, with image limits of 25 MB, 16,000 pixels per side, and 48 megapixels. The same limits apply whether the file arrives as .jpg or .jpeg, since both are read as one format.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which should I use, .jpg or .jpeg?",
        answer:
          "Either works. Some older systems and form validators expect three-letter extensions, so .jpg is the safer choice there. Modern browsers and upload tools accept both.",
      },
      {
        question: "Is a JPG file smaller than a PNG of the same photo?",
        answer:
          "Usually, yes. JPG uses lossy compression that suits photographs, while PNG stores pixels losslessly. The gap depends on the image, which is why format comparisons are worth checking before you commit.",
      },
      {
        question: "Can I convert JPG files in my browser?",
        answer:
          "Yes. Filekind converts JPG to PNG and JPG to WebP, and the reverse pairs, directly in the browser so the file never leaves the device.",
      },
    ],
  },
  {
    slug: "png",
    term: "PNG",
    title: "PNG",
    metaTitle: "PNG Format: Definition, Best Uses, and Limits",
    description:
      "Learn what a PNG is, why it keeps transparency and sharp edges intact, when it beats JPEG, and how to convert or compress PNG files directly in your browser.",
    definition:
      "PNG is a lossless image format that stores every pixel exactly as drawn, supports transparent backgrounds, and is commonly used for logos, screenshots, and graphics with sharp edges.",
    summary:
      "PNG keeps pixels exact and supports transparency, which makes it the standard choice for logos, icons, and screenshots. The price is a larger file than JPEG for photographs.",
    updated: "2026-09-24",
    keywords: [
      "png",
      "what is png",
      "png image format",
      "png vs jpg",
      "png transparency",
      "png file size",
      "png compression",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
      { href: "/glossary/transparency", label: "Transparency" },
      { href: "/guides/how-to-convert-png-to-jpg", label: "Convert PNG to JPG" },
      { href: "/convert-image/png-to-webp", label: "PNG to WebP" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "What makes PNG lossless",
        paragraphs: [
          "PNG compresses pixels without throwing any of them away. Repeatedly opening, editing, and saving a PNG does not erode image quality the way it does with a JPEG.",
          "That accuracy comes with a cost. Continuous-tone photographs rarely shrink far in PNG, so photo files are usually much larger than the same picture saved as JPEG.",
        ],
      },
      {
        heading: "Transparency and sharp edges",
        paragraphs: [
          "PNG stores an alpha channel, so a pixel can be fully opaque, fully transparent, or anything in between. Soft edges around cutout objects and rounded corners therefore stay smooth instead of turning jagged.",
          "Hard edges benefit too. Text, line art, and flat-color logos keep crisp boundaries because the format does not smooth detail across pixel blocks.",
        ],
        list: [
          "Logos, icons, and interface graphics",
          "Screenshots with small text",
          "Cutout images that need transparent backgrounds",
          "Artwork with flat colors and sharp lines",
        ],
      },
      {
        heading: "Converting and compressing PNG files",
        paragraphs: [
          "Filekind converts PNG to JPEG, PNG to WebP, and back again in the browser. Converting to JPEG shrinks photos quickly, but transparent areas are filled with white because JPEG cannot store transparency.",
          "The compressor also accepts PNG input and writes JPEG output at or below your chosen KB or MB limit. Inputs up to 25 MB, 16,000 pixels per side, and 48 megapixels are supported. Everything runs locally, so a folder of screenshots can be handled one file at a time without any upload.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is PNG lossy or lossless?",
        answer:
          "PNG is lossless. It uses a compression method that reduces file size without changing any pixel values, so quality survives every save.",
      },
      {
        question: "Why is my PNG file so large?",
        answer:
          "Lossless storage keeps full detail, and detailed photos give the compressor little redundancy to remove. For photographs, converting to JPEG or WebP is usually the fastest way to a smaller file.",
      },
      {
        question: "Does converting PNG to JPEG keep transparency?",
        answer:
          "No. JPEG has no transparency channel, so transparent pixels become a solid color. Filekind fills them with white when a PNG is written out as JPEG.",
      },
    ],
  },
  {
    slug: "webp",
    term: "WebP",
    title: "WebP",
    metaTitle: "WebP: What It Is, How It Works, and When to Use",
    description:
      "WebP is a modern image format from Google. Learn how it compares with JPEG and PNG, which features it supports, and how to convert static WebP files.",
    definition:
      "WebP is a modern image format, released by Google in 2010, that offers both lossy and lossless compression plus transparency, usually at smaller file sizes than older formats.",
    summary:
      "WebP packs photographs, transparency, and animation into smaller files than JPEG and PNG. Browsers support it widely, and Filekind handles the static version of the format.",
    updated: "2026-09-24",
    keywords: [
      "webp",
      "what is webp",
      "webp image format",
      "webp vs jpg",
      "webp vs png",
      "webp file size",
      "webp conversion",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/compare/jpg-vs-webp", label: "JPG vs WebP" },
      { href: "/compare/png-vs-webp", label: "PNG vs WebP" },
      { href: "/guides/how-to-open-a-webp-image", label: "Open a WebP image" },
      { href: "/convert-image/jpg-to-webp", label: "JPG to WebP" },
    ],
    sections: [
      {
        heading: "How WebP compression works",
        paragraphs: [
          "WebP applies two related techniques. Lossy WebP reuses ideas from JPEG to drop detail the eye is unlikely to miss, while lossless WebP rebuilds the exact image from a compact description of repeated patterns.",
          "The format also carries an alpha channel for transparency, which PNG traditionally provides. A single file can therefore hold a photographic subject with a soft, transparent edge. Because stills and animations share one container, the extension stays the same either way.",
        ],
      },
      {
        heading: "Static and animated WebP",
        paragraphs: [
          "A static WebP is a single still frame, exactly like a JPEG or PNG. An animated WebP holds a sequence of frames and plays them in a loop, similar to a GIF.",
          "The distinction matters for tools. Converting or compressing software must read every frame, so many tools accept only static files and reject animations rather than silently flattening them.",
        ],
      },
      {
        heading: "Using WebP with Filekind",
        paragraphs: [
          "Filekind converts static WebP to JPEG and PNG, and converts JPEG and PNG into static WebP, all inside the browser. Animated WebP files are rejected instead of losing their animation without warning.",
          "Inputs follow the shared image limits of 25 MB, 16,000 pixels per side, and 48 megapixels. Older software that does not recognize WebP can be served by converting a copy to JPEG or PNG first. Small outputs also help when a page or form sets a strict ceiling on image weight.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is WebP better than JPEG?",
        answer:
          "WebP usually reaches similar visual quality at a smaller size, but support still varies in some older apps and email clients. Keep a JPEG copy when a workflow only promises JPEG.",
      },
      {
        question: "Can Filekind convert animated WebP?",
        answer:
          "No. Filekind works with static WebP only and rejects animated files rather than dropping frames. Convert animations with software built for multi-frame files.",
      },
      {
        question: "Does WebP support transparency?",
        answer:
          "Yes. WebP includes an alpha channel, so it can hold transparent pixels like PNG while still offering lossy compression for the rest of the image.",
      },
    ],
  },
  {
    slug: "gif",
    term: "GIF",
    title: "GIF",
    metaTitle: "GIF: Animation, 256 Colors, and File Size Limits",
    description:
      "GIF is known for short looping animations. Learn how its 256-color palette works, why photos look poor as GIF, and what to use instead for still images.",
    definition:
      "GIF is an older image format that stores up to 256 colors per frame, supports simple transparency and looping animation, and compresses best on images with flat colors and few tones.",
    summary:
      "GIF became famous for short looping animations and simple graphics. Its small color palette keeps files small for icons and banners, but it handles photographs badly.",
    updated: "2026-09-24",
    keywords: [
      "gif",
      "what is gif",
      "gif image format",
      "gif animation",
      "gif colors",
      "gif file size",
      "gif vs png",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/webp", label: "WebP" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/compare/png-vs-webp", label: "PNG vs WebP" },
    ],
    sections: [
      {
        heading: "How GIF handles color and animation",
        paragraphs: [
          "GIF was introduced by CompuServe in 1987 and uses a palette of at most 256 colors for each frame. Every pixel is mapped to that palette, which keeps files compact when the image uses few colors.",
          "Animation is built into the format. A GIF stores a sequence of frames plus a delay for each one, and viewers loop the sequence without needing a video player.",
        ],
      },
      {
        heading: "Where GIF works and where it fails",
        paragraphs: [
          "Flat-color graphics such as logos, badges, and simple interface animations compress well as GIF. Binary transparency, where a pixel is either fully opaque or fully transparent, is also supported.",
          "Photographs fare poorly. Smooth gradients have to be reduced to 256 colors, which produces visible banding and larger files than JPEG or WebP at similar quality.",
        ],
        list: [
          "Short looping clips with no audio",
          "Pixel art and simple flat-color graphics",
          "Decorative banners with a small number of colors",
          "Images that must open in very old software",
        ],
      },
      {
        heading: "GIF support in Filekind",
        paragraphs: [
          "Filekind does not convert GIF files today. The converter works with JPEG, PNG, and static WebP, so a GIF must be turned into a still frame with other software before it can be used here.",
          "For still images in that set, compression and format conversion run entirely in the browser with no upload, under the standard limits of 25 MB, 16,000 pixels per side, and 48 megapixels.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is GIF lossless?",
        answer:
          "Only partly. The compression applied to each frame does not lose data, but reducing an image to a 256-color palette discards color information before compression even starts.",
      },
      {
        question: "Should I use GIF or WebP for animation?",
        answer:
          "WebP usually delivers smaller animations with better color, and modern browsers support it. GIF remains the safer choice for older software that does not read WebP.",
      },
      {
        question: "Can Filekind compress a GIF?",
        answer:
          "No. The compressor accepts JPEG and PNG input and writes JPEG output. GIF is outside the supported set, so compress it with a tool that handles animation.",
      },
    ],
  },
  {
    slug: "bmp",
    term: "BMP",
    title: "BMP",
    metaTitle: "BMP: Uncompressed Bitmap Images Explained",
    description:
      "BMP stores raw pixels with little or no compression. Learn what a bitmap file contains, why BMP files get large, and which formats to use instead.",
    definition:
      "BMP is a bitmap format that typically stores each pixel in its raw form with little or no compression, producing simple, large files used mainly on Windows systems.",
    summary:
      "BMP saves pixel data with little or no compression, so files are quick to read and heavy to store. It is mostly a legacy choice for Windows workflows.",
    updated: "2026-09-24",
    keywords: [
      "bmp",
      "what is bmp",
      "bmp image format",
      "bmp file size",
      "bmp bitmap",
      "bmp vs png",
      "bmp converter",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/raster-image", label: "Raster image" },
      { href: "/glossary/tiff", label: "TIFF" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/compare/vector-vs-raster", label: "Vector vs raster" },
    ],
    sections: [
      {
        heading: "What a BMP file contains",
        paragraphs: [
          "A BMP file holds a small header describing the dimensions and color depth, followed by the pixel grid. Many variants write every pixel at full size so a program can read the image straight into memory.",
          "Some BMP variants allow basic compression, but the common ones do not. A 1,920 by 1,080 image with 24-bit color can therefore take up several megabytes with no quality benefit over a smaller lossless file.",
        ],
      },
      {
        heading: "Why BMP files are so large",
        paragraphs: [
          "Because pixels are stored directly, there is little redundancy left for a compressor to exploit. The advantage is speed and simplicity: decoding a BMP takes very little work and never changes the image.",
          "That trade made BMP useful for icons, splash screens, and captures inside Windows applications, but it is a poor fit for web pages, email, or any service with an upload limit.",
        ],
        list: [
          "Raw pixels with little compression",
          "Large files even for modest dimensions",
          "Common in older Windows software and drivers",
          "Poor choice for web and mobile delivery",
        ],
      },
      {
        heading: "Converting away from BMP",
        paragraphs: [
          "PNG is the natural replacement when you need identical pixels, while JPEG or WebP gives a much smaller photograph. Converting only changes the container; the visible detail is whatever the BMP already held.",
          "Filekind does not convert BMP today. Its converter accepts JPEG, PNG, and static WebP, so a BMP must first be exported as one of those formats by other software.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is BMP lossy or lossless?",
        answer:
          "BMP is effectively lossless. The pixel grid is written as-is, so nothing is discarded during saving, which is exactly why the files end up so large.",
      },
      {
        question: "Can I open a BMP on a phone?",
        answer:
          "Most phones and browsers display BMP files, but sharing and upload forms often reject them. Converting to JPEG or PNG first avoids those limits.",
      },
      {
        question: "Does Filekind convert BMP to PNG?",
        answer:
          "No. Filekind supports conversions between JPEG, PNG, and static WebP only, so a BMP needs to be exported to a supported format elsewhere before you convert it here.",
      },
    ],
  },
  {
    slug: "tiff",
    term: "TIFF",
    title: "TIFF",
    metaTitle: "TIFF Images: What They Are and Who Uses Them",
    description:
      "TIFF is a flexible format used in scanning, printing, and archives. Learn what TIFF files store, why they are large, and when a lighter format works better.",
    definition:
      "TIFF is a flexible container format for high-quality images that supports lossless storage, high color depth, layers, and multiple pages, and is widely used in scanning and print work.",
    summary:
      "TIFF prioritizes image fidelity over small files. It is common in scanning, publishing, and archival work where every pixel and bit of color must be preserved.",
    updated: "2026-09-24",
    keywords: [
      "tiff",
      "what is tiff",
      "tiff image format",
      "tiff file size",
      "tiff vs png",
      "tiff images",
      "tiff compression",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/lossless-compression", label: "Lossless compression" },
      { href: "/glossary/color-depth", label: "Color depth" },
      { href: "/glossary/bmp", label: "BMP" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/compare/lossy-vs-lossless", label: "Lossy vs lossless" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "What TIFF stores",
        paragraphs: [
          "TIFF is a container rather than a single compression scheme. A file can hold lossless compressed pixels, raw pixel data, or even JPEG data inside it, along with metadata describing how it should be displayed.",
          "It also supports high bit depths, multiple color channels, layers for editing, and a sequence of pages in one file. Print workflows rely on these options to keep color accurate through production.",
        ],
      },
      {
        heading: "Who uses TIFF files",
        paragraphs: [
          "Flatbed scanners often output TIFF so the capture stays free of compression artifacts. Photographers use it for masters, while publishers and medical or legal archives keep TIFF because it is stable and well documented.",
          "The files are typically large. A single scanned page can run to several megabytes, which is acceptable for storage on a workstation and impractical for email or web upload.",
        ],
        list: [
          "Archive masters for photographs and artwork",
          "Output from document and photo scanners",
          "Prepress files that carry layers and color profiles",
          "Situations where compression artifacts are unacceptable",
        ],
      },
      {
        heading: "TIFF support in Filekind",
        paragraphs: [
          "Filekind does not convert TIFF today. The converter handles JPEG, PNG, and static WebP, so a TIFF must be exported to one of those formats in desktop or scanner software first.",
          "For supported formats, conversion and compression run in the browser without any upload, within the limits of 25 MB, 16,000 pixels per side, and 48 megapixels per image.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is TIFF lossless?",
        answer:
          "Usually, yes. Most TIFF files use lossless compression or store raw pixels, though a TIFF can also wrap JPEG data. Check the file or the exporting program to be sure.",
      },
      {
        question: "Why are TIFF files so big?",
        answer:
          "They favor fidelity over size. Full-resolution pixels, high color depth, and lossless compression leave little room for reduction, so files are often much larger than JPEG versions of the same picture.",
      },
      {
        question: "Should I convert TIFF before uploading?",
        answer:
          "Yes, for most online forms. Convert a working copy to JPEG for photographs or PNG for line art so the file stays within common size and format limits.",
      },
    ],
  },
  {
    slug: "svg",
    term: "SVG",
    title: "SVG",
    metaTitle: "SVG: Scalable Vector Graphics Format Explained",
    description:
      "SVG stores shapes as math instead of pixels. Learn how vector graphics scale, where SVG shines for logos and icons, and how raster formats differ.",
    definition:
      "SVG is an XML-based vector format that describes images as shapes, paths, and text, so graphics stay sharp at any size and files remain small for simple artwork.",
    summary:
      "SVG describes graphics with shapes and coordinates rather than pixels, so a logo stays sharp from a favicon to a billboard. The format is text-based and easy to edit.",
    updated: "2026-09-24",
    keywords: [
      "svg",
      "what is svg",
      "svg image format",
      "svg vector graphics",
      "svg scalability",
      "svg vs png",
      "svg files",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/vector-image", label: "Vector image" },
      { href: "/glossary/raster-image", label: "Raster image" },
      { href: "/compare/vector-vs-raster", label: "Vector vs raster" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "How SVG describes an image",
        paragraphs: [
          "An SVG file is text written in XML. It lists elements such as rectangles, circles, paths, and text, each with coordinates, colors, and stroke settings, and the viewer draws them on demand.",
          "Because there is no fixed pixel grid, the same file renders cleanly at any size. Zooming in reveals smooth curves instead of the blocky edges a raster image would show.",
        ],
      },
      {
        heading: "Where SVG works best",
        paragraphs: [
          "Logos, icons, diagrams, charts, and interface elements are ideal candidates. Files stay tiny because a few dozen lines of text can replace a large bitmap, and colors can be changed by editing the source.",
          "Photographs are a poor fit. A complex photo would need a path per detail, producing a huge unreadable file, so pictures stay in raster formats. Icons and logos are the classic case, where a few kilobytes replace a bitmap that would weigh far more.",
        ],
        list: [
          "Logos and brand marks that must stay crisp",
          "Icons and interface graphics",
          "Charts, maps, and simple diagrams",
          "Graphics that need recoloring or scripting",
        ],
      },
      {
        heading: "SVG and Filekind",
        paragraphs: [
          "Filekind does not convert SVG today. Its converter works with raster formats only: JPEG, PNG, and static WebP, all processed in the browser without an upload.",
          "If a vector must become a bitmap, export a raster copy from vector software first, then convert or compress that file with a supported tool. Exporting also makes the output predictable in size and appearance across different viewers.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is SVG a raster or vector format?",
        answer:
          "SVG is vector. It stores shapes and coordinates instead of a pixel grid, so it scales without losing sharpness.",
      },
      {
        question: "Why does my SVG look different in another program?",
        answer:
          "SVG can embed fonts, filters, scripts, and CSS, and viewers vary in which features they support. Simplify the file or convert it to PNG when a target program cannot render it correctly.",
      },
      {
        question: "Can Filekind convert SVG to PNG?",
        answer:
          "No. Filekind converts JPEG, PNG, and static WebP only. Rasterize the SVG in design software, then use the converter on the exported PNG.",
      },
    ],
  },
  {
    slug: "pdf",
    term: "PDF",
    title: "PDF",
    metaTitle: "PDF: What the Format Is and Why It Is Still Used",
    description:
      "PDF keeps layouts fixed across devices. Learn how the format works, where it is used, and how to build or split PDFs from images in your browser.",
    definition:
      "PDF is a page-based document format that preserves text, images, and layout exactly as designed so files look the same on any device, printer, or operating system.",
    summary:
      "PDF holds pages that look identical everywhere, which is why contracts, forms, and reports are shared as PDF. It separates documents from the software that created them.",
    updated: "2026-09-24",
    keywords: [
      "pdf",
      "what is pdf",
      "pdf file format",
      "pdf document",
      "pdf pages",
      "pdf file size",
      "pdf conversion",
    ],
    tool: { href: "/images-to-pdf", label: "Images to PDF" },
    related: [
      { href: "/pdf-tools", label: "All PDF tools" },
      { href: "/compare/pdf-vs-image", label: "PDF vs image" },
      { href: "/guides/how-to-make-a-pdf-from-photos", label: "Make a PDF from photos" },
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/images-to-pdf", label: "Images to PDF" },
    ],
    sections: [
      {
        heading: "Why PDF keeps layouts fixed",
        paragraphs: [
          "A PDF describes each page as a finished composition. Fonts, images, and spacing are placed at defined coordinates, so the reader does not reflow the content the way it would with a word processing file.",
          "That predictability is the point. A form filled on a phone prints the same way on an office printer, and a signature page keeps its position no matter which viewer opens it.",
        ],
      },
      {
        heading: "What PDF can contain",
        paragraphs: [
          "PDFs hold text, raster images, vector artwork, form fields, annotations, and embedded fonts. Pages can be scanned photographs with no selectable text, or fully tagged text that reflows and reads aloud.",
          "The difference matters for search. A scan without a text layer cannot be searched or copied, because the page is a picture of words rather than the words themselves.",
        ],
      },
      {
        heading: "Filekind PDF tools and limits",
        paragraphs: [
          "Filekind builds PDFs from JPG, PNG, and static WebP images and renders PDF pages back into JPG or PNG pictures, all inside the browser. Inputs are limited to 50 MB and 100 pages per PDF, with up to 150 MB of rendered output. Those ceilings keep page rendering responsive on ordinary hardware, whether the job runs on a phone or a desktop.",
          "Password-protected PDFs are not supported, and Filekind does not edit PDF content or add OCR text. Alongside converting between images and pages, the PDF tools merge documents, split out selected pages, rotate them, and re-encode embedded images to shrink a file.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between a PDF and an image?",
        answer:
          "A PDF is a page container that can hold text, images, and layout for multiple pages, while an image file is a single picture. The comparison page explains when each one fits.",
      },
      {
        question: "Can Filekind make a PDF from photos?",
        answer:
          "Yes. Add JPG, PNG, or static WebP images, arrange their order, and choose Fit, A4, or Letter page sizing. Each image becomes one page and the file is created in your browser.",
      },
      {
        question: "Does Filekind compress or edit PDFs?",
        answer:
          "It compresses and reorganizes them: merge documents in order, split out selected pages, turn pages left or right, and run one of three compression levels over image-heavy files. Editing text, changing artwork, and adding a searchable text layer are not offered.",
      },
    ],
  },
  {
    slug: "heic",
    term: "HEIC",
    title: "HEIC",
    metaTitle: "HEIC: Apple's Image Format and How to Open It",
    description:
      "HEIC is the default photo format on iPhone. Learn what the container holds, why other devices struggle with it, and how to get a JPEG copy instead.",
    definition:
      "HEIC is an image container Apple uses by default since iOS 11 that stores efficient photos, sometimes with several images and depth data in one file.",
    summary:
      "HEIC is Apple's default photo container, chosen because it stores detailed images in less space. It is efficient on iPhone, but many websites and Windows tools still do not read it.",
    updated: "2026-09-24",
    keywords: [
      "heic",
      "what is heic",
      "heic image format",
      "heic file",
      "heic vs jpg",
      "heic converter",
      "heic on iphone",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/glossary/webp", label: "WebP" },
      { href: "/guides/how-to-convert-images-on-iphone", label: "Convert images on iPhone" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/glossary/image-format", label: "Image format" },
    ],
    sections: [
      {
        heading: "What HEIC stores",
        paragraphs: [
          "HEIC is a container built around the HEVC video codec, and Apple has used it for photos since iOS 11. Frames are compressed with techniques designed for video, which is why files stay small without looking soft.",
          "The container can also hold extras in one file, such as the original and edited versions of a photo, burst sequences, or depth data used for portrait effects.",
        ],
      },
      {
        heading: "Why HEIC causes compatibility problems",
        paragraphs: [
          "Support outside the Apple ecosystem is uneven. Recent Windows versions and many web apps can open HEIC, but plenty of upload forms, older desktop programs, and Android tools still refuse it.",
          "The usual fix is to keep a JPEG copy. Converting changes only the container, so the picture you see stays the same once the file is opened elsewhere.",
        ],
        list: [
          "Websites that list only JPG or PNG",
          "Windows tools without the HEIC extension installed",
          "Email and form uploads that reject unknown types",
          "Sharing photos with people on non-Apple devices",
        ],
      },
      {
        heading: "HEIC support in Filekind",
        paragraphs: [
          "Images to PDF opens HEIC photos: the file is decoded in your browser and placed on the page as it is added, so an iPhone picture needs no export step. The image converter itself still expects JPEG, PNG, or static WebP, so make a JPEG copy first when you want to resize, compress, or change the format of the photo.",
          "iPhone and iPad settings can still be changed to capture JPEG directly, and photo apps can usually export a copy in another format. Either way, conversion and compression run in the browser with no upload.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is HEIC the same as JPG?",
        answer:
          "No. HEIC uses a newer, more efficient codec, while JPG is the older lossy format with near-universal support. Both are still photographs, but software must recognize the container to open it.",
      },
      {
        question: "Can I open HEIC on Windows?",
        answer:
          "Recent Windows versions can, sometimes after installing an extension from the store. If the file will not open, export a JPEG copy from the iPhone before transferring it.",
      },
      {
        question: "Does Filekind convert HEIC to JPG?",
        answer:
          "Only as part of building a PDF. Images to PDF decodes a HEIC photo and uses it as a page, but the converter itself takes JPEG, PNG, and static WebP. For a standalone JPEG, export one from your photo app, then resize or compress it here.",
      },
    ],
  },
{
    slug: "avif",
    term: "AVIF",
    title: "AVIF",
    metaTitle: "AVIF: Next-Generation Image Format Explained",
    description:
      "AVIF is a modern image format built on the AV1 codec. Learn how it compares with WebP and JPEG, what it supports, and where support still lags.",
    definition:
      "AVIF is a modern image format based on the AV1 video codec that delivers strong compression with lossy, lossless, and HDR options along with transparency and animation.",
    summary:
      "AVIF squeezes more detail into fewer bytes by borrowing techniques from modern video compression. Quality per kilobyte is impressive, but fewer programs can open it.",
    updated: "2026-09-24",
    keywords: [
      "avif",
      "what is avif",
      "avif image format",
      "avif vs jpg",
      "avif vs webp",
      "avif compression",
      "avif files",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/webp", label: "WebP" },
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/glossary/heic", label: "HEIC" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/compare/jpg-vs-webp", label: "JPG vs WebP" },
    ],
    sections: [
      {
        heading: "How AVIF compresses images",
        paragraphs: [
          "AVIF comes from the Alliance for Open Media and applies the AV1 codec, which was designed for video, to single frames. Larger prediction blocks and smarter filtering let it discard detail that the eye forgives more accurately than older formats.",
          "The format covers lossy and lossless modes, transparency through an alpha channel, high dynamic range, and animation. That breadth makes it a candidate for replacing several formats at once.",
        ],
      },
      {
        heading: "Where AVIF works and where it stalls",
        paragraphs: [
          "Major browsers display AVIF, and several large sites serve it with fallback files. At equal quality it often lands below JPEG and WebP, which is the whole point of adopting it.",
          "Support in editors, upload forms, and older desktop software still lags. Many pipelines that promise JPEG or PNG will reject an AVIF, so a second copy is usually required.",
        ],
        list: [
          "Large photos on sites that also serve a fallback",
          "Libraries that must stay under tight storage limits",
          "Modern browsers and current mobile devices",
          "Workflows that can keep a JPEG copy on hand",
        ],
      },
      {
        heading: "AVIF support in Filekind",
        paragraphs: [
          "Filekind does not convert AVIF today. The converter handles JPEG, PNG, and static WebP, so an AVIF must be exported to one of those formats in other software first.",
          "Once a supported file exists, conversion and compression happen in the browser under the standard limits of 25 MB, 16,000 pixels per side, and 48 megapixels, with no upload of your images.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is AVIF better than WebP?",
        answer:
          "AVIF generally compresses further at the same visual quality, but WebP has broader support in older tools. Pick AVIF when you can serve a fallback, and WebP when compatibility comes first.",
      },
      {
        question: "Can every browser open AVIF?",
        answer:
          "Current versions of major browsers can, while older ones cannot. Sites usually detect support and send a JPEG or WebP instead, so visitors are never left with a broken image.",
      },
      {
        question: "Does Filekind convert AVIF to JPG?",
        answer:
          "No. Filekind supports JPEG, PNG, and static WebP only. Create a JPEG copy with an AVIF-capable editor, then convert or compress that file here.",
      },
    ],
  },
  {
    slug: "image-compression",
    term: "Image compression",
    title: "Image compression",
    metaTitle: "Image Compression: How It Reduces File Size",
    description:
      "Image compression shrinks files so they load faster and fit upload limits. Learn the two main types, what each one changes, and how to compress in a browser.",
    definition:
      "Image compression is the process of reducing an image file size by removing or re-encoding data, either without changing visible pixels or by discarding detail the eye rarely notices.",
    summary:
      "Image compression makes pictures smaller so pages load faster and files clear upload limits. Two families exist: one that preserves every pixel and one that trades detail for size.",
    updated: "2026-09-24",
    keywords: [
      "image compression",
      "what is image compression",
      "image compression types",
      "image compression explained",
      "image compression and file size",
      "image compression quality",
      "image compression browser",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/glossary/lossless-compression", label: "Lossless compression" },
      { href: "/glossary/compression-ratio", label: "Compression ratio" },
      { href: "/guides/image-quality-vs-file-size", label: "Image quality vs file size" },
      { href: "/guides/how-to-keep-image-quality-when-compressing", label: "Compress without losing quality" },
    ],
    sections: [
      {
        heading: "What compression actually changes",
        paragraphs: [
          "Compression attacks the same problem from two directions. Lossless methods look for repeated patterns and store a short description instead of the raw pixels, so the decoded image matches the original exactly.",
          "Lossy methods go further and remove information the eye is unlikely to notice. Detail in smooth areas goes first, which is why a heavily compressed photo looks softer up close while still reading well at normal size.",
        ],
      },
      {
        heading: "Choosing between lossy and lossless",
        paragraphs: [
          "Photographs usually do better with lossy compression, because smooth gradients give the encoder room to work. Logos, screenshots, and text need lossless handling so edges stay sharp and legible.",
          "A useful habit is to compress once and check the result, rather than saving repeatedly. Each extra pass on a lossy file compounds the damage from earlier saves.",
        ],
        list: [
          "Compress photographs with lossy settings for the biggest savings",
          "Keep screenshots and line art lossless to protect sharp edges",
          "Check pixel dimensions as well as byte size",
          "Compare the result against the original before you publish",
        ],
      },
      {
        heading: "Compressing images in the browser",
        paragraphs: [
          "Filekind compresses JPEG and PNG input and writes a JPEG at or below the limit you enter in KB or MB. The file is processed locally, so it is never uploaded to a server.",
          "Inputs up to 25 MB, 16,000 pixels per side, and 48 megapixels are accepted. If a target is unusually small, the tool may reduce dimensions to reach it, and it reports the final size and dimensions before you download.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does compression always reduce image quality?",
        answer:
          "Lossless compression never changes pixels. Lossy compression does, and how much depends on the setting and the image, so review the output whenever quality matters.",
      },
      {
        question: "What is a good compressed file size?",
        answer:
          "It depends on where the image is going. Email attachments, form uploads, and web pages each have their own ceilings, and the practical goal is the smallest file that still looks right in its final place.",
      },
      {
        question: "Can I compress a PNG without changing its pixels?",
        answer:
          "You can re-encode it losslessly, but real savings usually come from converting a photograph to JPEG. Converting a PNG with transparency to JPEG fills transparent areas with white.",
      },
    ],
  },
  {
    slug: "lossy-compression",
    term: "Lossy compression",
    title: "Lossy compression",
    metaTitle: "Lossy Compression: Quality Trade-offs Explained",
    description:
      "Lossy compression shrinks files by discarding data. Learn what it removes, how quality changes at each setting, and when a lossless option is the better choice.",
    definition:
      "Lossy compression reduces file size by permanently discarding image data that is least visible to the eye, which produces small files but prevents perfect recovery of the original.",
    summary:
      "Lossy compression makes files small by throwing away detail on purpose. It is the right trade for photographs and the wrong one for logos, text, and medical or legal records.",
    updated: "2026-09-24",
    keywords: [
      "lossy compression",
      "what is lossy compression",
      "lossy compression explained",
      "lossy compression quality",
      "lossy compression examples",
      "lossy compression and file size",
      "lossy compression types",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/lossless-compression", label: "Lossless compression" },
      { href: "/compare/lossy-vs-lossless", label: "Lossy vs lossless" },
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/glossary/image-quality", label: "Image quality" },
      { href: "/guides/how-to-keep-image-quality-when-compressing", label: "Compress without losing quality" },
    ],
    sections: [
      {
        heading: "What lossy compression removes",
        paragraphs: [
          "Encoders exploit how vision works. Contrast and color differences in busy areas are harder to see, so the algorithm simplifies those regions first and spends its bits on edges and faces that viewers notice.",
          "The discarded data cannot be restored. Opening a lossy file, editing it, and saving it again applies the process a second time, so quality drifts downward with every round trip.",
        ],
      },
      {
        heading: "How settings affect the result",
        paragraphs: [
          "Higher quality settings keep more data and produce larger files, while lower settings push compression harder. The useful range is where the image still looks right at its final display size.",
          "Dimension reduction often helps more than squeezing quality. A photo shown at 800 pixels wide does not need its original 4,000-pixel data, and trimming the excess shrinks the file sharply with little visible loss.",
        ],
        list: [
          "JPEG photographs for the web and email",
          "WebP files when a smaller modern format is acceptable",
          "Video and audio, which rely on the same principles",
          "Any file where a set size ceiling must be met",
        ],
      },
      {
        heading: "Lossy compression in Filekind",
        paragraphs: [
          "The Filekind compressor works this way. It takes a JPEG or PNG and searches for a JPEG output at or below the KB or MB limit you set, lowering quality or dimensions as needed to reach it.",
          "Because the output is JPEG, transparency in a PNG becomes white and fine detail may soften. The final size and dimensions are shown before downloading so you can judge the trade yourself.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which formats use lossy compression?",
        answer:
          "JPEG, WebP in lossy mode, and AVIF in lossy mode are common examples. PNG, GIF, and typical TIFF files use lossless methods instead.",
      },
      {
        question: "Can I recover quality from a lossy file?",
        answer:
          "No. The removed data is gone, and converting the file to a lossless format only preserves the already compressed result in a larger container.",
      },
      {
        question: "Is lossy compression bad for text screenshots?",
        answer:
          "It often is. Compression blurs fine letterforms and hard edges, so screenshots and logos usually look better as PNG, which keeps every pixel intact.",
      },
    ],
  },
  {
    slug: "lossless-compression",
    term: "Lossless compression",
    title: "Lossless compression",
    metaTitle: "Lossless Compression: Definition and Examples",
    description:
      "Lossless compression shrinks files without changing a single pixel. Learn how it works, which formats use it, and when a lossy format makes more sense.",
    definition:
      "Lossless compression reduces a file size by finding patterns and storing shorter descriptions, so the decoded image is identical to the original with no lost detail.",
    summary:
      "Lossless compression makes a file smaller while keeping every pixel identical to the source. It is the right choice for text, line art, screenshots, and any image that must stay exact.",
    updated: "2026-09-24",
    keywords: [
      "lossless compression",
      "what is lossless compression",
      "lossless compression explained",
      "lossless compression examples",
      "lossless compression vs lossy",
      "lossless compression formats",
      "lossless compression and quality",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/compare/lossy-vs-lossless", label: "Lossy vs lossless" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/zip-file", label: "ZIP file" },
      { href: "/glossary/image-compression", label: "Image compression" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "How lossless compression works",
        paragraphs: [
          "Lossless methods look for repetition. Long runs of similar pixels, flat backgrounds, and repeated color values are replaced with a compact description that a decoder expands back into the exact original.",
          "Because nothing is discarded, a file can be compressed, decompressed, and recompressed indefinitely without any drift in quality. That property makes lossless formats safe for masters and edits.",
        ],
      },
      {
        heading: "Formats that compress losslessly",
        paragraphs: [
          "PNG is the everyday example for images, while GIF, BMP, and typical TIFF files also avoid pixel loss. ZIP applies the same idea to any file, including photographs that are already compressed.",
          "The limit is simple: files with little internal pattern do not shrink much. A detailed photograph gives a lossless compressor very little redundancy, so savings are modest compared with lossy encoding.",
        ],
        list: [
          "PNG for graphics, screenshots, and transparency",
          "TIFF for scanning, print, and archival masters",
          "GIF for flat-color graphics within its palette",
          "ZIP for packaging files without altering their contents",
        ],
      },
      {
        heading: "When lossless is worth the size",
        paragraphs: [
          "Choose lossless whenever re-decoding must be exact: text-heavy screenshots, diagrams, logos, medical or legal imagery, and files that will be edited again later.",
          "Filekind converts lossless PNG files to JPEG when a smaller photograph-style file is needed. Converting to JPEG is a lossy step, and transparent areas become white, so keep a PNG master if pixels must stay exact. PNG input can also become static WebP, which keeps transparency while usually cutting the size further.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does lossless compression change image quality?",
        answer:
          "No. The decoded image is bit for bit identical to the original, so quality issues in a lossless file come from how it was created, not from compression.",
      },
      {
        question: "Why are lossless files still large?",
        answer:
          "They can only shrink what is redundant. Photos full of fine detail leave little for the compressor to exploit, so the file stays close to its raw size.",
      },
      {
        question: "Is PNG always lossless?",
        answer:
          "Yes. PNG has no lossy mode. When you need a smaller photograph, convert it to JPEG or WebP and accept the trade deliberately.",
      },
    ],
  },
  {
    slug: "resolution",
    term: "Resolution",
    title: "Resolution",
    metaTitle: "Image Resolution: What It Means and Why It Matters",
    description:
      "Resolution describes how much detail an image holds. Learn how pixel dimensions and density define it, how resolution affects file size, and when to reduce it.",
    definition:
      "Resolution describes how much detail an image contains, usually measured in pixel dimensions for screens or pixels per inch for print, and it determines how sharp an image can appear.",
    summary:
      "Resolution is the amount of detail an image carries. On screen it comes down to pixel dimensions, in print it adds density, and both drive file size.",
    updated: "2026-09-24",
    keywords: [
      "resolution",
      "what is resolution",
      "resolution explained",
      "resolution and file size",
      "resolution for print",
      "resolution settings",
      "resolution vs file size",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/dpi", label: "DPI" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
      { href: "/guides/how-to-reduce-photo-resolution", label: "Reduce photo resolution" },
    ],
    sections: [
      {
        heading: "Resolution on screen and in print",
        paragraphs: [
          "For screens, resolution is simply the pixel grid: a 3,000 by 2,000 image holds six million pixels and can display more detail than a 1,000 by 667 version of the same scene.",
          "For print, density joins the picture. Pixels per inch, often discussed alongside dots per inch, describes how tightly those pixels are packed onto paper, which decides how large a picture can be printed before it softens.",
        ],
      },
      {
        heading: "Why resolution drives file size",
        paragraphs: [
          "File size scales with pixel count. Doubling both dimensions multiplies the pixel total by four, and the stored data grows in step unless compression removes something.",
          "This is why the same photo can be 8 MB straight from a camera and 200 KB on a web page. The page version has fewer pixels and heavier compression, and at display size the difference is hard to see. Displays rarely show every level a file can store, either, so added depth mainly benefits editing rather than viewing.",
        ],
        list: [
          "More pixels mean more detail and a larger file",
          "Display size sets the resolution you actually need",
          "Print needs higher density than on-screen viewing",
          "Reducing resolution is the fastest way to shrink a file",
        ],
      },
      {
        heading: "Setting the right resolution",
        paragraphs: [
          "Match the image to where it will be shown. Web images rarely need more pixels than the widest place they will appear, and larger copies only slow loading and risk upload limits.",
          "Filekind resize and compress tools work in the browser under the limits of 16,000 pixels per side and 48 megapixels, so oversized camera files are still within reach for everyday edits.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does higher resolution mean better quality?",
        answer:
          "Only up to the point where you can see the extra detail. Beyond the display or print size, extra pixels add file size without adding visible quality.",
      },
      {
        question: "How do I check an image resolution?",
        answer:
          "Look at the pixel width and height, which most photo apps show in the file information panel. Those two numbers are the resolution that matters on screen.",
      },
      {
        question: "Is resolution the same as file size?",
        answer:
          "No. Resolution counts pixels, while file size counts stored bytes. Resolution is a major driver of size, but compression settings also change the result.",
      },
    ],
  },
  {
    slug: "dpi",
    term: "DPI",
    title: "DPI",
    metaTitle: "DPI: Dots Per Inch and Print Resolution Guide",
    description:
      "DPI measures how many dots a printer places in an inch. Learn what the number controls, how it differs from PPI, and when it affects your files.",
    definition:
      "DPI stands for dots per inch and measures how many physical ink or toner dots a printer places within one inch of a page to produce an image.",
    summary:
      "DPI counts the dots a printer lays down in an inch. It matters on paper, where density decides how sharp and how large a printed picture looks.",
    updated: "2026-09-24",
    keywords: [
      "dpi",
      "what is dpi",
      "dpi meaning",
      "dpi explained",
      "dpi for printing",
      "dpi vs ppi",
      "dpi and resolution",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/ppi", label: "PPI" },
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
    ],
    sections: [
      {
        heading: "What DPI actually measures",
        paragraphs: [
          "DPI describes output hardware. A printer places dots of ink side by side, and a higher dot count packs more of them into each inch, which smooths gradients and sharpens fine lines.",
          "The value is a printer or scanner setting rather than a property baked into a photograph. Image files carry pixel dimensions, and software combines those pixels with a DPI value when it sends the job to a device.",
        ],
      },
      {
        heading: "DPI, pixel count, and print size",
        paragraphs: [
          "Print size follows from a simple relationship: pixels divided by DPI gives inches. A 2,400-pixel-wide image placed at 300 DPI covers eight inches, and the same pixels at 150 DPI cover sixteen inches with lower density.",
          "Publishers commonly aim for around 300 DPI for photographs in print and accept lower values for large output viewed from a distance, since the eye cannot resolve the extra dots that far back.",
        ],
        list: [
          "Higher DPI means denser dots and finer detail on paper",
          "Print size equals pixel count divided by DPI",
          "Changing DPI does not alter the pixels in your file",
          "Screen display ignores printer DPI settings",
        ],
      },
      {
        heading: "DPI and digital files",
        paragraphs: [
          "For anything that stays on a screen, DPI has no effect. A web page uses the image's pixels directly, so only pixel dimensions and file size matter for loading and upload limits.",
          "That is why resizing pixels is the meaningful edit online. Filekind resize tools adjust dimensions in the browser, which is what actually changes what a website or form receives.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does DPI change image quality on screen?",
        answer:
          "No. Screens read pixels, not printer dots. Only the pixel dimensions affect how an image looks in a browser or an app.",
      },
      {
        question: "How do I change DPI on an image?",
        answer:
          "Open the file in an image editor and set the document or print resolution there. The pixels stay the same; only the DPI value written into the file changes.",
      },
      {
        question: "Is 300 DPI always necessary?",
        answer:
          "For small printed photographs, it is a reliable target. For large posters or images viewed from far away, lower density is acceptable because the extra dots are invisible at that distance.",
      },
    ],
  },
  {
    slug: "ppi",
    term: "PPI",
    title: "PPI",
    metaTitle: "PPI vs DPI: What Pixels Per Inch Really Means",
    description:
      "PPI describes screen density, not printer dots. Learn how pixels per inch is calculated, how it differs from DPI, and why it changes physical image size.",
    definition:
      "PPI stands for pixels per inch and measures how many pixels a display or image occupies in one inch of physical space, which determines its real-world size and sharpness.",
    summary:
      "PPI measures how many pixels fit into an inch on a screen or in a file. It sets physical size and perceived sharpness, and it is often confused with DPI.",
    updated: "2026-09-24",
    keywords: [
      "ppi",
      "what is ppi",
      "ppi vs dpi",
      "ppi meaning",
      "ppi for screens",
      "ppi and resolution",
      "ppi explained",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/dpi", label: "DPI" },
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/guides/how-to-reduce-photo-resolution", label: "Reduce photo resolution" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "What PPI measures",
        paragraphs: [
          "PPI is a density figure for pixels. Divide an image's pixel width by the inches it covers and you have its PPI, which tells you how tightly the pixel data is packed into physical space.",
          "A phone screen packs far more pixels into each inch than a desktop monitor, so the same image file looks smaller on the phone and sharper to the eye because the pixels are tinier.",
        ],
      },
      {
        heading: "PPI compared with DPI",
        paragraphs: [
          "The two are cousins. PPI counts pixels that a screen shows or a file holds, while DPI counts dots a printer places on paper. People use them interchangeably in conversation, but the domains differ.",
          "Confusing them leads to odd results. Changing DPI does not add or remove pixels, and a screen setting for PPI does not affect what a printer does with the same file.",
        ],
        list: [
          "PPI describes pixel density in a file or on a display",
          "DPI describes physical dots laid down by a printer",
          "Both are used to convert between pixels and inches",
          "Neither value is stored inside the raw pixel grid itself",
        ],
      },
      {
        heading: "Why PPI matters for print layouts",
        paragraphs: [
          "Document layouts use PPI to decide how large a picture appears on a page. Dropping a 600-pixel-wide image into a layout at 300 PPI places it two inches wide, and increasing the PPI shrinks it.",
          "On the web, PPI is mostly informational. What matters is pixel dimensions, which drive both rendering and file size, so reducing them is the edit that changes what users download.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is higher PPI always better?",
        answer:
          "Higher density gives sharper rendering up to the point where the display or print process can resolve it. Past that, extra pixels only inflate file size without visible benefit.",
      },
      {
        question: "How do I find the PPI of a photo?",
        answer:
          "Check the file information or print settings in an image editor. You will see pixel dimensions alongside a resolution value expressed in pixels per inch.",
      },
      {
        question: "Does PPI affect file size?",
        answer:
          "Not directly. File size follows pixel count and compression. PPI only matters when pixels are converted into a physical measurement, such as in a printed document.",
      },
    ],
  },
  {
    slug: "pixel",
    term: "Pixel",
    title: "Pixel",
    metaTitle: "Pixel: The Smallest Unit of a Digital Image",
    description:
      "A pixel is one colored square in a digital image. Learn how pixels form a grid, how they create color, and how pixel counts shape file size.",
    definition:
      "A pixel is the smallest addressable unit of a digital image, a single sample of color and brightness that combines with millions of others to form a picture.",
    summary:
      "A pixel is one tiny sample of color in a digital image. Arrange millions of them in a grid and the eye reads a photograph instead of a pattern.",
    updated: "2026-09-24",
    keywords: [
      "pixel",
      "what is a pixel",
      "pixel definition",
      "pixel grid",
      "pixel color",
      "pixel size",
      "pixels and images",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/megapixel", label: "Megapixel" },
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/glossary/raster-image", label: "Raster image" },
      { href: "/glossary/color-depth", label: "Color depth" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
    ],
    sections: [
      {
        heading: "What a pixel contains",
        paragraphs: [
          "On its own, a pixel has no fixed physical size. It is a position in a grid plus color values, usually separate amounts of red, green, and blue, that a display turns into light.",
          "Because pixels are samples rather than objects, the same grid can be shown on a small phone or a large monitor. On-screen size depends on the display, while the data stays unchanged.",
        ],
      },
      {
        heading: "From pixels to a visible image",
        paragraphs: [
          "Images store pixels in rows, and the count along each edge is the resolution. A 1,200 by 800 picture holds 960,000 pixels, each one contributing a single dot of tone and color.",
          "Viewed from normal distance the eye blends neighboring pixels, so gradients look continuous. Move close enough, or zoom far enough, and the individual squares become visible as blocky edges.",
        ],
        list: [
          "Width and height in pixels give the image dimensions",
          "Total pixel count drives storage and memory use",
          "More pixels preserve finer detail when magnified",
          "Each pixel stores color through its channel values",
        ],
      },
      {
        heading: "Pixels, files, and practical limits",
        paragraphs: [
          "Every extra pixel adds data, so pixel count is the first lever when a file is too large. Trimming dimensions reduces size faster than compression alone, with visible loss only if you cut more than the display needs.",
          "Filekind accepts images up to 16,000 pixels on a side and 48 megapixels in total, which covers typical phone and camera output while keeping browser processing responsive.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many pixels are in a photo?",
        answer:
          "Multiply the width by the height. A 4,000 by 3,000 camera image contains 12 million pixels, which is what the term megapixel describes.",
      },
      {
        question: "Can I see individual pixels?",
        answer:
          "Yes, if you zoom in far enough or the image is displayed larger than its pixel grid allows. Sharp edges show the stair-step pattern of neighboring squares.",
      },
      {
        question: "Do more pixels always mean a better picture?",
        answer:
          "Only when you can use them. Extra pixels help with cropping and large prints, while on-screen viewing at a fixed size rewards good compression more than raw pixel count.",
      },
    ],
  },
  {
    slug: "megapixel",
    term: "Megapixel",
    title: "Megapixel",
    metaTitle: "Megapixels: What They Mean for Photo Quality",
    description:
      "A megapixel equals one million pixels. Learn how to work out a camera megapixel count, how pixel totals affect file size, and how many you really need.",
    definition:
      "A megapixel is one million pixels, so a camera or image with a stated megapixel count holds that many samples of color across its grid.",
    summary:
      "A megapixel is one million pixels. Camera marketing leans on the number, but the practical question is whether those pixels fit where you plan to display or print the image.",
    updated: "2026-09-24",
    keywords: [
      "megapixel",
      "what is a megapixel",
      "megapixel definition",
      "megapixel camera",
      "megapixel vs resolution",
      "megapixel file size",
      "megapixel comparison",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "Counting megapixels",
        paragraphs: [
          "Multiply pixel width by pixel height and divide by a million. A 6,000 by 4,000 image holds 24 million pixels, which is 24 megapixels, and the same math works in reverse to find dimensions from a count.",
          "Sensors often report a slightly higher number than the final photo, because some pixels are cropped or used for stabilization. The image you actually keep is what matters for file size and detail.",
        ],
      },
      {
        heading: "How many megapixels you need",
        paragraphs: [
          "Screen viewing needs far fewer pixels than large prints. A phone display shows a fraction of what a modern sensor captures, so extra pixels mostly buy headroom for cropping.",
          "More pixels also mean heavier files. Storage, upload limits, and editing speed all respond to pixel count, which is why oversized images are often reduced before sharing.",
        ],
        list: [
          "Social posts and web galleries: modest counts are enough",
          "Heavy cropping: extra pixels preserve detail after the cut",
          "Large prints: density matters more than raw count",
          "Uploads: fewer pixels help clear size limits",
        ],
      },
      {
        heading: "Megapixels and Filekind limits",
        paragraphs: [
          "Filekind caps input at 48 megapixels and 16,000 pixels per side, which comfortably covers most phone and consumer camera output while keeping in-browser processing fast. Files inside those ceilings can still be resized down when the destination only needs a fraction of the available pixels.",
          "When a file exceeds what a form allows, reducing the pixel count is usually the most effective fix, followed by stronger compression for what remains.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a higher megapixel camera always better?",
        answer:
          "Not necessarily. Lens quality, sensor design, and lighting shape the final picture as much as pixel count, and very dense sensors can produce noisier files in poor light.",
      },
      {
        question: "Do megapixels affect file size?",
        answer:
          "Yes. File size grows with pixel count, so a higher megapixel image tends to be larger unless compression offsets the difference.",
      },
      {
        question: "What is the megapixel count of my photo?",
        answer:
          "Multiply the width and height in pixels and divide by one million, or read the value from the file details in most photo apps.",
      },
    ],
  },
  {
    slug: "aspect-ratio",
    term: "Aspect ratio",
    title: "Aspect ratio",
    metaTitle: "Aspect Ratio: How to Read and Use It in Images",
    description:
      "Aspect ratio is the shape of an image. Learn the common ratios, how to work one out from pixel dimensions, and how resizing changes a photo's shape.",
    definition:
      "Aspect ratio compares an image's width to its height as a simple proportion, describing its shape independently of how many pixels it contains.",
    summary:
      "Aspect ratio describes an image's shape as a proportion of width to height. It stays the same when you scale an image and changes only when you crop or stretch it.",
    updated: "2026-09-24",
    keywords: [
      "aspect ratio",
      "what is aspect ratio",
      "aspect ratio explained",
      "aspect ratio meaning",
      "aspect ratio examples",
      "aspect ratio resize",
      "aspect ratio and cropping",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/glossary/image-resizing", label: "Image resizing" },
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/compare/a4-vs-letter", label: "A4 vs Letter" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "How to read an aspect ratio",
        paragraphs: [
          "An aspect ratio is written as two numbers separated by a colon, such as 4 by 3 or 16 by 9. The first number describes width and the second height in relative terms.",
          "Any pixel size can reduce to the same shape. Both 1,600 by 1,200 and 800 by 600 simplify to 4 by 3, so they share a shape even though one holds four times as many pixels.",
        ],
      },
      {
        heading: "Common ratios and where they appear",
        paragraphs: [
          "Traditional cameras and older televisions used 4 by 3, while widescreen displays and video settled on 16 by 9. Square formats use 1 by 1, and phones in portrait mode often shoot 9 by 16.",
          "Print and paper have their own shapes. A4 and Letter pages are close to but not identical with each other, which matters when an image is placed on a page without cropping.",
        ],
        list: [
          "4 by 3: classic cameras and some tablets",
          "16 by 9: widescreen monitors and video",
          "1 by 1: square social posts",
          "3 by 2 and 2 by 3: common still camera frames",
        ],
      },
      {
        heading: "Keeping the shape while resizing",
        paragraphs: [
          "Scaling both dimensions by the same factor preserves the ratio, so the picture gets bigger or smaller without distortion. Forcing one dimension alone stretches the image and makes subjects look wrong.",
          "Cropping is the other way to change shape, because it removes pixels from one edge. Filekind resize workflows use proportional scaling, and cropping itself is not offered as a tool today.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I find an image aspect ratio?",
        answer:
          "Divide the width by the height and reduce the result to the nearest simple whole numbers. For example, 1,920 by 1,080 reduces to 16 by 9.",
      },
      {
        question: "Does changing resolution change aspect ratio?",
        answer:
          "No, as long as both dimensions are scaled by the same factor. The shape stays constant and only the pixel count changes.",
      },
      {
        question: "Can I crop to a new aspect ratio in Filekind?",
        answer:
          "No. Filekind resizes by scaling pixels and does not offer a crop tool today, so use an editor when you need to cut an image down to a different shape.",
      },
    ],
  },
{
    slug: "image-dimensions",
    term: "Image dimensions",
    title: "Image dimensions",
    metaTitle: "Image Dimensions: Width, Height, and Pixels",
    description:
      "Image dimensions are an image's width and height in pixels. Learn how to read them, why they differ from file size, and when to reduce them.",
    definition:
      "Image dimensions are the width and height of a picture measured in pixels, which together determine how much detail it holds and how large it can display.",
    summary:
      "Image dimensions are the width and height of a picture in pixels. They decide how sharp an image can look, how much it weighs, and how big it can be printed.",
    updated: "2026-09-24",
    keywords: [
      "image dimensions",
      "what is image dimensions",
      "image dimensions meaning",
      "image dimensions and file size",
      "image dimensions explained",
      "image dimensions in pixels",
      "image dimensions checker",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/resolution", label: "Resolution" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/aspect-ratio", label: "Aspect ratio" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "Reading dimensions",
        paragraphs: [
          "Dimensions are always written as width by height, such as 1,920 by 1,080. The first number counts pixels across, the second counts them down, and their product is the total pixel count.",
          "Nearly every photo app shows these numbers in the file information panel, and the same values appear in most upload forms that restrict image size.",
        ],
      },
      {
        heading: "Dimensions versus file size",
        paragraphs: [
          "The two are related but separate. Dimensions count pixels, while file size counts stored bytes. Doubling both dimensions quadruples the pixel data, so size climbs quickly even when nothing else changes.",
          "Compression is the other lever. Two images with identical dimensions can differ enormously in weight depending on format and quality settings, which is why fixing a large file often means adjusting both.",
        ],
        list: [
          "Width and height are measured in pixels",
          "Total pixels equal width multiplied by height",
          "Fewer pixels usually mean a smaller file",
          "Compression changes size without changing dimensions",
        ],
      },
      {
        heading: "Choosing dimensions for the job",
        paragraphs: [
          "Size images for where they will appear. Web images rarely need to be wider than the largest place they will show, and oversized copies only waste bandwidth and risk failing an upload limit.",
          "Filekind resize workflows scale both dimensions together so the shape stays intact, within the shared limits of 16,000 pixels per side and 48 megapixels. Everything runs in the browser without an upload.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I check image dimensions?",
        answer:
          "Open the file details in your photo app or file manager and look for width and height. On a computer, the properties or info panel usually lists both values.",
      },
      {
        question: "Do dimensions determine file size?",
        answer:
          "They are the biggest factor for uncompressed data, but format and quality settings also matter. Two files with the same dimensions can still weigh very different amounts.",
      },
      {
        question: "What is a good size for a web image?",
        answer:
          "Match the widest spot the image will occupy and let compression handle the rest. Smaller dimensions load faster and make it easier to stay under upload limits.",
      },
    ],
  },
  {
    slug: "file-size",
    term: "File size",
    title: "File size",
    metaTitle: "File Size: How Digital Files Are Measured",
    description:
      "File size measures how much storage a digital file needs. Learn the units behind KB and MB, what drives image size, and how to bring it down.",
    definition:
      "File size is the amount of digital storage a file occupies, measured in bytes and typically expressed in kilobytes or megabytes for images and documents.",
    summary:
      "File size is the number of bytes a file takes up. It decides how fast an image loads, how much space it uses, and whether a website will accept it.",
    updated: "2026-09-24",
    keywords: [
      "file size",
      "what is file size",
      "file size meaning",
      "file size units",
      "file size explained",
      "file size and storage",
      "file size in kb",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/kilobyte", label: "Kilobyte (KB)" },
      { href: "/glossary/megabyte", label: "Megabyte (MB)" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/guides/how-to-check-an-image-file-size", label: "Check an image file size" },
      { href: "/guides/why-is-my-image-file-so-big", label: "Why your image file is so big" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "How file size is measured",
        paragraphs: [
          "Bytes are the base unit. A kilobyte holds about a thousand bytes, a megabyte about a million, and each step up is roughly a thousand times the one before it.",
          "The same photo can be described in several units: 180 KB, 0.18 MB, or 184,320 bytes. Upload forms quote whichever unit matches their limit, so it helps to move between them confidently.",
        ],
      },
      {
        heading: "What makes an image file big",
        paragraphs: [
          "Pixel count is the foundation. Every pixel contributes color data, so larger dimensions produce heavier files before any compression is applied.",
          "Format and quality set the rest. A lossless PNG of a detailed photo can outweigh the JPEG version by several times, and saving a picture at maximum quality keeps data that may never be seen.",
        ],
        list: [
          "High pixel dimensions add the most weight",
          "Lossless formats hold every pixel and cost more space",
          "Repeated lossy saves can add stray data",
          "Embedded metadata increases size slightly",
        ],
      },
      {
        heading: "Reducing file size",
        paragraphs: [
          "Lower dimensions first when the image is displayed small, then tune compression for what is left. Together these steps usually clear a limit that either change could not meet alone.",
          "Filekind compresses JPEG and PNG images to a size at or below a chosen KB or MB limit in the browser. It also reports the final size before you download, so you can confirm it fits.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a smaller file size always better?",
        answer:
          "No. Small files load faster, but push compression or dimensions too far and the image stops looking acceptable. The goal is the smallest file that still works in its final place.",
      },
      {
        question: "Why did my file get bigger after editing?",
        answer:
          "Editing programs often save with less compression, extra layers, or metadata. Exporting a fresh copy usually brings the size back down.",
      },
      {
        question: "How do I check an image file size?",
        answer:
          "Look at the properties or info panel for the file, which shows its size in bytes, KB, or MB. Browser upload forms also display the size when a file is selected.",
      },
    ],
  },
  {
    slug: "kilobyte",
    term: "Kilobyte (KB)",
    title: "Kilobyte (KB)",
    metaTitle: "Kilobyte: How Many Bytes and What It Holds",
    description:
      "A kilobyte is roughly a thousand bytes. Learn the exact numbers behind KB, what fits in one, and why photo upload limits are often set in KB.",
    definition:
      "A kilobyte is a unit of digital storage equal to 1,000 bytes by international convention or 1,024 bytes in older computing usage, and it is written as KB.",
    summary:
      "A kilobyte is a small unit of digital storage, roughly a thousand bytes. It is the scale where compressed photos, email attachments, and form limits usually live.",
    updated: "2026-09-24",
    keywords: [
      "kilobyte",
      "what is kilobyte",
      "kilobyte kb",
      "kilobyte to bytes",
      "kilobyte file size",
      "kilobyte vs megabyte",
      "kilobyte in images",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/megabyte", label: "Megabyte (MB)" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/guides/how-to-compress-a-photo-to-200kb", label: "Compress a photo to 200 KB" },
      { href: "/guides/how-to-reduce-image-size-in-kb", label: "Reduce image size in KB" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "How many bytes are in a kilobyte",
        paragraphs: [
          "Two conventions sit side by side. The international standard defines a kilobyte as 1,000 bytes, while computing history uses 1,024 bytes because it is a power of two.",
          "In practice the difference is small at this scale. A file listed as 200 KB is about 200,000 bytes either way, and forms that cap uploads at a KB figure care about the ballpark rather than the remainder.",
        ],
      },
      {
        heading: "What fits in a kilobyte",
        paragraphs: [
          "A kilobyte is enough for a short plain-text message, a line of code, or a heavily compressed thumbnail. Tens of kilobytes hold a simple icon, and a few hundred hold a web-sized photograph.",
          "Whole documents are the next step up. This page of text itself weighs only a few kilobytes, while photographs, audio, and video move into megabytes because they store far more data per second or per pixel.",
        ],
        list: [
          "A few KB: a line of plain text",
          "Tens of KB: a small icon or short note",
          "Hundreds of KB: a typical web photograph",
          "Thousands of KB: better described as megabytes",
        ],
      },
      {
        heading: "KB limits on upload forms",
        paragraphs: [
          "Government forms, job applications, and admission portals often cap portraits at 100 KB or 200 KB, which is why compressed copies are so common in those workflows.",
          "Filekind compresses to an exact ceiling you choose in KB, searching for a JPEG at or below that number while keeping the dimensions as large as possible. The work happens locally in your browser.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a kilobyte 1,000 or 1,024 bytes?",
        answer:
          "Both numbers are in use. The international standard sets 1,000 bytes for KB, and older computing usage counts 1,024. The gap is tiny compared with the jump to a megabyte.",
      },
      {
        question: "How many kilobytes are in a megabyte?",
        answer:
          "About 1,000 by the decimal convention, or 1,024 by the binary convention. Either way, a megabyte is a thousand times larger than a kilobyte.",
      },
      {
        question: "How do I get a photo under a KB limit?",
        answer:
          "Compress it to a target in KB and, if needed, reduce the pixel dimensions as well. Filekind takes a KB ceiling and returns a JPEG at or below it.",
      },
    ],
  },
  {
    slug: "megabyte",
    term: "Megabyte (MB)",
    title: "Megabyte (MB)",
    metaTitle: "Megabyte: Size, Uses, and Common Image Limits",
    description:
      "A megabyte is about a million bytes. Learn what MB means, how many KB it contains, and why image, document, and PDF uploads often set their limits in MB.",
    definition:
      "A megabyte is a unit of digital storage equal to about one million bytes, written as MB, and commonly used to express the size of photos, videos, and documents.",
    summary:
      "A megabyte is roughly a million bytes, the scale of a full-resolution photo or a short video clip. Upload limits and storage quotas are usually quoted in MB.",
    updated: "2026-09-24",
    keywords: [
      "megabyte",
      "what is megabyte",
      "megabyte mb",
      "megabyte to kilobytes",
      "megabyte file size",
      "megabyte image limit",
      "megabyte vs gigabyte",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/kilobyte", label: "Kilobyte (KB)" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/glossary/upload-limit", label: "Upload limit" },
      { href: "/guides/why-is-my-image-file-so-big", label: "Why your image file is so big" },
      { href: "/guides/how-to-upload-large-photos-to-a-website", label: "Upload large photos to a website" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "What a megabyte holds",
        paragraphs: [
          "A megabyte is about 1,000 kilobytes, or roughly one million bytes by the decimal convention. It is large enough for a full-resolution phone photo and small enough to attach to an ordinary email.",
          "Scale matters when choosing a limit. A page of text is a fraction of a megabyte, a photograph is often one or two, and a minute of video can run well past that.",
        ],
      },
      {
        heading: "MB limits you will meet",
        paragraphs: [
          "Web forms, email systems, and messaging apps each publish a ceiling in MB or KB. Photographs straight from a camera can exceed those ceilings comfortably, which is where compression comes in.",
          "Filekind sets its own limits for good reasons: images are accepted up to 25 MB, and PDFs up to 50 MB, so browser processing stays responsive while ordinary files pass through easily.",
        ],
        list: [
          "Images: up to 25 MB each",
          "PDFs: up to 50 MB each",
          "Rendered PDF output: up to 150 MB total",
          "Most email attachments: far smaller ceilings",
        ],
      },
      {
        heading: "Bringing a file under an MB limit",
        paragraphs: [
          "Start with dimensions if the image is displayed small, then adjust compression until the result clears the ceiling with a little room to spare.",
          "The Filekind compressor takes a limit in MB or KB and searches for a JPEG at or below it, reporting the final size and dimensions in the browser before anything is downloaded.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many kilobytes are in a megabyte?",
        answer:
          "About 1,000 kilobytes by the decimal convention, or 1,024 by the binary convention. Both are widely used, which is why quoted sizes can look slightly off.",
      },
      {
        question: "Is a 5 MB photo normal?",
        answer:
          "Yes for a modern camera at full resolution. That size is fine for storage, but it can exceed what a website or form will accept without compression.",
      },
      {
        question: "How do I reduce an image below a limit in MB?",
        answer:
          "Compress to a target set in MB, reducing pixel dimensions if quality alone cannot reach it. Filekind searches for a JPEG at or below the ceiling you enter.",
      },
    ],
  },
  {
    slug: "raster-image",
    term: "Raster image",
    title: "Raster image",
    metaTitle: "Raster Images: Pixels, Resolution, and Limits",
    description:
      "A raster image stores a grid of pixels. Learn how raster files hold detail, why they lose sharpness when enlarged, and how they differ from vectors.",
    definition:
      "A raster image stores a picture as a grid of colored pixels, so its detail is fixed at one resolution and enlarging it beyond that grid reveals blocky edges.",
    summary:
      "A raster image is a picture built from a fixed grid of pixels. Photographs, screenshots, and most phone pictures are raster, and they scale only within their pixel count.",
    updated: "2026-09-24",
    keywords: [
      "raster image",
      "what is raster image",
      "raster image explained",
      "raster image vs vector",
      "raster image formats",
      "raster image pixel grid",
      "raster image resolution",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/vector-image", label: "Vector image" },
      { href: "/compare/vector-vs-raster", label: "Vector vs raster" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/guides/how-to-change-an-image-file-type", label: "Change an image file type" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "How raster images store pixels",
        paragraphs: [
          "A raster file lists every pixel in the grid, usually row by row, along with color values for each one. JPEG, PNG, WebP, GIF, BMP, and TIFF all describe themselves this way.",
          "Because the grid is fixed, resolution and detail are fixed too. The file holds exactly as much information as its dimensions allow and no more, which makes pixel count the ceiling on visible detail.",
        ],
      },
      {
        heading: "Strengths and limits of raster",
        paragraphs: [
          "Raster excels at continuous tone. Photographs, gradients, shadows, and textures are natural subjects because each pixel can hold an independent color sampled from the real world.",
          "Scaling is where raster falters. Enlarging beyond the original grid requires guessing what the new pixels should be, which softens edges and can make text or logos look mushy.",
        ],
        list: [
          "Photographs and continuous-tone artwork",
          "Screenshots and scanned documents",
          "Any image with subtle shading or noise",
          "Content that must display on every device",
        ],
      },
      {
        heading: "Working with raster files in Filekind",
        paragraphs: [
          "Filekind works entirely with raster images: JPEG, PNG, and static WebP for conversion, plus PNG and JPEG for compression. Pages of a PDF are also rendered to raster output when you split them. Every still format the tools support stores a fixed grid, which is why pixel count stays the central limit for everything they produce.",
          "Processing happens in the browser under limits of 25 MB, 16,000 pixels per side, and 48 megapixels, so typical camera files fit without leaving the device.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between raster and vector?",
        answer:
          "Raster images store pixels and stay locked to a resolution, while vector images store shapes drawn from coordinates and scale without loss. Photos need raster; logos often prefer vector.",
      },
      {
        question: "Which formats are raster?",
        answer:
          "JPEG, PNG, WebP, GIF, BMP, and TIFF are all raster formats. SVG is the common vector format used on the web.",
      },
      {
        question: "Can a raster image be enlarged without losing quality?",
        answer:
          "Not beyond its original grid. Interpolation can invent pixels and keep edges plausible, but genuine detail is never recovered.",
      },
    ],
  },
  {
    slug: "vector-image",
    term: "Vector image",
    title: "Vector image",
    metaTitle: "Vector Images: Shapes That Scale Infinitely",
    description:
      "A vector image draws shapes from math instead of pixels. Learn why vectors stay sharp at any size, where they fit, and how they compare with raster.",
    definition:
      "A vector image describes graphics as shapes, paths, and text defined by coordinates, so the artwork can be scaled to any size without losing sharpness.",
    summary:
      "A vector image is drawn from geometry rather than pixels, so it stays crisp at every size. Logos, icons, and diagrams are typical vector work.",
    updated: "2026-09-24",
    keywords: [
      "vector image",
      "what is vector image",
      "vector image explained",
      "vector image vs raster",
      "vector image formats",
      "vector image scalability",
      "vector image examples",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/raster-image", label: "Raster image" },
      { href: "/glossary/svg", label: "SVG" },
      { href: "/compare/vector-vs-raster", label: "Vector vs raster" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/glossary/png", label: "PNG" },
    ],
    sections: [
      {
        heading: "How vectors describe artwork",
        paragraphs: [
          "Instead of a grid, a vector file lists instructions: draw a line between two points, fill this closed path with a color, curve this segment through a control point. Coordinates and attributes, not pixels.",
          "A viewer follows those instructions at whatever resolution it needs. The same source can render as a tiny favicon or a wall-sized banner with identical, clean edges.",
        ],
      },
      {
        heading: "Where vector images fit",
        paragraphs: [
          "Logos, icons, typography, charts, maps, and technical drawings are natural vector subjects because they are built from clean geometry and often need recoloring or resizing.",
          "Photographs are a poor match. Reproducing the subtle variation of a real scene as shapes would demand an impractical number of instructions, so pictures stay raster. Coordinates are stored as numbers, which keeps the file small and the artwork editable at any later date.",
        ],
        list: [
          "Logos that must work from business card to billboard",
          "Interface icons and symbols",
          "Diagrams, charts, and line drawings",
          "Artwork that needs precise recoloring",
          "Print pages that must output at press resolution",
        ],
      },
      {
        heading: "Vector files and Filekind",
        paragraphs: [
          "Filekind does not convert vector files today. Its converter handles JPEG, PNG, and static WebP, and its compressor reads JPEG and PNG, all of which are raster. Export settings that fix a pixel width give a predictable starting point for the raster version.",
          "To use a vector here, export a raster copy from design software first. Once it is a PNG or JPEG, conversion and compression run in the browser without uploading the file.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is SVG a vector format?",
        answer:
          "Yes. SVG stores shapes and paths in a text file, which is why it scales cleanly and stays editable by hand.",
      },
      {
        question: "Why does my vector look blurry?",
        answer:
          "You are likely viewing a raster export or a low-resolution preview rather than the vector source. Opening the original file restores the crisp edges.",
      },
      {
        question: "Can Filekind convert a vector logo to PNG?",
        answer:
          "No. Filekind works with JPEG, PNG, and static WebP only. Rasterize the logo in vector software, then convert or compress the exported image here.",
      },
    ],
  },
  {
    slug: "transparency",
    term: "Transparency",
    title: "Transparency",
    metaTitle: "Transparency in Images: Alpha in Practice",
    description:
      "Transparency lets backgrounds show through an image. Learn how alpha works, which formats keep it, and what happens when a transparent file becomes JPEG.",
    definition:
      "Transparency is an image property that lets some pixels show the background or layers beneath them instead of painting a solid color, and it is stored through an alpha channel.",
    summary:
      "Transparency lets parts of an image stay see-through so a page or logo sits cleanly on any background. Not every format can store it, and JPEG is one that cannot.",
    updated: "2026-09-24",
    keywords: [
      "transparency",
      "what is transparency",
      "transparency in images",
      "transparency explained",
      "transparency and alpha",
      "transparency image formats",
      "transparency vs white background",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/alpha-channel", label: "Alpha channel" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/webp", label: "WebP" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
      { href: "/convert-image/png-to-jpg", label: "PNG to JPG" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "How transparency works",
        paragraphs: [
          "Each pixel can carry an opacity value alongside its color. A value of fully opaque paints normally, fully transparent leaves whatever is underneath visible, and the range between gives soft, anti-aliased edges.",
          "That in-between range is what makes cutout photos look natural. Hair, shadows, and curved borders blend into their new surroundings instead of showing a hard rectangular boundary. Editing tools preview that blend live, so a cutout can be checked against light and dark backgrounds before export.",
        ],
      },
      {
        heading: "Which formats keep transparency",
        paragraphs: [
          "PNG, static WebP, GIF, and TIFF can all carry transparency, with PNG and WebP offering smooth alpha values. JPEG cannot, because the format has no channel for opacity.",
          "Converting a transparent image to JPEG therefore requires a decision. Most tools flatten it against white or another solid color, and the transparent region becomes ordinary pixels.",
        ],
        list: [
          "PNG: full alpha with lossless storage",
          "Static WebP: alpha with smaller files",
          "GIF: only fully on or fully off transparency",
          "JPEG: no transparency support at all",
        ],
      },
      {
        heading: "Transparency when converting",
        paragraphs: [
          "Filekind keeps transparency intact when moving between PNG and static WebP, since both store an alpha channel. Converting to JPEG flattens it, and transparent areas are filled with white.",
          "The compressor behaves the same way: PNG input becomes JPEG output, so keep a PNG copy whenever the transparent background matters. Checking the result on a busy background is the quickest way to spot a flattened export.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I make a transparent image?",
        answer:
          "Use an editor with a selection or eraser tool, remove the background, and export as PNG or static WebP so the empty areas stay empty.",
      },
      {
        question: "Why does my PNG show a checkered background?",
        answer:
          "The checkerboard is a display convention meaning nothing is painted there. It stands in for the transparency and disappears once the image sits on a real background.",
      },
      {
        question: "Does JPEG support transparency?",
        answer:
          "No. JPEG has no alpha channel, so any transparent region is filled with a solid color when the file is written as JPEG.",
      },
    ],
  },
  {
    slug: "alpha-channel",
    term: "Alpha channel",
    title: "Alpha channel",
    metaTitle: "Alpha Channel: What It Stores and How It Works",
    description:
      "The alpha channel is the part of an image that stores opacity. Learn what it holds, how it combines with RGB, and which image formats include it.",
    definition:
      "An alpha channel is an extra layer of per-pixel data in an image that records how opaque each pixel is, from fully transparent to fully solid for every pixel it covers.",
    summary:
      "An alpha channel stores opacity for every pixel, from invisible to solid. It is what makes soft edges, cutouts, and layered compositions possible in a single file.",
    updated: "2026-09-24",
    keywords: [
      "alpha channel",
      "what is alpha channel",
      "alpha channel explained",
      "alpha channel opacity",
      "alpha channel and transparency",
      "alpha channel formats",
      "alpha channel in png",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/transparency", label: "Transparency" },
      { href: "/glossary/color-depth", label: "Color depth" },
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/webp", label: "WebP" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
    ],
    sections: [
      {
        heading: "What the alpha channel stores",
        paragraphs: [
          "An image normally carries three channels: one for red, one for green, one for blue. An alpha channel adds a fourth, holding a number for each pixel that says how solid it is.",
          "Typical files give alpha eight bits, allowing 256 levels between invisible and opaque. That range produces smooth gradients, which is why shadows and soft borders survive compositing. Eight bits per channel is the everyday standard for still images on the web.",
        ],
      },
      {
        heading: "How alpha combines with color",
        paragraphs: [
          "When an image is placed over another, the viewer blends them using the alpha value. Opaque pixels cover what is below, transparent pixels let it through, and partial values mix the two.",
          "The same math handles anti-aliased text and feathered selections. Without alpha, every edge would be a hard step and every cutout would look like it was cut with scissors. Rendering engines read the values for each pixel and combine them with whatever sits underneath.",
        ],
        list: [
          "RGB channels carry color",
          "Alpha carries opacity",
          "Full alpha range allows soft edges",
          "Rendering blends layers using those values",
        ],
      },
      {
        heading: "Formats with and without alpha",
        paragraphs: [
          "PNG, static WebP, GIF, and TIFF support transparency, while JPEG does not include an alpha channel at all. GIF restricts alpha to on or off, so its edges are harsh.",
          "Filekind preserves alpha when converting between PNG and static WebP. Writing to JPEG fills transparent pixels with white, since the target format has nowhere to keep opacity. Keeping a PNG master makes it easy to repeat the conversion with the channel intact later.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is alpha the same as transparency?",
        answer:
          "Alpha is the data that implements transparency. The channel stores the values, and transparency is what viewers see when those values are applied.",
      },
      {
        question: "Which formats support an alpha channel?",
        answer:
          "PNG, static WebP, GIF, and TIFF do. JPEG does not, which is why converting a transparent file to JPEG flattens the background.",
      },
      {
        question: "Does converting to JPEG keep the alpha channel?",
        answer:
          "No. JPEG cannot store alpha, so Filekind fills transparent areas with white when a PNG or WebP becomes a JPEG.",
      },
    ],
  },
  {
    slug: "image-quality",
    term: "Image quality",
    title: "Image quality",
    metaTitle: "Image Quality: What Makes a Photo Look Sharp",
    description:
      "Image quality covers sharpness, color, and compression artifacts. Learn what drives perceived quality and how to preserve it while shrinking files for the web.",
    definition:
      "Image quality describes how faithfully a picture reproduces detail, color, and contrast, and it is shaped by capture, resolution, and compression rather than by file size alone.",
    summary:
      "Image quality is how clean and sharp a picture looks, and it depends on resolution, color, and compression rather than on file size by itself. Good quality at a small size is the real goal.",
    updated: "2026-09-24",
    keywords: [
      "image quality",
      "what is image quality",
      "image quality explained",
      "image quality vs file size",
      "image quality and compression",
      "image quality settings",
      "image quality sharpness",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/jpeg-artifacts", label: "JPEG artifacts" },
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/guides/image-quality-vs-file-size", label: "Image quality vs file size" },
      { href: "/guides/how-to-keep-image-quality-when-compressing", label: "Compress without losing quality" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "What determines perceived quality",
        paragraphs: [
          "Resolution sets the ceiling. Enough pixels must be present to resolve the detail you expect, or the image will look soft no matter how gently it was compressed.",
          "Compression sets how much of that ceiling survives. Aggressive lossy settings blur fine texture and introduce ringing around edges, while thoughtful settings preserve faces and text even at small sizes.",
        ],
      },
      {
        heading: "Quality versus file size",
        paragraphs: [
          "The two pull against each other: more retained detail means more bytes. The practical art is finding the lowest size where the image still looks right where it will be shown.",
          "Display size changes the answer. A photo shown at 600 pixels wide hides flaws that would be obvious at full resolution, which is why heavy compression often goes unnoticed on the web.",
        ],
        list: [
          "Check the image at its final display size",
          "Reduce dimensions before pushing compression hard",
          "Watch for blocky edges and smeared text",
          "Keep a high-quality master for future edits",
        ],
      },
      {
        heading: "Keeping quality while shrinking files",
        paragraphs: [
          "Compress once from the best available original. Repeated saves accumulate damage, so start from the master rather than from an already shared copy.",
          "Filekind compresses to a chosen limit and shows the resulting size and dimensions before download, letting you judge the trade in the browser. Inputs up to 25 MB and 48 megapixels are supported.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a bigger file always look better?",
        answer:
          "No. Size reflects pixels and stored data, and past a certain point extra bytes add nothing visible. Two files of equal size can also differ sharply in how they were encoded.",
      },
      {
        question: "How can I judge image quality?",
        answer:
          "Look at edges, fine text, and smooth areas at the size where the image will be used. Watch for blocky patches, halos, or smearing, which signal compression that went too far.",
      },
      {
        question: "Does resizing reduce quality?",
        answer:
          "Reducing dimensions removes pixels but usually leaves the image looking sharp at its new size, and it shrinks the file substantially. It is often gentler than extreme compression alone.",
      },
    ],
  },
  {
    slug: "jpeg-artifacts",
    term: "JPEG artifacts",
    title: "JPEG artifacts",
    metaTitle: "JPEG Artifacts: What Compression Rings Are",
    description:
      "JPEG artifacts are the blocky rings and smudges heavy compression leaves behind. Learn what causes them, how to spot them, and how to avoid them next time.",
    definition:
      "JPEG artifacts are visible distortions such as blocky patches, ringing around edges, and color blotches that appear when a JPEG image has been compressed too aggressively.",
    summary:
      "JPEG artifacts are the blocky patches and halos left by heavy compression. They are most visible around text, hard edges, and smooth skies, and they cannot be fully undone.",
    updated: "2026-09-24",
    keywords: [
      "jpeg artifacts",
      "what is jpeg artifacts",
      "jpeg artifacts explained",
      "jpeg artifacts fix",
      "jpeg artifacts and quality",
      "jpeg artifacts compression",
      "jpeg artifacts examples",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/glossary/image-quality", label: "Image quality" },
      { href: "/guides/how-to-keep-image-quality-when-compressing", label: "Compress without losing quality" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "Why JPEG produces artifacts",
        paragraphs: [
          "JPEG splits an image into small blocks and compresses each one using frequency data. When bits are dropped, the reconstruction of a block is approximate, and the seams between blocks can become visible.",
          "Edges make the problem obvious. Rapid changes in brightness create ringing, the faint ripples that outline a hard edge, and smooth gradients pick up mottled patches where the encoder ran out of detail.",
        ],
      },
      {
        heading: "How to spot artifacts",
        paragraphs: [
          "Zoom to full size and inspect areas that should be clean: blue skies, white walls, lettering, and the borders of objects. Blocky squares and colored blotches are the usual giveaways.",
          "Repeated saving makes them worse. Each pass recompresses the previous result, so artifacts compound even when the quality setting never changes.",
        ],
        list: [
          "Visible square blocks in flat areas",
          "Halos or ripples around sharp edges",
          "Color fringes in high-contrast detail",
          "Soft, smudged text after several saves",
        ],
      },
      {
        heading: "Preventing and reducing artifacts",
        paragraphs: [
          "Compress once from the original and stop when the image still looks clean at its final size. Avoid round-tripping a JPEG through more editors than necessary.",
          "Filekind compresses from a JPEG or PNG original to a JPEG at or below your target, and shows the result before download so you can raise the limit if artifacts appear. Everything runs in your browser. Starting from the cleanest available original keeps the visible damage to a single pass of compression.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can JPEG artifacts be removed?",
        answer:
          "Not fully. Filtering can soften them, and specialized tools can reduce them, but the discarded data is gone. The reliable fix is to compress less the next time.",
      },
      {
        question: "Do PNG files have JPEG artifacts?",
        answer:
          "No. PNG is lossless and does not produce compression artifacts, though a PNG converted from an already damaged JPEG will still show the original flaws.",
      },
      {
        question: "How do I compress without visible artifacts?",
        answer:
          "Start from the original, lower dimensions to what the display needs, and test the output at actual size. Filekind lets you raise the size limit until the image looks clean again.",
      },
    ],
  },
{
    slug: "image-resizing",
    term: "Image resizing",
    title: "Image resizing",
    metaTitle: "Image Resizing: Downscaling and Upscaling",
    description:
      "Image resizing changes pixel dimensions so files load faster and fit upload limits. Learn how downscaling and upscaling differ and how to resize without blur.",
    definition:
      "Image resizing changes the width and height of a picture by adding or removing pixels, which alters file size and display detail while keeping the content of the image.",
    summary:
      "Resizing changes how many pixels an image contains. Downscaling makes files smaller and usually looks clean, while upscaling invents pixels and rarely adds real detail.",
    updated: "2026-09-24",
    keywords: [
      "image resizing",
      "what is image resizing",
      "image resizing explained",
      "image resizing and quality",
      "image resizing downscaling",
      "image resizing upscaling",
      "image resizing in browser",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/glossary/aspect-ratio", label: "Aspect ratio" },
      { href: "/glossary/interpolation", label: "Interpolation" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/guides/how-to-reduce-photo-resolution", label: "Reduce photo resolution" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "Downscaling and upscaling",
        paragraphs: [
          "Downscaling removes pixels. When a 4,000-pixel photo becomes 1,200 pixels wide, each output pixel summarizes a group of originals, so the image stays sharp while the file shrinks dramatically.",
          "Upscaling does the reverse and must invent data. The software guesses what goes between existing pixels, which keeps edges plausible but cannot recover detail that was never captured.",
        ],
      },
      {
        heading: "Why resizing is the fastest way to a smaller file",
        paragraphs: [
          "File size scales with pixel count, so trimming dimensions cuts bytes faster than compression alone. Halving both edges divides the pixel total by four, and the compression stage then works on far less data.",
          "That is why resize and compress make a natural pair: set dimensions to what the destination needs, then tune quality for the remaining pixels.",
        ],
        list: [
          "Scale both edges together to preserve the shape",
          "Target the width where the image will actually appear",
          "Reduce dimensions before pushing compression hard",
          "Avoid repeated ups and downs across multiple saves",
        ],
      },
      {
        heading: "Resizing with Filekind",
        paragraphs: [
          "Filekind resize workflows scale images proportionally in the browser, so the aspect ratio stays intact and no file is uploaded. Inputs are accepted up to 25 MB, 16,000 pixels per side, and 48 megapixels.",
          "Resizing is not the same as cropping. Cropping removes a region to change the frame, and Filekind does not offer a crop tool today, so use an editor when you need to cut an image down.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does resizing reduce image quality?",
        answer:
          "Reducing dimensions usually leaves the image looking sharp at its new size and can even reduce visible noise. Enlarging beyond the original is what tends to soften detail.",
      },
      {
        question: "Should I resize or compress first?",
        answer:
          "Resize first when the image is much larger than it needs to be, then compress what is left. Doing it in that order usually reaches a target size with less visible damage.",
      },
      {
        question: "Can I crop an image with Filekind?",
        answer:
          "No. Filekind resizes by scaling pixels and does not include crop, rotate, or watermark tools today. Cropping needs an image editor.",
      },
    ],
  },
  {
    slug: "interpolation",
    term: "Interpolation",
    title: "Interpolation",
    metaTitle: "Interpolation: How Resized Images Guess Pixels",
    description:
      "Interpolation is how software invents pixels when an image changes size. Learn the common methods, why upscaling softens detail, and how to resize more cleanly.",
    definition:
      "Interpolation is the method a program uses to calculate new pixel values when an image is enlarged or reduced, based on the pixels that already exist nearby.",
    summary:
      "Interpolation is the math behind resizing. It decides what new pixels should look like when an image grows or shrinks, and different methods trade speed, smoothness, and sharpness.",
    updated: "2026-09-24",
    keywords: [
      "interpolation",
      "what is interpolation",
      "interpolation explained",
      "interpolation and resizing",
      "interpolation methods",
      "interpolation in images",
      "interpolation quality",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/image-resizing", label: "Image resizing" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/raster-image", label: "Raster image" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/resize-image", label: "Resize image" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
    ],
    sections: [
      {
        heading: "What interpolation does",
        paragraphs: [
          "When pixel counts change, every new position needs a value that did not exist before. Interpolation looks at surrounding pixels and computes a plausible color for that spot.",
          "Downscaling involves averaging groups of pixels, which naturally smooths the result. Upscaling has no extra data to draw on, so the method can only extrapolate from what is already there.",
        ],
      },
      {
        heading: "Common interpolation methods",
        paragraphs: [
          "Nearest neighbor copies the closest original pixel, which is fast and preserves hard edges but produces visible stair steps when enlarging. Bilinear and bicubic sampling blend more neighbors for smoother output.",
          "Sharper methods such as Lanczos weight neighboring pixels by position and are often favored for reductions. None of them can restore texture that the original image never contained.",
        ],
        list: [
          "Nearest neighbor: fast, blocky, good for pixel art",
          "Bilinear: smooth results with modest cost",
          "Bicubic: finer blending for photographs",
          "Lanczos-style filtering: crisp reductions with controlled halos",
        ],
      },
      {
        heading: "Interpolation and practical resizing",
        paragraphs: [
          "For everyday use, the method matters less than getting the target dimensions right. Sizing down to where the image will be displayed hides any softness the algorithm introduced.",
          "Filekind resize workflows scale images in the browser with the destination pixels in mind, keeping proportions fixed within the limits of 16,000 pixels per side and 48 megapixels. Previewing the result at full size is the quickest way to confirm the chosen method looks acceptable, and re-running with different dimensions is cheap when everything happens locally.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can interpolation make an image sharper?",
        answer:
          "It can increase apparent edge contrast, but it cannot add real detail. Sharpening after upscaling is a cosmetic fix, not a recovery of what was lost.",
      },
      {
        question: "Which interpolation method should I use?",
        answer:
          "Use a smooth method for photographs, and nearest neighbor only when preserving exact pixel blocks matters, such as with pixel art or screenshots at integer scale.",
      },
      {
        question: "Does interpolation change file size?",
        answer:
          "Yes, indirectly. The method determines the new pixel count, and pixel count is the main driver of file size once compression is applied.",
      },
    ],
  },
  {
    slug: "exif-data",
    term: "EXIF data",
    title: "EXIF data",
    metaTitle: "EXIF Data: What Your Photos Record and Why It Matters",
    description:
      "EXIF data records camera settings, dates, and sometimes location with every photo. Learn what is stored, why it affects file size, and how privacy is affected.",
    definition:
      "EXIF data is metadata written into a photo file that records details such as camera model, lens, exposure settings, capture time, and sometimes location.",
    summary:
      "EXIF data is the hidden record inside a photo: camera settings, the date it was taken, and sometimes where. It helps photographers review shots and can also reveal more than you intended.",
    updated: "2026-09-24",
    keywords: [
      "exif data",
      "what is exif data",
      "exif data explained",
      "exif data and privacy",
      "exif data in photos",
      "exif data examples",
      "exif data metadata",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/glossary/image-quality", label: "Image quality" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/guides/how-to-check-an-image-file-size", label: "Check an image file size" },
      { href: "/guides/why-is-my-image-file-so-big", label: "Why your image file is so big" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "What EXIF stores",
        paragraphs: [
          "Cameras and phones attach a block of fields to each capture: body and lens model, shutter speed, aperture, ISO, focal length, the exact time, and a color space description.",
          "Many devices also embed coordinates from location services. Some photos include orientation, software version, and thumbnails, all of which live in the same metadata block.",
        ],
      },
      {
        heading: "Why EXIF matters",
        paragraphs: [
          "For photographers, EXIF is a record of how a shot was made, which makes it useful for learning, sorting, and finding images later. Cataloging software relies on these fields heavily.",
          "The same fields are a privacy consideration. Posting a photo with intact location and time data can disclose where you were and when, which is often unintended for public uploads.",
        ],
        list: [
          "Camera, lens, and exposure settings",
          "Capture date and time, sometimes to the second",
          "GPS coordinates when location tagging is on",
          "Orientation and color profile information",
        ],
      },
      {
        heading: "EXIF and image processing",
        paragraphs: [
          "Metadata adds bytes, but usually only a small part of a photo's total size compared with pixel data. Editing programs often rewrite or drop fields during export, so check the output if a specific field matters.",
          "Filekind converts and compresses images in the browser, and whether metadata survives a conversion depends on the format and path taken. Confirm the output file when exact metadata is required. Keeping a copy of the original alongside any processed version is the simplest way to preserve the full record.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I view EXIF data?",
        answer:
          "Open the file information panel in a photo app, or use an EXIF viewer that reads the metadata block. Desktop file properties often show a summary as well.",
      },
      {
        question: "Does every photo have EXIF data?",
        answer:
          "Most camera and phone photos do, while screenshots, downloaded graphics, and files that have been through certain editors often do not.",
      },
      {
        question: "Does converting a file remove EXIF?",
        answer:
          "It can, but do not assume it does. Different tools behave differently, so inspect the result with an EXIF viewer when privacy or archival accuracy matters.",
      },
    ],
  },
  {
    slug: "color-depth",
    term: "Color depth",
    title: "Color depth",
    metaTitle: "Color Depth: Bits Per Pixel and Available Colors",
    description:
      "Color depth is how many bits each pixel uses to describe color. Learn what 8-bit and 24-bit mean, how many colors result, and where deeper depth helps.",
    definition:
      "Color depth is the number of bits used to store each pixel's color, which determines how many distinct colors an image can represent before banding appears.",
    summary:
      "Color depth counts the bits behind each pixel. More bits mean more possible colors and smoother gradients, at the cost of a larger file. Cameras and scanners choose sensible defaults, so most people never set it directly.",
    updated: "2026-09-24",
    keywords: [
      "color depth",
      "what is color depth",
      "color depth explained",
      "color depth and colors",
      "color depth bits per pixel",
      "color depth in images",
      "color depth and file size",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/rgb", label: "RGB" },
      { href: "/glossary/alpha-channel", label: "Alpha channel" },
      { href: "/glossary/grayscale", label: "Grayscale" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/glossary/tiff", label: "TIFF" },
      { href: "/compare/image-resolution-vs-file-size", label: "Resolution vs file size" },
    ],
    sections: [
      {
        heading: "How color depth is counted",
        paragraphs: [
          "Each channel stores a number of bits, and those channels multiply together. Eight bits per channel for red, green, and blue gives 24-bit color, with 256 steps in each channel and about 16.7 million possible colors.",
          "An alpha channel is usually counted separately, which is why a file with transparency is often described as 32-bit even though color itself still uses 24.",
        ],
      },
      {
        heading: "What deeper depth buys",
        paragraphs: [
          "More steps per channel produce smoother transitions. In skies, shadows, and studio backdrops, insufficient depth causes banding, where a smooth gradient breaks into visible stripes. High-bit files also absorb repeated exports with fewer visible shifts in tone.",
          "Editing benefits too. Adjusting exposure or color repeatedly rounds values, and files with generous depth absorb more of those operations before artifacts show.",
        ],
        list: [
          "8-bit per channel: standard for web and photography",
          "16-bit per channel: used for editing and TIFF masters",
          "Grayscale: one channel, typically 256 gray levels",
          "Extra alpha channel: opacity instead of color",
        ],
      },
      {
        heading: "Color depth and file size",
        paragraphs: [
          "Depth adds data in proportion to bits per pixel, so deeper files weigh more before compression. Web formats standardize on 8-bit channels because displays rarely show the difference.",
          "Filekind handles standard 8-bit web images through its JPEG, PNG, and static WebP conversions, which is what typical phone and camera output already uses. That matches what browsers and upload forms expect, so files stay compatible from processing to delivery.",
        ],
      },
    ],
    faqs: [
      {
        question: "What color depth do photos use?",
        answer:
          "Most consumer photos use 8 bits per channel, giving 24-bit color. Professional and archival workflows sometimes record 16 bits per channel for extra editing latitude.",
      },
      {
        question: "Can I see the difference between depths?",
        answer:
          "On smooth gradients, yes. Low depth on a large soft area can produce banding, while higher depth keeps the transition continuous.",
      },
      {
        question: "Does color depth change file size?",
        answer:
          "Yes. Each extra bit adds raw data, though compression and the content of the image determine the final size you actually see.",
      },
    ],
  },
  {
    slug: "rgb",
    term: "RGB",
    title: "RGB",
    metaTitle: "RGB: The Additive Color Model for All Screens",
    description:
      "RGB mixes red, green, and blue light to make every color on a screen. Learn how the model works, where hex values come from, and how it differs from print.",
    definition:
      "RGB is an additive color model that builds colors by combining red, green, and blue light, which is how monitors, phones, and cameras represent images.",
    summary:
      "RGB combines red, green, and blue light to create every color a screen shows. Full intensity of all three makes white, and no light at all makes black.",
    updated: "2026-09-24",
    keywords: [
      "rgb",
      "what is rgb",
      "rgb color model",
      "rgb explained",
      "rgb values",
      "rgb and screens",
      "rgb vs cmyk",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/cmyk", label: "CMYK" },
      { href: "/glossary/color-depth", label: "Color depth" },
      { href: "/glossary/grayscale", label: "Grayscale" },
      { href: "/glossary/pixel", label: "Pixel" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/glossary/png", label: "PNG" },
    ],
    sections: [
      {
        heading: "How additive color works",
        paragraphs: [
          "Screens emit light rather than reflecting it, so colors are built upward from darkness. Red and green light together read as yellow, green and blue make cyan, and all three at full strength make white.",
          "Each pixel carries three values, typically 0 to 255, describing how brightly each channel shines. Black is 0, 0, 0 and white is 255, 255, 255 in the usual 8-bit scale.",
        ],
      },
      {
        heading: "Reading RGB values and hex codes",
        paragraphs: [
          "Design tools write these triplets as decimal numbers or as hex strings. The color 255, 0, 0 becomes FF0000, which is the shorthand web designers use in stylesheets.",
          "Because values map directly to display channels, what you see depends on the screen's calibration. Two monitors can render the same RGB numbers with a slightly different appearance.",
        ],
        list: [
          "Red, green, and blue channels combine to form color",
          "Full intensity of all three produces white",
          "Hex codes are just compact notation for the same values",
          "Web images are stored and displayed in RGB",
        ],
      },
      {
        heading: "RGB in images and conversion",
        paragraphs: [
          "JPEG, PNG, and WebP all store pixels in RGB, so images look correct on any screen or browser without translation. That is one reason RGB dominates digital photography and the web.",
          "Print does not work the same way, and moving from RGB to ink-based color requires a conversion step, which is where CMYK comes in. Until that conversion happens, images displayed in browsers, editors, and photo apps all stay in RGB from capture to screen.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between RGB and CMYK?",
        answer:
          "RGB adds light for screens, while CMYK subtracts light using inks for print. Colors that look vivid on screen can shift when converted for press.",
      },
      {
        question: "Why does RGB make white when mixed?",
        answer:
          "It is an additive model. Adding more light brightens the result, so maximum red, green, and blue together produce white rather than gray.",
      },
      {
        question: "Do image formats store RGB?",
        answer:
          "Common web formats do, including JPEG, PNG, and WebP. Some print-oriented or specialized files use other channel arrangements instead.",
      },
    ],
  },
  {
    slug: "cmyk",
    term: "CMYK",
    title: "CMYK",
    metaTitle: "CMYK: The Subtractive Color Model for Print",
    description:
      "CMYK is the ink model printers use. Learn how cyan, magenta, yellow, and black combine, why screen colors shift in print, and when the conversion matters.",
    definition:
      "CMYK is a subtractive color model that creates colors by layering cyan, magenta, yellow, and black inks, and it is the standard model for commercial printing.",
    summary:
      "CMYK mixes four inks to reproduce color on paper. Because it subtracts reflected light instead of adding it, screen colors can look different once they reach a press.",
    updated: "2026-09-24",
    keywords: [
      "cmyk",
      "what is cmyk",
      "cmyk color model",
      "cmyk for print",
      "cmyk explained",
      "cmyk vs rgb",
      "cmyk printing",
    ],
    tool: { href: "/images-to-pdf", label: "Images to PDF" },
    related: [
      { href: "/glossary/rgb", label: "RGB" },
      { href: "/glossary/color-depth", label: "Color depth" },
      { href: "/glossary/pdf", label: "PDF" },
      { href: "/compare/a4-vs-letter", label: "A4 vs Letter" },
      { href: "/images-to-pdf", label: "Images to PDF" },
      { href: "/glossary/grayscale", label: "Grayscale" },
    ],
    sections: [
      {
        heading: "How subtractive color works",
        paragraphs: [
          "Ink absorbs light rather than emitting it. Each ink removes part of the white paper's reflection, so layers build darker and darker as more colors are added.",
          "Cyan, magenta, and yellow theoretically combine to black, but real inks produce a muddy brown instead, which is why a dedicated black channel is included for clean text and shadows.",
        ],
      },
      {
        heading: "Why RGB colors shift in print",
        paragraphs: [
          "Screens can show saturated greens and blues that ink cannot reproduce, so a straight conversion inevitably moves some colors. Bright neons and deep screen blues are the usual casualties.",
          "Print workflows manage this with profiles and, for critical jobs, proofing. Designing in CMYK from the start avoids surprises because the designer already works inside the printable range.",
        ],
        list: [
          "Four channels: cyan, magenta, yellow, and black",
          "Total ink limits prevent soaking the paper",
          "Black text stays crisp in the dedicated channel",
          "Vivid screen colors may fall outside the printable range",
        ],
      },
      {
        heading: "CMYK and everyday documents",
        paragraphs: [
          "Office printers and home devices handle the conversion automatically, so most people never see the model directly. Commercial print jobs are where explicit CMYK control matters.",
          "Filekind does not convert color spaces. It builds PDFs from JPG, PNG, and static WebP images in the browser, and the receiving printer or service decides how colors are produced. For office printing that handoff is invisible, while commercial jobs usually specify the profile the press expects before the file is sent.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is CMYK better than RGB?",
        answer:
          "Neither is better; they serve different outputs. RGB is correct for screens, and CMYK is correct when ink on paper is the final result.",
      },
      {
        question: "Should I convert images to CMYK before printing?",
        answer:
          "For professional printing, yes, typically with the printer's profile. Home and office printing handles conversion on its own, so an RGB file is fine.",
      },
      {
        question: "Can I make a PDF for print with Filekind?",
        answer:
          "Yes. Filekind arranges JPG, PNG, and static WebP images into a PDF in your browser, which you can then send to a printer or service.",
      },
    ],
  },
  {
    slug: "grayscale",
    term: "Grayscale",
    title: "Grayscale",
    metaTitle: "Grayscale Images: Tones Without Color Explained",
    description:
      "Grayscale images hold brightness only, with no color channels. Learn how many gray levels are typical, where grayscale helps, and how it affects file size.",
    definition:
      "A grayscale image stores only brightness information for each pixel, producing shades from black to white without any color channels.",
    summary:
      "A grayscale image drops color and keeps tone. One channel describes every shade from black to white, which can simplify documents and shrink some files.",
    updated: "2026-09-24",
    keywords: [
      "grayscale",
      "what is grayscale",
      "grayscale images",
      "grayscale vs color",
      "grayscale definition",
      "grayscale photo",
      "grayscale and file size",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/rgb", label: "RGB" },
      { href: "/glossary/color-depth", label: "Color depth" },
      { href: "/glossary/image-quality", label: "Image quality" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/glossary/raster-image", label: "Raster image" },
    ],
    sections: [
      {
        heading: "How grayscale is stored",
        paragraphs: [
          "Instead of three channels, a grayscale file keeps one value per pixel describing brightness. Eight bits gives 256 levels, spanning black, white, and every neutral step between.",
          "Colored originals are converted by calculating luminance, weighting the channels to match how the eye perceives brightness. The result looks like a black and white photograph rather than a faded color one. Dropping color is a display choice, and the original file can be kept alongside the neutral version.",
        ],
      },
      {
        heading: "Where grayscale is used",
        paragraphs: [
          "Scanned documents, newspaper imagery, medical imaging, and black-and-white printing all rely on grayscale. Removing color focuses attention on shape, texture, and contrast.",
          "Black and white photography remains a deliberate stylistic choice as well, since tone alone has to carry the composition. Web images in grayscale also give the compressor less variety to encode, which can help with detailed scenes.",
        ],
        list: [
          "Text documents and scanned pages",
          "Black and white printing and photocopying",
          "Technical images where color adds no meaning",
          "Photography focused on tone and contrast",
        ],
      },
      {
        heading: "Grayscale and file size",
        paragraphs: [
          "With one channel instead of three, the raw data is a third of a color image's, and the compression stage has less variety to encode. Savings are real for detailed images.",
          "Note the limit: Filekind converts between JPEG, PNG, and static WebP but does not perform a grayscale conversion itself. Desaturate the image in an editor first, then compress or convert the result here.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is grayscale the same as black and white?",
        answer:
          "In everyday use, yes. Technically grayscale holds neutral tones only, while a black and white image may also be described by its contrast and dynamic range.",
      },
      {
        question: "How many shades can a grayscale image show?",
        answer:
          "A typical 8-bit grayscale image holds 256 levels. Higher depths are possible in editing and archival formats to keep gradients smooth.",
      },
      {
        question: "Is a grayscale file always smaller?",
        answer:
          "Usually, because there is less data to store, but the subject and compression settings still matter. A very detailed grayscale photo can outweigh a simple color graphic.",
      },
    ],
  },
  {
    slug: "mime-type",
    term: "MIME type",
    title: "MIME type",
    metaTitle: "MIME Types: How Browsers Identify File Formats",
    description:
      "A MIME type tells software what a file really is. Learn the common types for images and PDFs, how browsers use them, and why mismatches cause problems.",
    definition:
      "A MIME type is a standard label such as image/jpeg that tells software what kind of data a file contains, independent of its file extension.",
    summary:
      "A MIME type is a short label that identifies file content to browsers, servers, and apps. The extension on disk is a hint; the MIME type is the declaration.",
    updated: "2026-09-24",
    keywords: [
      "mime type",
      "what is mime type",
      "mime type explained",
      "mime types for images",
      "mime type and browsers",
      "mime type list",
      "mime type meaning",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/file-extension", label: "File extension" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/guides/how-to-change-an-image-file-type", label: "Change an image file type" },
      { href: "/glossary/zip-file", label: "ZIP file" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/glossary/upload-limit", label: "Upload limit" },
    ],
    sections: [
      {
        heading: "How MIME types are written",
        paragraphs: [
          "The label has two parts separated by a slash: a broad type and a specific subtype. Image files use image/jpeg, image/png, and image/webp, while documents use application/pdf.",
          "The system began as a way for email to carry attachments of different kinds, and it now underpins how browsers, servers, and operating systems agree on what they are handling. The first word names the broad category, such as image or application, and the second pins down the exact encoding.",
        ],
      },
      {
        heading: "Common types for images and documents",
        paragraphs: [
          "Knowing the standard labels helps when a form or API asks for one. Mismatches between the extension and the true type are a common source of rejected uploads.",
          "Some types are interchangeable in practice: .jpg and .jpeg both declare image/jpeg, and the subtype for GIF is image/gif. Servers rely on the same labels when they decide whether to show a file inline or force a download.",
        ],
        list: [
          "image/jpeg for JPG and JPEG files",
          "image/png for PNG files",
          "image/webp for static WebP files",
          "application/pdf for PDF documents",
          "application/zip for ZIP archives",
        ],
      },
      {
        heading: "MIME types in browsers",
        paragraphs: [
          "Browsers use the type to decide whether to display a file inline or download it, and servers send it in headers so the receiving end can react correctly.",
          "Filekind's outputs follow these conventions, producing standard JPEG, PNG, WebP, PDF, and ZIP files that other software recognizes without special handling. Because the results are ordinary files, they can be attached to email or posted to a form without extra steps.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a MIME type the same as a file extension?",
        answer:
          "No. The extension is a naming convention, while the MIME type is a formal label describing the contents. They usually agree, but nothing guarantees it.",
      },
      {
        question: "How do I find a file MIME type?",
        answer:
          "Look for the file type or properties entry on your system, or run a file inspection command that reads the header. The header is the reliable source.",
      },
      {
        question: "What MIME type do images use?",
        answer:
          "Common ones are image/jpeg, image/png, and image/webp. PDFs use application/pdf, and ZIP files use application/zip.",
      },
    ],
  },
  {
    slug: "file-extension",
    term: "File extension",
    title: "File extension",
    metaTitle: "File Extensions: What Comes After the Dot",
    description:
      "A file extension signals what kind of file you have. Learn how it works, why three-letter names like JPG exist, and what happens when an extension lies.",
    definition:
      "A file extension is the short group of characters after the final dot in a file name that suggests to software what format the file uses.",
    summary:
      "A file extension is the label after the dot, such as .jpg or .pdf. It hints at the contents, but the real format lives in the file's data.",
    updated: "2026-09-24",
    keywords: [
      "file extension",
      "what is file extension",
      "file extension meaning",
      "file extension examples",
      "file extension and format",
      "file extension differences",
      "file extension list",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/mime-type", label: "MIME type" },
      { href: "/glossary/image-format", label: "Image format" },
      { href: "/guides/how-to-change-an-image-file-type", label: "Change an image file type" },
      { href: "/glossary/jpeg", label: "JPEG" },
      { href: "/convert-image", label: "Convert image" },
      { href: "/glossary/upload-limit", label: "Upload limit" },
    ],
    sections: [
      {
        heading: "How extensions work",
        paragraphs: [
          "An extension follows the last dot in a name and points operating systems toward the right program. Double-clicking photo.jpg opens an image viewer because the system reads .jpg first.",
          "Older systems allowed only three characters after the dot, which is why .jpg, .tif, and .gif are short while newer formats like .webp can use the full length.",
        ],
      },
      {
        heading: "When the extension is wrong",
        paragraphs: [
          "The extension is a label, not a guarantee. Renaming a PNG to .jpg changes nothing inside the file, and software that reads the actual data will still see PNG content.",
          "Mismatches cause real trouble. Upload forms and servers may trust the extension, reject the file, or display it incorrectly, so keeping name and content aligned avoids needless failures. Tools that read file headers instead identify the true format regardless of the name on disk.",
        ],
        list: [
          "jpg and jpeg: JPEG images",
          "png: lossless images with transparency",
          "webp: modern images, static or animated",
          "pdf: page documents",
          "zip: compressed archives",
        ],
      },
      {
        heading: "Changing a file type properly",
        paragraphs: [
          "To change a file type, convert the contents rather than the name. Conversion re-encodes the data so the extension, the MIME type, and the actual format all agree.",
          "Filekind converts JPEG, PNG, and static WebP into each other in the browser, producing a genuinely new file with the matching extension rather than a renamed copy. The same logic applies when an extension is missing entirely, since the contents are unchanged and can still be opened.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does renaming an extension change the format?",
        answer:
          "No. The bytes inside stay as they were, so the file is still the old format with a new label, and some programs will refuse to open it.",
      },
      {
        question: "Why do JPG and JPEG both exist?",
        answer:
          "Early operating systems limited extensions to three characters, so .jpg became the common shorthand. Both extensions refer to the identical format.",
      },
      {
        question: "Can Filekind change my file extension?",
        answer:
          "Yes, by converting the file. Choosing a different output format produces a real file of that type with the matching extension, created in your browser.",
      },
    ],
  },
  {
    slug: "zip-file",
    term: "ZIP file",
    title: "ZIP file",
    metaTitle: "ZIP Files: Compressed Archives Explained",
    description:
      "A ZIP file bundles other files and compresses them in one archive. Learn how ZIP works, why some files shrink and others do not, and when to use one.",
    definition:
      "A ZIP file is an archive that packages multiple files into one, compressing each one with a lossless method so the bundle takes less space and travels as a single item.",
    summary:
      "A ZIP file gathers other files into a single compressed archive. It is the standard way to send a folder by email or download many files at once in a single step.",
    updated: "2026-09-24",
    keywords: [
      "zip file",
      "what is zip file",
      "zip file explained",
      "zip file size",
      "zip file compression",
      "zip file and downloads",
      "zip file formats",
    ],
    tool: { href: "/pdf-to-images", label: "PDF to images" },
    related: [
      { href: "/glossary/lossless-compression", label: "Lossless compression" },
      { href: "/glossary/compression-ratio", label: "Compression ratio" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/guides/how-to-extract-images-from-a-pdf", label: "Extract images from a PDF" },
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/glossary/mime-type", label: "MIME type" },
    ],
    sections: [
      {
        heading: "What a ZIP archive does",
        paragraphs: [
          "ZIP stores several files and folders in one container and applies lossless compression to each entry. Opening the archive restores the original files byte for byte.",
          "A single archive also saves transfers. Sending one ZIP replaces a dozen attachments, and download managers handle one file more reliably than a long list. Archives can also hold folders, preserve file names, and group related assets so a recipient pulls down one item instead of many.",
        ],
      },
      {
        heading: "Why some ZIP files barely shrink",
        paragraphs: [
          "Compression needs redundancy to remove. Text, spreadsheets, and uncompressed images shrink well, while JPEG, PNG, WebP, and MP4 files are already compressed and often change very little.",
          "That is why adding photos to a ZIP mainly helps with packaging rather than size. The gain comes from convenience, not from squeezing bytes out of pictures. Re-zipping an already compressed photo therefore saves almost nothing, though the bundle is still easier to deliver.",
        ],
        list: [
          "Text documents and spreadsheets compress well",
          "Photos and videos are usually already compressed",
          "One archive is easier to upload than many files",
          "Extracted contents match the originals exactly",
        ],
      },
      {
        heading: "ZIP output from Filekind",
        paragraphs: [
          "When you render a PDF to images, Filekind can package every page into one ZIP for a single download, alongside individual page downloads. Pages are written as JPG or PNG before archiving.",
          "The archive is assembled in the browser along with the page renders, subject to the limits of 100 pages, 120 million rendered pixels, and 150 MB of total output.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does ZIP reduce image file size?",
        answer:
          "Only slightly. JPEG and PNG data is already compressed, so the archive mainly bundles files together rather than shrinking them much further.",
      },
      {
        question: "Is ZIP the same as rar or 7z?",
        answer:
          "They are all archive formats with different compression methods. ZIP has the broadest built-in support, so it remains the safest choice for sharing.",
      },
      {
        question: "How do I unzip a file?",
        answer:
          "Double-click it on most systems, or use the extraction command in your file manager. The contents are restored to their original state.",
      },
    ],
  },
{
    slug: "ocr",
    term: "OCR",
    title: "OCR",
    metaTitle: "OCR: Turning Scanned Text Into Editable Text",
    description:
      "OCR converts text inside images and scans into editable, searchable characters. Learn how recognition works, where it is used, and what it requires from a file.",
    definition:
      "OCR, short for optical character recognition, is the process of reading text from an image or scan and converting it into editable characters that software can search and copy.",
    summary:
      "OCR reads words out of a picture and turns them into real text. It is what makes scanned contracts searchable and photographed documents editable.",
    updated: "2026-09-24",
    keywords: [
      "ocr",
      "what is ocr",
      "ocr explained",
      "ocr for scanned documents",
      "ocr text recognition",
      "ocr and pdf",
      "ocr accuracy",
    ],
    tool: { href: "/images-to-pdf", label: "Images to PDF" },
    related: [
      { href: "/glossary/pdf", label: "PDF" },
      { href: "/images-to-pdf", label: "Images to PDF" },
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/guides/how-to-extract-images-from-a-pdf", label: "Extract images from a PDF" },
      { href: "/guides/how-to-convert-pdf-to-jpg", label: "Convert a PDF to JPG" },
    ],
    sections: [
      {
        heading: "How OCR works",
        paragraphs: [
          "OCR software analyzes shapes in an image and matches them against learned models of letters, numbers, and punctuation. Modern systems predict whole words from context, which helps with poor scans and unusual fonts.",
          "Accuracy depends on the input. Clean, high-contrast, level text at decent resolution recognizes far better than blurry photographs taken at an angle in dim light.",
        ],
      },
      {
        heading: "Where OCR is used",
        paragraphs: [
          "Digitizing archives, indexing receipts, extracting data from invoices, and adding search to scanned contracts are typical jobs. Phone scanners run it automatically so a photographed page becomes selectable text.",
          "In PDFs, OCR is the difference between a page that is a picture of words and a page that actually contains them. Only the second kind can be searched, copied, or read aloud.",
        ],
        list: [
          "Scanned contracts and forms that must be searchable",
          "Receipts and invoices for data entry",
          "Book pages and archived paper records",
          "Photographs of text shared for editing",
        ],
      },
      {
        heading: "OCR and Filekind",
        paragraphs: [
          "Filekind does not offer OCR today. The image-to-PDF tool arranges pictures into pages and states clearly that it does not add searchable text, so the output is not machine-readable word data.",
          "Filekind also does not edit PDF content. For OCR you need a dedicated recognition tool, and the results can then be brought back into a workflow as ordinary text or a new document. Recognizing text once at good resolution avoids repeating the work on every later copy of the same scan.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is every PDF searchable?",
        answer:
          "No. A PDF built from photographs has no text layer, so search and copy find nothing. OCR is what creates that layer from the visible characters.",
      },
      {
        question: "How accurate is OCR?",
        answer:
          "It varies with image quality and typography. Clean printed text usually recognizes well, while handwriting, faded ink, and skewed scans introduce errors that need manual review.",
      },
      {
        question: "Can Filekind make a scanned PDF searchable?",
        answer:
          "No. Filekind converts images to PDF and renders PDF pages to images, but it performs no OCR and adds no text layer to scanned content.",
      },
    ],
  },
  {
    slug: "thumbnail",
    term: "Thumbnail",
    title: "Thumbnail",
    metaTitle: "Thumbnails: Small Previews of Large Images",
    description:
      "Thumbnails are tiny previews of big images that let you scan a gallery fast. Learn how they are generated, why they speed up pages, and what size fits.",
    definition:
      "A thumbnail is a small copy of a larger image, usually a few hundred pixels wide, used as a quick preview in galleries, search results, and file lists for images.",
    summary:
      "A thumbnail is a small preview of a big picture. Galleries and file lists show them so you can scan hundreds of images without loading the full-size files.",
    updated: "2026-09-24",
    keywords: [
      "thumbnail",
      "what is thumbnail",
      "thumbnail image",
      "thumbnail size",
      "thumbnail explained",
      "thumbnail previews",
      "thumbnail and performance",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/image-resizing", label: "Image resizing" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/guides/how-to-resize-a-photo-for-a-website", label: "Resize a photo for a website" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "How thumbnails are made",
        paragraphs: [
          "A thumbnail is produced by downscaling the source image, then compressing the result. The aspect ratio stays intact, so the preview matches the shape of the original at a fraction of the data. Orientation and cropping decisions carry through as well, keeping previews faithful to the source.",
          "Many galleries keep several sizes rather than one, matching the preview to the layout and the screen so a phone does not download a desktop-sized asset.",
        ],
      },
      {
        heading: "Why thumbnails matter for speed",
        paragraphs: [
          "Loading full-resolution images in a grid would waste bandwidth and memory. Small previews let a page paint quickly and keep scrolling smooth while the larger files load only when requested.",
          "File size matters as much as pixel count here. A few hundred compact previews add up, so keeping each one light protects page performance. Gallery and search pages benefit most, since they may show dozens of previews on a single screen.",
        ],
        list: [
          "Gallery and search result previews",
          "File manager icons for images",
          "Video cover frames and poster images",
          "Contact sheets for photographers",
        ],
      },
      {
        heading: "Making your own previews",
        paragraphs: [
          "Any resizing tool can produce a thumbnail: set a modest width, keep the proportions, and compress the result. Downsizing from a large original usually looks clean at preview scale.",
          "Filekind resize workflows do exactly this in the browser, with inputs accepted up to 25 MB, 16,000 pixels per side, and 48 megapixels, and nothing uploaded to a server.",
        ],
      },
    ],
    faqs: [
      {
        question: "What size should a thumbnail be?",
        answer:
          "It depends on the layout. Previews in a grid often run a few hundred pixels wide, while compact file lists use smaller sizes, and matching the display size avoids wasted bytes.",
      },
      {
        question: "Is a thumbnail a different file?",
        answer:
          "Yes. It is a separate, much smaller image generated from the original, so galleries can show hundreds of them without fetching full-size pictures.",
      },
      {
        question: "Can I make thumbnails with Filekind?",
        answer:
          "You can create the preview by resizing an image to a small width in the browser, then keep the result alongside your full-resolution original.",
      },
    ],
  },
  {
    slug: "crop",
    term: "Crop",
    title: "Crop",
    metaTitle: "Cropping an Image: Cutting to a New Frame",
    description:
      "Cropping trims an image to a new frame by removing pixels from the edges. Learn how it changes shape and weight, and how it differs from resizing.",
    definition:
      "Cropping is cutting away part of an image so only a chosen region remains, which changes both the shape of the picture and the number of pixels it holds.",
    summary:
      "Cropping trims an image down to the part you want by removing pixels from the edges. It changes the frame and the file size, unlike resizing, which scales what is already there.",
    updated: "2026-09-24",
    keywords: [
      "crop",
      "what is crop",
      "crop image",
      "cropping explained",
      "crop vs resize",
      "crop an image",
      "crop and aspect ratio",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/image-resizing", label: "Image resizing" },
      { href: "/glossary/aspect-ratio", label: "Aspect ratio" },
      { href: "/glossary/image-dimensions", label: "Image dimensions" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/resize-image", label: "Resize image" },
      { href: "/glossary/image-rotation", label: "Image rotation" },
    ],
    sections: [
      {
        heading: "How cropping differs from resizing",
        paragraphs: [
          "Resizing scales the whole picture, keeping every subject in the frame while changing how many pixels represent it. Cropping discards pixels from the edges, so the composition itself changes.",
          "Both reduce file size, but only cropping lets you remove an unwanted region, tighten the subject, or move to a different shape such as a square.",
        ],
      },
      {
        heading: "Why people crop",
        paragraphs: [
          "A tighter frame can put the subject where it belongs, remove distracting elements at the border, or fit a specific display shape. Cropping is also a common way to improve composition after the shot.",
          "Because pixels are removed, the remaining image has fewer of them, so the file shrinks and any later enlargement has less data to work with.",
        ],
        list: [
          "Tighten the frame around the subject",
          "Remove unwanted edges or bystanders",
          "Match a required shape such as 1 by 1",
          "Cut out a detail to use on its own",
        ],
      },
      {
        heading: "Cropping with Filekind",
        paragraphs: [
          "Filekind does not offer a crop tool today. The resize tool scales an image proportionally, which changes size but keeps the entire frame and every subject in place.",
          "Cropping needs an image editor. Once the region is cut, the cropped file can be brought back for conversion or compression in the browser, within the standard 25 MB and 48 megapixel limits. Cropping before resizing usually gives better results too, since the resize then works only on pixels that will actually be shown.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is cropping the same as resizing?",
        answer:
          "No. Resizing changes the dimensions of the whole image, while cropping removes part of it. Cropping changes the shape; proportional resizing preserves it.",
      },
      {
        question: "Does cropping reduce file size?",
        answer:
          "Yes, because fewer pixels remain. The saved file also compresses better if the removed area held fine detail.",
      },
      {
        question: "Can I crop a photo in Filekind?",
        answer:
          "No. Filekind does not include a crop tool today, so use an editor to select the region, then return with the cropped file if you want to convert or compress it.",
      },
    ],
  },
  {
    slug: "image-rotation",
    term: "Image rotation",
    title: "Image rotation",
    metaTitle: "Image Rotation: Turning Photos by 90 Degrees",
    description:
      "Image rotation turns a picture by 90, 180, or any angle. Learn how straightening works, why orientation metadata exists, and what changes in the file itself.",
    definition:
      "Image rotation turns a picture around its center by a chosen angle, most often 90 or 180 degrees, so it displays upright without changing its content.",
    summary:
      "Rotation turns a photo so it displays upright, usually in 90-degree steps or a small tilt for straightening horizons. Metadata and pixels can both carry that orientation.",
    updated: "2026-09-24",
    keywords: [
      "image rotation",
      "what is image rotation",
      "image rotation explained",
      "image rotation 90 degrees",
      "image rotation and orientation",
      "image rotation tools",
      "image rotation quality",
    ],
    tool: { href: "/resize-image", label: "Resize image" },
    related: [
      { href: "/glossary/exif-data", label: "EXIF data" },
      { href: "/glossary/image-resizing", label: "Image resizing" },
      { href: "/glossary/aspect-ratio", label: "Aspect ratio" },
      { href: "/glossary/crop", label: "Crop" },
      { href: "/guides/how-to-resize-an-image", label: "Resize an image" },
      { href: "/resize-image", label: "Resize image" },
    ],
    sections: [
      {
        heading: "Types of rotation",
        paragraphs: [
          "Quarter turns swap the width and height, so a portrait shot displayed sideways is corrected without any loss of pixels. A 180-degree turn keeps dimensions the same and simply flips the image.",
          "Free rotation covers small angles for straightening a tilted horizon. Because the edges no longer align to the pixel grid, the result is usually recomputed, which can soften it slightly.",
        ],
      },
      {
        heading: "Orientation stored as metadata",
        paragraphs: [
          "Phones often record an orientation flag instead of rewriting pixels, letting a viewer display the picture correctly while the stored grid stays as captured. Editors bake the rotation in when you save.",
          "That distinction matters when sharing. Software that ignores the flag shows the picture sideways, which is why exports are sometimes flattened deliberately.",
        ],
        list: [
          "Quarter turns preserve every pixel",
          "Free angles recompute edge pixels",
          "Orientation metadata can stand in for baked rotation",
          "Rotating and then cropping is a common sequence",
        ],
      },
      {
        heading: "Rotation and Filekind",
        paragraphs: [
          "Filekind does not offer an image rotation tool today. Its resize tool scales dimensions, and its PDF builder follows each image's shape with automatic page orientation, but neither turns an image.",
          "Straighten or rotate the photo in an image editor first. The corrected file can then be converted or compressed in the browser, where nothing is uploaded. Quarter turns are the safest case to apply once, because they reuse the original pixels instead of recomputing the grid.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does rotating an image reduce quality?",
        answer:
          "A 90-degree turn of the original pixels does not, as long as it is applied once and saved carefully. Repeated free-angle rotations do resample the image each time and soften it.",
      },
      {
        question: "Why is my photo sideways after uploading?",
        answer:
          "The receiving system likely ignored the orientation flag in the metadata. Flattening the rotation in an editor before uploading usually fixes it.",
      },
      {
        question: "Can I rotate an image in Filekind?",
        answer:
          "No. Filekind does not provide rotation or crop tools today. Rotate the photo in an editor, then use Filekind to convert, compress, or place it in a PDF.",
      },
    ],
  },
  {
    slug: "watermark",
    term: "Watermark",
    title: "Watermark",
    metaTitle: "Watermarks: Marking Images to Show Ownership",
    description:
      "A watermark overlays a name or logo on an image to claim ownership. Learn how visible and hidden marks work, why people add them, and their limits.",
    definition:
      "A watermark is text, a logo, or a pattern overlaid on an image or document to show ownership or source, either visibly across the picture or hidden within it.",
    summary:
      "A watermark places a name, logo, or notice over an image so viewers know where it came from. Visible marks deter casual reuse, while hidden marks carry data inside the pixels.",
    updated: "2026-09-24",
    keywords: [
      "watermark",
      "what is watermark",
      "watermark explained",
      "watermark on images",
      "watermark and ownership",
      "watermark visible and hidden",
      "watermark examples",
    ],
    tool: { href: "/image-tools", label: "All image tools" },
    related: [
      { href: "/glossary/png", label: "PNG" },
      { href: "/glossary/vector-image", label: "Vector image" },
      { href: "/glossary/image-quality", label: "Image quality" },
      { href: "/image-tools", label: "All image tools" },
      { href: "/glossary/jpeg", label: "JPEG" },
    ],
    sections: [
      {
        heading: "Visible and hidden watermarks",
        paragraphs: [
          "A visible watermark sits on top of the picture, usually a logo, handle, or copyright notice placed with enough opacity to identify the source without blocking the content.",
          "A hidden watermark embeds a signal in the pixels themselves, invisible to the eye but readable by software. The mark can survive modest edits, which helps trace leaked copies.",
        ],
      },
      {
        heading: "Why watermarks are used",
        paragraphs: [
          "Creators use them to discourage uncredited reuse and to keep attribution attached as an image travels between sites. Stock libraries and news agencies rely on them heavily.",
          "The trade-off is visible damage to the picture. A heavy mark can ruin composition and sharpness, and any visible watermark can sometimes be cropped or painted out.",
        ],
        list: [
          "Credit a photographer or studio across shared images",
          "Mark drafts and previews before a client approves them",
          "Keep branding attached to graphics posted publicly",
          "Embed hidden signals when tracing copies matters",
        ],
      },
      {
        heading: "Watermarks and Filekind",
        paragraphs: [
          "Filekind does not offer a watermark tool today. The available tools convert, resize, compress, and build or split PDFs, and none of them overlay text or logos.",
          "Add the mark in an image editor or design tool first, then use Filekind for the rest of the pipeline. Everything runs in the browser, so the marked file is never uploaded. Keeping the overlay in the source file also makes it easy to swap sizes later without rebuilding or repositioning the mark each time.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a watermark be removed?",
        answer:
          "A visible one sometimes can, through cropping or editing, which limits how much protection it provides. Hidden watermarks are harder to see and often survive modest changes.",
      },
      {
        question: "Does a watermark affect file size?",
        answer:
          "Slightly. The extra detail can add a little data, but dimensions and compression settings remain the dominant factors in the final size.",
      },
      {
        question: "Can Filekind add a watermark to my photos?",
        answer:
          "No. Filekind does not include watermarking today. Create the marked image in an editor, then convert or compress it here if needed.",
      },
    ],
  },
  {
    slug: "batch-processing",
    term: "Batch processing",
    title: "Batch processing",
    metaTitle: "Batch Processing: Handling Many Files at Once",
    description:
      "Batch processing applies the same job to many files in one run. Learn where it saves time, how it keeps settings consistent, and what to check afterward.",
    definition:
      "Batch processing is running the same operation across many files at once, such as converting, renaming, or compressing a folder of images with identical settings.",
    summary:
      "Batch processing means doing one job to a whole stack of files instead of one at a time. It saves clicks and keeps settings consistent across a set.",
    updated: "2026-09-24",
    keywords: [
      "batch processing",
      "what is batch processing",
      "batch processing explained",
      "batch processing examples",
      "batch processing and workflow",
      "batch processing tools",
      "batch processing efficiency",
    ],
    tool: { href: "/images-to-pdf", label: "Images to PDF" },
    related: [
      { href: "/glossary/zip-file", label: "ZIP file" },
      { href: "/pdf-to-images", label: "PDF to images" },
      { href: "/guides/how-to-combine-images-into-one-pdf", label: "Combine images into one PDF" },
      { href: "/image-tools", label: "All image tools" },
      { href: "/compress-image", label: "Compress image" },
      { href: "/glossary/upload-limit", label: "Upload limit" },
    ],
    sections: [
      {
        heading: "Why batch processing helps",
        paragraphs: [
          "Repeating a manual task fifty times wastes time and invites mistakes. A batch run applies one configuration to every file, so results stay consistent and the operator only checks the output.",
          "Common jobs include converting a folder to one format, compressing everything to a size ceiling, renaming with a pattern, or rendering each page of a document to an image.",
        ],
      },
      {
        heading: "What a batch job needs",
        paragraphs: [
          "It needs a clear input set, one rule applied uniformly, and a place for results to land. Naming collisions, mixed orientations, and files of wildly different sizes are the usual snags.",
          "Verification matters as much as speed. Spot-checking a sample of outputs catches settings that looked right on the first file but fail on the rest of the set.",
        ],
        list: [
          "Apply one setting to many files",
          "Keep output naming predictable",
          "Check a sample before shipping everything",
          "Watch total output size for storage limits",
        ],
      },
      {
        heading: "Batch work with Filekind",
        paragraphs: [
          "Filekind does not offer batch compression or batch conversion today. Its compress and convert tools handle one image at a time, which keeps each step clear and stays within browser memory limits.",
          "Two tools do work across many items at once. Images to PDF takes multiple pictures and arranges them into one document, and PDF to images renders every page and packages them in a ZIP. Both still treat the set as a single job with shared settings, which is where the time saving of batching comes from.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Filekind compress many images at once?",
        answer:
          "No. Batch compression is not offered today, so each image is processed individually. Use Images to PDF when you need to handle several files together in one operation.",
      },
      {
        question: "What is the benefit of batch processing?",
        answer:
          "Consistency and speed. One configuration is applied to every file, which reduces repetitive work and keeps the whole set uniform.",
      },
      {
        question: "Can I make one PDF from many photos in a batch?",
        answer:
          "Yes. Images to PDF accepts multiple images, lets you set their order, and produces a single document with one image per page, created in the browser.",
      },
    ],
  },
  {
    slug: "static-webp",
    term: "Static WebP",
    title: "Static WebP",
    metaTitle: "Static WebP vs Animated WebP: Key Differences",
    description:
      "Static WebP holds a single still frame, while animated WebP stores a sequence. Learn how to tell them apart and which files are accepted for conversion.",
    definition:
      "Static WebP is a single-frame image in the WebP format with no animation, so it behaves like a JPEG or PNG and can be converted and compressed like other still images.",
    summary:
      "Static WebP is a still picture in the WebP format, exactly like a JPEG except for the encoding. Animated WebP is a different case that many tools refuse.",
    updated: "2026-09-24",
    keywords: [
      "static webp",
      "what is static webp",
      "static webp explained",
      "static webp vs animated webp",
      "static webp conversion",
      "static webp files",
      "static webp format",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/webp", label: "WebP" },
      { href: "/glossary/gif", label: "GIF" },
      { href: "/guides/how-to-open-a-webp-image", label: "Open a WebP image" },
      { href: "/compare/png-vs-webp", label: "PNG vs WebP" },
      { href: "/convert-image/webp-to-jpg", label: "WebP to JPG" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "Static versus animated WebP",
        paragraphs: [
          "A static WebP holds one frame, the same idea as a JPEG. An animated WebP stores a sequence of frames with timings, so a viewer plays them in a loop much like a GIF.",
          "The difference shows up in the data. Animated files carry multiple images and frame metadata, and tools that only understand a single frame cannot process them correctly.",
        ],
      },
      {
        heading: "How to tell them apart",
        paragraphs: [
          "Most photo apps and browsers identify the file type from its header rather than the extension, and some players show an animation control for moving files.",
          "A quick practical test is whether the image moves when opened. If it plays, it is animated, and any tool that promises still-image handling will need a frame exported first.",
        ],
        list: [
          "Static: one frame, behaves like a JPEG or PNG",
          "Animated: many frames played in sequence",
          "Animated files are usually larger",
          "Export a single frame to treat one as static",
        ],
      },
      {
        heading: "Static WebP in Filekind",
        paragraphs: [
          "Filekind converts static WebP to JPEG and PNG, and converts JPEG and PNG to static WebP, entirely within the browser. Animated WebP files are rejected rather than flattened without warning.",
          "Inputs follow the shared limits of 25 MB, 16,000 pixels per side, and 48 megapixels, and no file leaves the device during the conversion. Outputs open in any viewer that supports WebP stills, which covers current browsers, image editors, and most upload forms.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I convert an animated WebP with Filekind?",
        answer:
          "No. Filekind accepts static WebP only and rejects animated files so frames are never silently dropped. Export a still frame in other software first.",
      },
      {
        question: "Is static WebP smaller than PNG?",
        answer:
          "Usually, yes. WebP's compression generally produces smaller files at similar quality, which is one reason sites adopt it for photographs and graphics.",
      },
      {
        question: "How do I make a static WebP?",
        answer:
          "Open the image in an editor and export a single frame as WebP, or capture the still version of the picture. The result behaves like any other still image.",
      },
    ],
  },
  {
    slug: "image-format",
    term: "Image format",
    title: "Image format",
    metaTitle: "Image Formats: How Pictures Are Stored Online",
    description:
      "An image format decides how a picture is stored, compressed, and opened. Learn the main families, how to choose between them, and what limits each one.",
    definition:
      "An image format is the structure a file uses to store picture data, defining how pixels are compressed, whether transparency is possible, and which programs can open it.",
    summary:
      "An image format is the recipe a file follows to store a picture. It sets how compression works, whether transparency survives, and where the file can be opened.",
    updated: "2026-09-24",
    keywords: [
      "image format",
      "what is image format",
      "image format explained",
      "image format comparison",
      "image format choice",
      "image formats and quality",
      "image format list",
    ],
    tool: { href: "/convert-image", label: "Convert image" },
    related: [
      { href: "/glossary/image-compression", label: "Image compression" },
      { href: "/glossary/file-extension", label: "File extension" },
      { href: "/glossary/mime-type", label: "MIME type" },
      { href: "/glossary/raster-image", label: "Raster image" },
      { href: "/compare/jpg-vs-png", label: "JPG vs PNG" },
      { href: "/convert-image", label: "Convert image" },
    ],
    sections: [
      {
        heading: "What an image format defines",
        paragraphs: [
          "The format decides how pixels are laid out and compressed, whether the file can hold transparent pixels, whether animation is possible, and what metadata is allowed alongside the picture.",
          "Software reads the format from the file's internal header, not from the name on the end, which is why a mislabeled file still reveals its true type when inspected.",
        ],
      },
      {
        heading: "Choosing between common formats",
        paragraphs: [
          "JPEG is the default for photographs because it compresses them well and opens everywhere. PNG suits graphics that need transparency and lossless detail, while WebP aims to do both jobs with smaller files.",
          "SVG covers vector artwork, GIF handles simple animation, and PDF keeps pages rather than single pictures. Match the format to the content instead of picking by habit.",
        ],
        list: [
          "Photographs: JPEG or WebP for small, compatible files",
          "Graphics and transparency: PNG or static WebP",
          "Logos that must scale: SVG",
          "Documents and multi-page output: PDF",
        ],
      },
      {
        heading: "Formats Filekind supports",
        paragraphs: [
          "Filekind converts between JPEG, PNG, and static WebP in all six directions, and compresses JPEG or PNG input to a JPEG at or below a chosen size. It also builds PDFs from those images and renders PDF pages back to JPG or PNG.",
          "HEIC, GIF, BMP, TIFF, SVG, and AVIF are not supported by the converter today. HEIC is the single exception elsewhere on the site: Images to PDF opens those photos directly. Processing happens in the browser, so files are never uploaded. The supported set covers the formats most websites and forms ask for by default.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which image format is best?",
        answer:
          "There is no single winner. JPEG fits photographs, PNG fits transparency and sharp detail, and WebP offers a modern balance with broad but not universal support.",
      },
      {
        question: "Does the format change image quality?",
        answer:
          "It can. Lossless formats preserve pixels exactly, while lossy ones discard detail to save space, so the same picture can look different depending on the encoding used.",
      },
      {
        question: "Which formats does Filekind convert?",
        answer:
          "JPEG, PNG, and static WebP, in every combination. Animated WebP and formats such as GIF, BMP, TIFF, SVG, and AVIF are outside the supported set today, and HEIC photos are opened by Images to PDF rather than by the converter.",
      },
    ],
  },
  {
    slug: "upload-limit",
    term: "Upload limit",
    title: "Upload limit",
    metaTitle: "Upload Limits: Why Websites Reject Files",
    description:
      "An upload limit is the ceiling a website puts on file size or type. Learn why the limits exist, how to check yours, and how to get under one.",
    definition:
      "An upload limit is the maximum file size, dimension count, or format a website or form accepts before it refuses a file as too large or unsupported.",
    summary:
      "An upload limit is the ceiling a site puts on the files it will accept. Exceed it and the upload fails, usually with a message that names a size or a type.",
    updated: "2026-09-24",
    keywords: [
      "upload limit",
      "what is upload limit",
      "upload limit explained",
      "upload limit and file size",
      "upload limit for images",
      "upload limit in kb",
      "upload limit and compression",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/file-size", label: "File size" },
      { href: "/glossary/megabyte", label: "Megabyte (MB)" },
      { href: "/guides/how-to-upload-large-photos-to-a-website", label: "Upload large photos to a website" },
      { href: "/guides/compress-image-for-government-form", label: "Compress an image for a government form" },
      { href: "/guides/how-to-reduce-image-size-in-kb", label: "Reduce image size in KB" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "Why limits exist",
        paragraphs: [
          "Every upload consumes storage and processing time on the receiving system. Limits keep those costs bounded and protect the service from files that would be slow to handle or risky to store.",
          "Forms also restrict dimensions and formats, not just weight. A portrait capped at 100 KB will still fail if the format is unsupported or the pixel count is far beyond what the system expects.",
        ],
      },
      {
        heading: "Common limits you will meet",
        paragraphs: [
          "Government forms and job portals often cap portraits in the low hundreds of kilobytes. Email systems commonly allow a few megabytes, while social platforms accept larger files but resize them on arrival.",
          "Filekind publishes its own ceilings so nothing fails unexpectedly: images up to 25 MB, 16,000 pixels per side, and 48 megapixels, and PDFs up to 50 MB or 100 pages.",
        ],
        list: [
          "Check the stated KB or MB ceiling first",
          "Confirm the accepted formats",
          "Watch pixel dimensions as well as weight",
          "Leave a margin below the limit for safety",
        ],
      },
      {
        heading: "Getting a file under the limit",
        paragraphs: [
          "Two levers do the work. Reduce dimensions if the image is displayed small, then compress until the file clears the ceiling with room to spare.",
          "Filekind compresses JPEG and PNG to a size at or below a target you choose in KB or MB, verifying the result in the browser so the reported size is real before you download.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does a website say my file is too large?",
        answer:
          "It exceeds the ceiling the form enforces, whether that is a byte limit, a pixel limit, or a file type restriction. The message usually names which rule was broken.",
      },
      {
        question: "How do I reduce a file below an upload limit?",
        answer:
          "Compress it to a target just under the ceiling, and lower the pixel dimensions if quality alone cannot get there. Filekind searches for a JPEG at or below the number you enter.",
      },
      {
        question: "What limit does Filekind accept for images?",
        answer:
          "Images up to 25 MB, 16,000 pixels per side, and 48 megapixels. PDFs are accepted up to 50 MB and 100 pages, with up to 150 MB of rendered output.",
      },
    ],
  },
  {
    slug: "compression-ratio",
    term: "Compression ratio",
    title: "Compression ratio",
    metaTitle: "Compression Ratio: Original vs Compressed Size",
    description:
      "Compression ratio compares a file before and after compression. Learn how to calculate it, what counts as good, and how it relates to image quality.",
    definition:
      "Compression ratio is the comparison between an original file size and its compressed size, showing how many times smaller the result is than the input.",
    summary:
      "Compression ratio measures how much smaller a file got: divide the original size by the compressed size. It is a quick way to compare two settings or two formats.",
    updated: "2026-09-24",
    keywords: [
      "compression ratio",
      "what is compression ratio",
      "compression ratio explained",
      "compression ratio calculation",
      "compression ratio and quality",
      "compression ratio in images",
      "compression ratio examples",
    ],
    tool: { href: "/compress-image", label: "Compress image" },
    related: [
      { href: "/glossary/image-compression", label: "Image compression" },
      { href: "/glossary/file-size", label: "File size" },
      { href: "/glossary/lossy-compression", label: "Lossy compression" },
      { href: "/glossary/lossless-compression", label: "Lossless compression" },
      { href: "/guides/how-to-reduce-image-size-in-kb", label: "Reduce image size in KB" },
      { href: "/compress-image", label: "Compress image" },
    ],
    sections: [
      {
        heading: "Calculating compression ratio",
        paragraphs: [
          "Divide the starting size by the ending size. A 4 MB photo that becomes 500 KB compresses to roughly one eighth of its original weight, so the ratio is about 8 to 1.",
          "The inverse also helps. Multiply the compressed size by the ratio to recover the original, which is useful when only the smaller number is recorded somewhere.",
        ],
      },
      {
        heading: "What makes a strong ratio",
        paragraphs: [
          "Ratios depend on the content. Highly redundant data, such as flat graphics or text, compresses dramatically, while noisy photographs offer less for the algorithm to exploit.",
          "A dramatic ratio is not automatically good. Aggressive lossy settings can reach impressive numbers by destroying detail, so ratio and visual quality have to be read together.",
        ],
        list: [
          "Ratio equals original size divided by compressed size",
          "Simple content compresses further than detailed content",
          "Lossless methods reach modest ratios without any quality change",
          "Lossy methods go further at a visible cost",
        ],
      },
      {
        heading: "Compression ratio in practice",
        paragraphs: [
          "When a target size is set rather than a ratio, the question flips: what is the smallest file that still looks right? That framing suits forms and upload limits, where the ceiling is fixed.",
          "Filekind works this way. It compresses JPEG and PNG input to a JPEG at or below the KB or MB figure you choose, and reports the final size and dimensions so you can judge the outcome.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a higher compression ratio always better?",
        answer:
          "No. It means more data was removed, and with lossy compression that can mean visible damage. Judge the ratio alongside how the image actually looks.",
      },
      {
        question: "What is a good compression ratio for photos?",
        answer:
          "It depends on the picture and the quality you need. The practical target is reaching the size you must fit while the image still looks acceptable where it will be shown.",
      },
      {
        question: "How do I see the ratio of my compressed image?",
        answer:
          "Compare the two file sizes and divide the original by the result. Filekind displays the final size next to your starting point, so the comparison is immediate.",
      },
    ],
  },
];
