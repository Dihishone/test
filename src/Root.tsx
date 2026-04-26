import { Composition } from "remotion";
import { MyComposition } from "./MyComposition";
import { GusshausExplainer } from "./gusshaus/GusshausExplainer";
import { DURATION, FPS } from "./gusshaus/timing";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyComposition"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GusshausExplainer"
        component={GusshausExplainer}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
