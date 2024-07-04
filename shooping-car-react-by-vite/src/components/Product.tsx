import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Segmented,
  SegmentedProps,
  Skeleton,
  message,
  Image,
} from 'antd';
import { FC, RefAttributes, useState } from 'react';

import { ProductDTO } from '../shared/interface';
import { $exec } from '../redux';
import { addProduct } from '../redux/slice/cartSlice';
import { BigMath } from '../shared/utils';

interface ProductProps {
  data: ProductDTO;
}

export interface ProductImageProps {
  sku: number | string;
}

const ProductImage: FC<ProductImageProps> = ({ sku }) => {
  const image1 = `./static/products/${sku}-1-product.webp`;
  const image2 = `./static/products/${sku}-2-product.webp`;

  return (
    <div className="!w-full !h-full max-h-60 rounded-t-lg overflow-hidden">
      <Image.PreviewGroup items={[image1, image2]}>
        <Image src={image1} />
      </Image.PreviewGroup>
    </div>
  );
};

export const ProductLoading = () => {
  return (
    <Card
      data-test-id="loading-card"
      cover={
        <Skeleton.Image
          active
          className="!w-full min-h-72 rounded-t-lg"
        />
      }
    >
      <Skeleton active />
    </Card>
  );
};

export const LightSegmented = (
  prpos: JSX.IntrinsicAttributes &
    SegmentedProps &
    RefAttributes<HTMLLegendElement | HTMLAnchorElement>
) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemActiveBg: 'rgb(30 64 175)', // 激活状态背景色
            itemColor: '#1890ff', // 文字颜色
            itemHoverBg: 'rgb(37 99 235)', // 悬停状态背景色
            itemHoverColor: '#1890ff', // 悬停状态文字颜色
            itemSelectedBg: 'rgb(29 78 216)', // 选中状态背景色
            itemSelectedColor: '#fff', // 选中状态文字颜色
            trackBg: '#000', // 背景轨道颜色
            trackPadding: '0', // 轨道内边距
          },
        },
      }}
    >
      <Segmented {...prpos}></Segmented>
    </ConfigProvider>
  );
};

export const Product: FC<ProductProps> = (props) => {
  const [currentSize, setSize] = useState(props.data.availableSizes[0]);

  const { data } = props;

  const [integer, fractional] = String(data.price.toFixed(2)).split('.');

  return (
    <Card
      className="relative transition-all transform hover:scale-105 cursor-pointer"
      cover={
        data.isFreeShipping ? (
          <Badge.Ribbon
            placement="end"
            text="包邮"
            data-test-id="free-shipping"
          >
            <ProductImage sku={data.sku}></ProductImage>
          </Badge.Ribbon>
        ) : (
          <ProductImage sku={data.sku}></ProductImage>
        )
      }
    >
      <div className="flex flex-col items-center">
        {data.availableSizes.length > 0 && (
          <div className="flex justify-end w-full -mr-12">
            <LightSegmented
              className="-mt-6 mb-3"
              block
              size="small"
              options={data.availableSizes.map((size) => {
                return {
                  label: (
                    <div
                      className={`flex items-center justify-center w-5 h-7 rounded-full m-0.5 text-white text-xs`}
                    >
                      {size} 码
                    </div>
                  ),
                  value: size,
                };
              })}
              value={currentSize}
              onChange={(value) => {
                setSize(value);
              }}
            />
          </div>
        )}
        <p
          className="min-h-14 text-lg font-semibold line-clamp-2"
          title={data.title}
        >
          {data.title}
        </p>
        <p className="mb-1">
          <span className="text-2xl">{data.currencyFormat}</span>
          <span className="text-2xl font-bold">{integer}</span>
          <span className="text-xl">.{fractional}</span>
        </p>
        {data.installments > 0 ? (
          <p data-test-id="installments" className="text-gray-500 text-sm">
            或分{' '}
            <span className="font-bold text-orange-500">
              {data.installments}
            </span>{' '}
            期，每期
            <span className="font-bold text-green-500">
              {' '}
              ${BigMath.divide(data.price, data.installments)}
            </span>
          </p>
        ) : (
          <div className="text-sm text-gray-500">暂不支持分期</div>
        )}
        <Button
          data-test-id="add-product"
          className="mt-2"
          type="primary"
          block
          onClick={() => {
            $exec(addProduct({ product: data, size: currentSize }));
            message.success({
              content: `客官，您已成功将 ${data.title} - [${currentSize}] 添加到购物车中。`,
              maxCount: 2,
              duration: 1,
            });
          }}
        >
          添加到购物车
        </Button>
      </div>
    </Card>
  );
};
