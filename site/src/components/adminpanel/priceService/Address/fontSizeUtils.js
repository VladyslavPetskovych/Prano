// Рівні розміру назви (1 — найменший, 5 — найбільший) → піксельний розмір.
export const FONT_SIZE_LEVELS = {
  1: 12,
  2: 14,
  3: 16,
  4: 18,
  5: 20,
};

export const DEFAULT_FONT_SIZE = FONT_SIZE_LEVELS[3];

// px → рівень (1..5), з прив'язкою до найближчого рівня.
export const pxToLevel = (px) => {
  const value = Number(px) || DEFAULT_FONT_SIZE;
  let closest = 3;
  let minDiff = Infinity;
  Object.entries(FONT_SIZE_LEVELS).forEach(([level, size]) => {
    const diff = Math.abs(size - value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = Number(level);
    }
  });
  return closest;
};

// рівень (1..5) → px.
export const levelToPx = (level) =>
  FONT_SIZE_LEVELS[Number(level)] || DEFAULT_FONT_SIZE;
