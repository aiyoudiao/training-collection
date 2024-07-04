// src/hooks/useProduct.ts
import { useEffect } from 'react';
import { $query } from '../../redux';
import { getProducts } from '../api';
import useSWR from 'swr';

// 自定义 Hook，用于获取产品数据
export const useProduct = () => {
  // 从 Redux 状态中获取 sizes 和 sort 的值
  const sizes = $query('product.sizes');
  const sort = $query('product.sort');

  // 使用 SWR 的 useSWR 钩子来获取产品数据
  const { data, error, isLoading, mutate } = useSWR(
    ['products', sizes, sort],
    async () => {
      try {
        const response = await getProducts({ sizes }, { sort });
        return response;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    {
      dedupingInterval: 5000, // 数据在 5000 毫秒内被认为是新鲜的，不会触发重新请求
      revalidateOnFocus: false, // 禁止自动重新验证
      shouldRetryOnError: false, // 禁止自动重试
    }
  );

  // 使用 useEffect 钩子来处理数据的初始化加载
  // useEffect(() => {
  //   // 在这里可以进行数据的初始化加载或其他副作用操作
  //   // 例如，获取后端数据之后，更新 Redux 状态等操作
  //   mutate();
  // }, []);

  return { data, error, refetch: mutate, isLoading };
};
