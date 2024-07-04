// src/store/index.ts
import { ActionCreatorWithPayload, configureStore } from '@reduxjs/toolkit';
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

import type { RootState, AppDispatch } from './store';

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
// 可执行 slice 中的action
export const $exec = (action: any) => {
  return store.dispatch(action);
};
// 使用 Redux 的 selector 钩子
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// 可查询 selector 或者 自定义的selector中的值，使用 对象. 的方式就能直接获取值
export const $query = (selector: string | any) => {
  if (typeof selector !== 'string') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAppSelector(selector);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useAppSelector((state) => state);
  try {
    if (selector.indexOf('.') > -1) {
      const selectors = selector.split('.');
      let result = state;
      for (let i = 0; i < selectors.length; i++) {
        result = result[selectors[i]];
      }
      return result;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return state[selector];
};
