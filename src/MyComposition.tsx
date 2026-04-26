import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const currentSecond = Math.floor(frame / fps);
  const totalSeconds = Math.floor(durationInFrames / fps);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#e94560",
            fontSize: 80,
            margin: 0,
            fontWeight: 900,
          }}
        >
          Remotion Studio
        </h1>
        <p
          style={{
            color: "#a8a8b3",
            fontSize: 36,
            marginTop: 20,
          }}
        >
          Frame {frame} von {durationInFrames} ({currentSecond}s / {totalSeconds}s)
        </p>
      </div>
    </AbsoluteFill>
  );
};
