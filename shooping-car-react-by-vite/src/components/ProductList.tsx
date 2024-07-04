import { Button, Col, Empty, Row, Pagination } from 'antd';
import { FC } from 'react';
import { useProduct } from '../shared/hooks/useProduct';
import { Product, ProductLoading } from './Product';
import type { PaginationProps } from 'antd';

export const ProductList: FC = () => {
  const { data, isLoading, error, refetch } = useProduct();

  const total = data?.length ?? 0;

  if (isLoading) {
    return (
      <>
        <div className="my-2 font-bold text-lg">商品正在加载中...</div>
        <Row gutter={[16, 16]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Col key={i} xs={12} sm={8} md={6}>
              <ProductLoading />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-6">
        <Empty description="获取商品列表失败，请刷新重试" />
        <Button
          className="mt-4"
          type="primary"
          onClick={() => {
            refetch();
          }}
        >
          重试
        </Button>
      </div>
    );
  }

  const onChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
  };

  return (
    <>
      <div className="my-2 font-bold text-lg">共找到 {total} 个商品</div>
      <Row gutter={[16, 16]}>
        {data?.map((item) => (
          <Col key={item.id} xs={12} sm={8} md={6}>
            <Product data={item} />
          </Col>
        ))}
        <Pagination
          total={data?.length || 0}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage
          onChange={onChange}
        />
      </Row>
    </>
  );
};
