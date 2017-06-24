//export namespace ColorCompare {
const tinyColor = require('tinycolor2');
const deltaE = require('deltae')

export function rgbaToHex(colorComps) {
 const r = colorComps[0];
 const g = colorComps[1];
 const b = colorComps[2];
 const a = colorComps[3];
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function isMatchingColor(color1, color2) {
  return new Promise((resolve, reject) => {
    const hexColor1 = rgbaToHex(color1);
    const hexColor2 = rgbaToHex(color2);
    deltaE.delta(hexColor1, hexColor2, (delta) => {
      resolve((delta <= 10)? 1 : 0)
    })
  });
}

export function isGradientColor(color1, color2) {
  const r = color1[0] - color2[0];
  const g = color1[1] - color2[1];
  const b = color1[2] - color2[2];

  return ((r * r + g * g + b * b) <= 75) ? 1 : 0;
}

export function isOvelappingColor(parentColor, color) {
  return false;
}

function getTinyColor(clrComp) {
  return tinyColor({ r: clrComp[0], g: clrComp[1], b: clrComp[2], a: clrComp[3] })
}

//}

