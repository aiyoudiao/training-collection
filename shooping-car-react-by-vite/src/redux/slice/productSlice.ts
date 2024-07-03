// src/store/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../shared/interface';
import { Sort } from '../../shared/api';

// 定义商品状态的接口
interface ProductState {
  sizes: string[]; // 可用尺寸
  sort: Array<Sort<ProductDTO>>; // 排序方式
}

// 初始化商品状态
const initialState: ProductState = {
  sizes: [],
  sort: [{ property: 'price', order: 'desc' }],
};

// 创建商品的 slice
const productSlice = createSlice({
  name: 'product', // slice 名称
  initialState, // 初始状态
  reducers: {
    // 改变可用尺寸
    changeSizes(state, action: PayloadAction<string[]>) {
      state.sizes = action.payload;
    },
    // 改变排序方式
    changeSort(state, action: PayloadAction<Array<Sort<ProductDTO>>>) {
      state.sort = action.payload;
    },
  },
});

// 导出商品的 actions
export const { changeSizes, changeSort } = productSlice.actions;

// 导出商品的 reducer
export default productSlice.reducer;
