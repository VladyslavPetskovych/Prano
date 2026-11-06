// Фірмова кнопка сайту (як «ДІЗНАТИСЯ БІЛЬШЕ» на головній): рамка, без заокруглень, Tinos, великі літери.
const BASE =
  "inline-block border px-6 py-2 font-tinos text-lg font-medium uppercase transition duration-300";

// На темному фоні
export const BUTTON_LIGHT = `${BASE} border-white text-white hover:bg-white hover:text-Ndark`;

// На світлому фоні
export const BUTTON_DARK = `${BASE} border-Ndark text-Ndark hover:bg-Ndark hover:text-white`;
