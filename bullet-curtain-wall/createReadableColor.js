/**
 * 将十六进制颜色转换为 RGB 数值
 * @param {string} hex - 十六进制颜色
 * @returns {number[]} RGB 数值
 */
function hexToRgb(hex) {
  let bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

/**
 * 将 RGB 数值转换为十六进制颜色
 * @param {number[]} rgb - RGB 数值
 * @returns {string} 十六进制颜色
 */
function rgbToHex(rgb) {
  return "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
}

/**
 * 计算颜色的相对亮度
 * @param {number} r - 红色分量
 * @param {number} g - 绿色分量
 * @param {number} b - 蓝色分量
 * @returns {number} 相对亮度
 */
function luminance(r, g, b) {
  let a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * 计算两个颜色的对比度
 * @param {number[]} rgb1 - 第一个颜色的 RGB 数值
 * @param {number[]} rgb2 - 第二个颜色的 RGB 数值
 * @returns {number} 对比度
 */
function contrast(rgb1, rgb2) {
  let lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05;
  let lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05;
  return lum1 / lum2 > 1 ? lum1 / lum2 : lum2 / lum1;
}

/**
 * 生成随机颜色
 * @returns {string} 随机生成的十六进制颜色
 */
function randomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215) // 最大的16进制数
      .toString(16)
      .padStart(6, "0")
  );
}

/**
 * 生成一个与背景色有足够对比度的随机前景色
 * @param {string} bgColor - 背景颜色的十六进制值 (例如：#ffffff)
 * @returns {string} 随机生成的前景颜色的十六进制值
 */
function generateReadableColor(bgColor) {
  let bgRgb = hexToRgb(bgColor);
  let newColor, newRgb, contrastRatio;

  do {
    newColor = randomColor();
    newRgb = hexToRgb(newColor);
    contrastRatio = contrast(bgRgb, newRgb);
  } while (contrastRatio < 4.5);

  return newColor;
}
