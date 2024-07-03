// src/hooks/useProduct.ts
import { useAppSelector } from '../../redux';
import { getProducts } from '../api';
import useSWR from 'swr';

// 自定义 Hook，用于获取产品数据
export const useProduct = () => {
  // 从 Redux 状态中获取 sizes 和 sort 的值
  const sizes = useAppSelector((state) => state.product.sizes);
  const sort = useAppSelector((state) => state.product.sort);

  // 定义 fetcher 函数，调用 productService 的 getProducts 方法
  const fetcher = async () => await getProducts({ sizes }, { sort });

  // 使用 SWR 的 useSWR 钩子来获取产品数据
  const { data, error } = useSWR(['products', sizes, sort], fetcher, {
    dedupingInterval: 5000, // 数据在 5000 毫秒内被认为是新鲜的，不会触发重新请求
    revalidateOnFocus: false, // 禁止自动重新验证
    shouldRetryOnError: false, // 禁止自动重试
  });

  return { data, error };
};
