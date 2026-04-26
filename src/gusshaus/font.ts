import { loadFont } from "@remotion/google-fonts/CormorantGaramond";

const { fontFamily, waitUntilDone } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export { fontFamily, waitUntilDone };
