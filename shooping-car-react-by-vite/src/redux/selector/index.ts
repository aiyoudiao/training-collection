// 选择器
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

// 选择购物车中总的商品数量
export const totalProductsSelector = createSelector(
  (state: RootState) => state?.cart?.products,
  (products = {}) => {
    return Object.values(products).reduce(
      (acc, cur) =>
        acc + Object.values(cur).reduce((acc, cur) => acc + cur.amount, 0),
      0
    );
  }
);

// 选择购物车中的小计金额
export const subtotalSelector = createSelector(
  (state: RootState) => state?.cart?.products,
  (products = {}) =>
    Object.values(products)?.reduce(
      (acc, cur) =>
        acc +
        Object.values(cur).reduce(
          (acc, cur) => acc + cur.product.price * cur.amount,
          0
        ),
      0
    )
);

// 选择最大分期数
export const maxInstallmentsSelector = createSelector(
  (state: RootState) => state?.cart?.products,
  (products = {}) =>
    Math.max(
      ...Object.values(products).flatMap((item) =>
        Object.values(item).map(
          (innerItem) => innerItem.product.installments ?? 0
        )
      )
    )
);
