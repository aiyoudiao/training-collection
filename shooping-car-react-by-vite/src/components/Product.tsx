import { App, Button, Card, Skeleton } from "antd";
import { FC, useState } from "react";

import { ProductDTO } from "../shared/interface";
import { useAppDispatch, useAppSelector }from "../redux";
import { addProduct } from '../redux/slice/cartSlice'

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
    <div
      className="relative pt-[145.45%] rounded-t-lg"
      style={{ backgroundImage: `url(${image1})` }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundImage = `url(${image2})`)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = `url(${image1})`)}
    ></div>
  );
};

const LoadingImage = () => (
  <Skeleton.Image className="!w-full min-h-64 !h-full rounded-t-lg" />
);

const FreeShipping = () => (
  <div className="absolute top-0 right-0 p-1 text-white bg-black rounded-tr-lg text-xs">
    包邮
  </div>
);

const Sizes = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute bottom-2 left-2 flex">{children}</div>
);

const Size = ({ active, onClick, children }: { active?: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button
    className={`flex items-center justify-center w-7 h-7 rounded-full m-0.5 text-white text-xs ${
      active ? "bg-blue-600" : "bg-black"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const ProductLoading = () => {
  return (
    <Card data-testid="loading-card" cover={<LoadingImage />}>
      <Skeleton active />
    </Card>
  );
};

export const Product: FC<ProductProps> = (props) => {
  const { message } = App.useApp();
  const [currentSize, setSize] = useState(props.data.availableSizes[0]);
  const dispatch = useAppDispatch();

  const { data } = props;

  const [integer, fractional] = String(data.price.toFixed(2)).split(".");

  return (
    <Card
      className="relative"
      cover={
        <ProductImage sku={data.sku}>
          {data.isFreeShipping && (
            <FreeShipping data-testid="freeshipping" />
          )}
          {data.availableSizes.length > 0 && (
            <Sizes>
              {data.availableSizes.map((size) => (
                <Size
                  key={size}
                  active={currentSize === size}
                  onClick={() => {
                    setSize(size);
                  }}
                >
                  {size}
                </Size>
              ))}
            </Sizes>
          )}
        </ProductImage>
      }
    >
      <div className="flex flex-col items-center">
        <p className="h-12 overflow-hidden">{data.title}</p>
        <p>
          <span className="text-xs">{data.currencyFormat}</span>
          <span className="text-2xl font-bold">{integer}</span>
          <span className="text-base">.{fractional}</span>
        </p>
        {data.installments > 0 ? (
          <p data-testid="installments" className="text-gray-500 text-sm">
            或分 {data.installments} 期，每期
            <span className="font-bold">
              ${(data.price / data.installments).toFixed(2)}
            </span>
          </p>
        ) : (
          <div className="text-sm whitespace-pre"> </div>
        )}
        <Button
          data-testid="add-product"
          className="mt-2"
          type="primary"
          ghost
          block
          onClick={() => {
            debugger

            dispatch(addProduct({ product: data, size: currentSize}));
            message.success(`「${data.title} - ${currentSize}」已添加到购物车`);
          }}
        >
          添加到购物车
        </Button>
      </div>
    </Card>
  );
};
