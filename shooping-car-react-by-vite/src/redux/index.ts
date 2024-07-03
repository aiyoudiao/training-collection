// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slice/cartSlice';
import productReducer from './slice/productSlice';

// 合并所有 slice 的 reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

// 配置持久化
const persistConfig = {
  key: 'root',
  storage,
};

// 创建持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 配置 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 创建持久化的 store
export const persistor = persistStore(store);

// 导出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 使用 Redux 的 dispatch 钩子
export const useAppDispatch = () => useDispatch<AppDispatch>();
// 使用 Redux 的 selector 钩子
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import type { RootState, AppDispatch } from './store';
