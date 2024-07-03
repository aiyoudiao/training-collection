import { ProductDTO } from '../interface';
import { randomRange } from '../utils';

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page?: number;
  limit?: number;
  sort?: Array<Sort<T>>;
}

export interface ProductQuery {
  sizes?: string[];
}

export type ProductFilter = ProductQuery & PageRequest<ProductDTO>;

/**
 * 获取产品数据
 * @param query - 产品查询参数
 * @param pageable - 分页请求参数
 * @returns 返回产品数据的 Promise
 */
export const getProducts = async (
  query?: ProductQuery,
  pageable?: PageRequest<ProductDTO>
): Promise<ProductDTO[]> => {
  const url = `http://127.0.0.1:4523/m1/4719799-0-default/api/v1/products`;

  try {
    // 构建查询字符串
    const params = new URLSearchParams();

    if (query?.sizes) {
      query.sizes.forEach((size) => params.append('sizes', size));
    }
    if (pageable?.sort) {
      pageable.sort.forEach((sort) => {
        params.append('sort', `${sort.property},${sort.order}`);
      });
    }

    // 发送 Fetch 请求
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let products: ProductDTO[] = data.data.products || [];

    // 过滤产品数据
    if (query?.sizes?.length) {
      products = products.filter((product) =>
        product.availableSizes.some((size) => query.sizes?.includes(size))
      );
    }

    // 排序产品数据
    if (pageable?.sort) {
      pageable.sort.forEach((sort) => {
        products.sort((a, b) => {
          const result = a[sort.property] >= b[sort.property] ? 1 : -1;
          return result * (sort.order === 'asc' ? 1 : -1);
        });
      });
    }

    // 模拟延迟和错误
    return new Promise<ProductDTO[]>((resolve, reject) => {
      setTimeout(() => {
        // 随机模拟错误
        if (Math.random() > 0.5) {
          reject(new Error('未知错误'));
        } else {
          resolve(products);
        }
      }, randomRange(1000, 2000));
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];
  }
};
