import { describe, it, expect } from 'vitest';
import { BigMath } from './big-math';

describe('BigMath', () => {
  it('add', () => {
    expect(BigMath.add('0.1', '0.2')).toBe('0.30');
    expect(BigMath.add('0.1', '0.2', 3)).toBe('0.300');
    expect(BigMath.add('12345678901234567890', '98765432109876543210')).toBe(
      '111111111011111111100.00'
    );
  });

  it('subtract', () => {
    expect(BigMath.subtract('0.3', '0.1')).toBe('0.20');
    expect(BigMath.subtract('0.3', '0.1', 3)).toBe('0.200');
    expect(
      BigMath.subtract('98765432109876543210', '12345678901234567890')
    ).toBe('86419753208641975320.00');
  });

  it('multiply', () => {
    expect(BigMath.multiply('0.1', '0.2')).toBe('0.02');
    expect(BigMath.multiply('0.1', '0.2', 3)).toBe('0.020');
    expect(
      BigMath.multiply('12345678901234567890', '98765432109876543210')
    ).toBe('1219326311370217952237463801111263526900.00');
  });

  it('divide', () => {
    expect(BigMath.divide('0.3', '0.1')).toBe('3.00');
    expect(BigMath.divide('0.3', '0.1', 3)).toBe('3.000');
    expect(BigMath.divide('98765432109876543210', '12345678901234567890')).toBe(
      '8.00'
    );
  });

  it('pow', () => {
    expect(BigMath.pow('2', 3)).toBe('8.00');
    expect(BigMath.pow('2', 3, 3)).toBe('8.000');
    expect(BigMath.pow('12345678901234567890', 2)).toBe(
      '152415787532388367501905199875019052100.00'
    );
  });

  it('compare', () => {
    expect(BigMath.compare('0.1', '0.2')).toBe(-1);
    expect(BigMath.compare('0.2', '0.1')).toBe(1);
    expect(BigMath.compare('0.1', '0.1')).toBe(0);
  });

  it('sqrt', () => {
    expect(BigMath.sqrt('4')).toBe('2.00');
    expect(BigMath.sqrt('4', 3)).toBe('2.000');
    expect(BigMath.sqrt('12345678901234567890')).toBe('3513641828.82');
  });
});
