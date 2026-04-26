export const FPS = 24;
export const DURATION = 60 * FPS; // 1440 frames

// Beat boundaries (frames)
export const B1_START = 0;
export const B1_END = 5 * FPS;    // 120

export const B2_START = B1_END;
export const B2_END = 13 * FPS;   // 312

export const B3_START = B2_END;
export const B3_END = 19 * FPS;   // 456

export const B4_START = B3_END;
export const B4_END = 25 * FPS;   // 600

export const B5_START = B4_END;
export const B5_END = 33 * FPS;   // 792

export const B6_START = B5_END;
export const B6_END = 42 * FPS;   // 1008

export const B7_START = B6_END;
export const B7_END = 49 * FPS;   // 1176

export const B8_START = B7_END;
export const B8_END = DURATION;   // 1440

// Beat durations
export const B1_DUR = B1_END - B1_START;     // 120
export const B2_DUR = B2_END - B2_START;     // 192
export const B3_DUR = B3_END - B3_START;     // 144
export const B4_DUR = B4_END - B4_START;     // 144
export const B5_DUR = B5_END - B5_START;     // 192
export const B6_DUR = B6_END - B6_START;     // 216
export const B7_DUR = B7_END - B7_START;     // 168
export const B8_DUR = B8_END - B8_START;     // 264

// Easing constants
export const FADE_DURATION = Math.round(0.4 * FPS);
export const SLOW_FADE = Math.round(1.5 * FPS);
export const TEXT_FADE = Math.round(0.3 * FPS);
