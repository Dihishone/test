import { staticFile } from "remotion";

export const fontFamily = "Cormorant Garamond, Georgia, serif";

// Inject @font-face rules pointing to local TTF files.
// No delayRender needed — local static files load before first frame.
const style = document.createElement("style");
style.textContent = `
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url('${staticFile("fonts/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf")}') format('truetype');
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: normal;
    font-weight: 500;
    font-display: block;
    src: url('${staticFile("fonts/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06GnM.ttf")}') format('truetype');
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: normal;
    font-weight: 700;
    font-display: block;
    src: url('${staticFile("fonts/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_hg9GnM.ttf")}') format('truetype');
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: italic;
    font-weight: 400;
    font-display: block;
    src: url('${staticFile("fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf")}') format('truetype');
  }
`;

if (!document.getElementById("gusshaus-fonts")) {
  style.id = "gusshaus-fonts";
  document.head.appendChild(style);
}
