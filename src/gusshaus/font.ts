import { continueRender, delayRender, staticFile } from "remotion";

export const fontFamily = "Cormorant Garamond, Georgia, serif";

// Load font from local static files — no network required
const handle = delayRender("Loading Cormorant Garamond font");

const style = document.createElement("style");
style.textContent = `
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: normal;
    font-weight: 400;
    src: url('${staticFile("fonts/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf")}') format('truetype');
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: normal;
    font-weight: 500;
    src: url('${staticFile("fonts/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06GnM.ttf")}') format('truetype');
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: normal;
    font-weight: 700;
    src: url('${staticFile("fonts/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_hg9GnM.ttf")}') format('truetype');
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    font-style: italic;
    font-weight: 400;
    src: url('${staticFile("fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf")}') format('truetype');
  }
`;
document.head.appendChild(style);

document.fonts.ready.then(() => {
  continueRender(handle);
});
