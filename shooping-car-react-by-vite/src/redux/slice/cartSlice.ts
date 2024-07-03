// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../shared/interface';

// 定义购物车中商品的接口
export interface ProductInCart {
  [sku: string]: {
    [size: string]: {
      product: ProductDTO;
      size: string;
      amount: number;
    };
  };
}

// 定义购物车状态的接口
interface CartState {
  show: boolean; // 购物车是否显示
  subtotal: number; // 小计金额
  products: ProductInCart; // 购物车中的商品
}

// 初始化购物车状态
const initialState: CartState = {
  show: false,
  subtotal: 0,
  products: {},
};

// 创建购物车的 slice
const cartSlice = createSlice({
  name: 'cart', // slice 名称
  initialState, // 初始状态
  reducers: {
    // 显示/隐藏购物车
    showCart(state, action: PayloadAction<boolean>) {
      debugger;
      state.show = action.payload;
    },
    // 添加商品到购物车
    addProduct(
      state,
      action: PayloadAction<{
        product: ProductDTO;
        size: string;
        amount?: number;
      }>
    ) {
      debugger;
      const { product, size, amount = 1 } = action.payload;
      const productInCart = state.products[product.sku]?.[size];

      if (productInCart) {
        productInCart.amount += amount;
      } else {
        state.products[product.sku] = {
          ...state.products[product.sku],
          [size]: {
            product,
            size,
            amount,
          },
        };
      }
    },
    // 改变购物车中商品的数量
    changeProductAmount(
      state,
      action: PayloadAction<{ sku: string; size: string; amount: number }>
    ) {
      const { sku, size, amount } = action.payload;
      if (state.products[sku]?.[size]) {
        state.products[sku][size].amount = amount;
      }
    },
    // 增加购物车中商品的数量
    increase(
      state,
      action: PayloadAction<{ sku: string; size: string; amount?: number }>
    ) {
      const { sku, size, amount = 1 } = action.payload;
      if (state.products[sku]?.[size]) {
        state.products[sku][size].amount += amount;
      }
    },
    // 减少购物车中商品的数量
    decrease(
      state,
      action: PayloadAction<{ sku: string; size: string; amount?: number }>
    ) {
      const { sku, size, amount = 1 } = action.payload;
      if (state.products[sku]?.[size]) {
        const newAmount = Math.max(
          0,
          state.products[sku][size].amount - amount
        );
        if (newAmount > 0) {
          state.products[sku][size].amount = newAmount;
        } else {
          delete state.products[sku][size];
        }
      }
    },
    // 从购物车中移除商品
    removeProduct(state, action: PayloadAction<{ sku: string; size: string }>) {
      const { sku, size } = action.payload;
      if (state.products[sku]?.[size]) {
        delete state.products[sku][size];
      }
    },
    // 清空购物车
    clearCart(state) {
      state.products = {};
    },
  },
});

// 导出购物车的 actions
export const {
  showCart,
  addProduct,
  changeProductAmount,
  increase,
  decrease,
  removeProduct,
  clearCart,
} = cartSlice.actions;

// 导出购物车的 reducer
export default cartSlice.reducer;
