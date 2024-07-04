import Big from 'big.js';

// 设置全局配置
Big.DP = 20; // 小数点后保留 20 位，控制计算结果的精度
Big.RM = 1; // 设置舍入模式，0 (向下舍入), 1 (向上舍入), 2 (向最近的整数舍入，四舍五入), 3 (向零舍入)。

/**
 * BigMath 类封装了一系列基于 big.js 的数学运算方法
 *
 * 优势：
 * - 高精度：解决了 JavaScript 原生浮点运算精度问题
 * - 简单易用：封装常用数学运算，接口友好
 *
 * 劣势：
 * - 性能：由于使用高精度运算，性能较低
 * - 依赖：需要额外引入 big.js 库
 */
export class BigMath {
  /**
   * 格式化结果为指定的小数位数
   * @param value - 输入值
   * @param dp - 小数位数，默认两位
   * @returns 格式化后的字符串
   */
  private static format(value: Big, dp = 2): string {
    return value.toFixed(dp);
  }

  /**
   * 加法运算
   * @param a - 被加数
   * @param b - 加数
   * @param dp - 小数位数，默认两位
   * @returns 运算结果
   */
  static add(a: string | number, b: string | number, dp = 2): string {
    const result = new Big(a).plus(new Big(b));
    return this.format(result, dp);
  }

  /**
   * 减法运算
   * @param a - 被减数
   * @param b - 减数
   * @param dp - 小数位数，默认两位
   * @returns 运算结果
   */
  static subtract(a: string | number, b: string | number, dp = 2): string {
    const result = new Big(a).minus(new Big(b));
    return this.format(result, dp);
  }

  /**
   * 乘法运算
   * @param a - 被乘数
   * @param b - 乘数
   * @param dp - 小数位数，默认两位
   * @returns 运算结果
   */
  static multiply(a: string | number, b: string | number, dp = 2): string {
    const result = new Big(a).times(new Big(b));
    return this.format(result, dp);
  }

  /**
   * 除法运算
   * @param a - 被除数
   * @param b - 除数
   * @param dp - 小数位数，默认两位
   * @returns 运算结果
   */
  static divide(a: string | number, b: string | number, dp = 2): string {
    const result = new Big(a).div(new Big(b));
    return this.format(result, dp);
  }

  /**
   * 幂运算
   * @param base - 底数
   * @param exponent - 指数
   * @param dp - 小数位数，默认两位
   * @returns 运算结果
   */
  static pow(base: string | number, exponent: number, dp = 2): string {
    const result = new Big(base).pow(exponent);
    return this.format(result, dp);
  }

  /**
   * 比较运算
   * @param a - 第一个数
   * @param b - 第二个数
   * @returns 比较结果，-1表示a<b，0表示a=b，1表示a>b
   */
  static compare(a: string | number, b: string | number): number {
    return new Big(a).cmp(new Big(b));
  }

  /**
   * 平方根运算
   * @param value - 要开平方的数
   * @param dp - 小数位数，默认两位
   * @returns 运算结果
   */
  static sqrt(value: string | number, dp = 2): string {
    const result = new Big(value).sqrt();
    return this.format(result, dp);
  }
}
