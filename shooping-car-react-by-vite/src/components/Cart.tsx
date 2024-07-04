import {
  App,
  Button,
  ButtonProps,
  ConfigProvider,
  Empty,
  InputNumber,
  List,
  notification,
} from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { FC, Fragment, RefAttributes } from 'react';
import { ProductDTO } from '../shared/interface';
import {
  maxInstallmentsSelector,
  subtotalSelector,
  totalProductsSelector,
} from '../redux/selector';
import { ProductInCart, showCart } from '../redux/slice/cartSlice';
import { $query, $exec } from '../redux';
import {
  clearCart,
  changeProductAmount,
  removeProduct,
} from '../redux/slice/cartSlice';
import { JSX } from 'react/jsx-runtime';
import { DeleteOutlined } from '@ant-design/icons';
import { BigMath } from '../shared/utils';

interface ProductItemProps {
  product: ProductDTO;
  amount: number;
  size: string;
}

const ProductItem: FC<ProductItemProps> = (props) => {
  const { amount, product, size } = props;

  return (
    <div className="flex items-start py-4">
      <img
        className="w-18 h-28 object-cover rounded-md"
        src={`static/products/${product.sku}-1-product.webp`}
        alt={product.title}
      />
      <div className="ml-4 flex-1">
        <h4 className="text-lg text-gray-800 font-bold mb-1 line-clamp-2" title='product.title'>{product.title}</h4>
        <div className="text-sm text-gray-600  mb-1">
          {size} 码 {product.style && <> | {product.style}</>}
        </div>
        <div className="flex items-baseline">
          <span className="text-xl mr-1">
            {product.currencyFormat}
          </span>
          <span className="text-lg font-bold">{product.price.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="mr-2">数量：</span>
          <InputNumber
            className="w-16"
            value={amount}
            size="small"
            min={1}
            onChange={(value) => {
              if (value !== null) {
                $exec(
                  changeProductAmount({
                    sku: product.sku.toString(),
                    size,
                    amount: value,
                  })
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface ProductListProps {
  value: ProductInCart;
}

const ProductList: FC<ProductListProps> = (props) => {
  const data = Object.entries(props.value);

  return data.length === 0 ? (
    <div className="py-8">
      <Empty description="请添加商品到购物车" />
    </div>
  ) : (
    <List className="bg-white ">
      {data.map(([sku, item]) => (
        <Fragment key={sku}>
          {Object.entries(item).map(([size, item]) => (
            <List.Item
              key={size}
              extra={
                <Button
                  type="text"
                  className="py-6 mt-auto text-2xl mb-2"
                  danger
                  onClick={() => {
                    $exec(removeProduct({ sku, size }));
                  }}
                >
                  <DeleteOutlined />
                </Button>
              }
            >
              <ProductItem
                product={item.product}
                amount={item.amount}
                size={item.size}
              />
            </List.Item>
          ))}
        </Fragment>
      ))}
    </List>
  );
};

interface SubtotalProps {
  value: number;
  installments: number;
  installmentsAmount?: number;
}

const Subtotal: FC<SubtotalProps> = (props) => {
  if (!props.value) {
    return null;
  }

  let installmentsAmount: string | undefined;

  if (props.installments) {
    installmentsAmount = BigMath.divide(props.value, props.installments);
  }

  return (
    <div className="flex items-center mb-4 flex-wrap">
      <div className="flex-1 text-lg font-semibold">小计：</div>
      <div className="flex-1 text-right text-lg font-bold ">
        ${props.value.toFixed(2)}
      </div>
      {installmentsAmount && (
        <div className="text-right ml-2 text-sm w-full">
          最多可分{' '}
          <span className="font-bold text-orange-500">
            {props.installments}
          </span>{' '}
          期{' '}
          <span className="font-bold text-green-500">
            ${installmentsAmount}
          </span>{' '}
          /月
        </div>
      )}
    </div>
  );
};

export const SummaryButtom = (
  prpos: JSX.IntrinsicAttributes &
    ButtonProps &
    RefAttributes<HTMLButtonElement | HTMLAnchorElement>
) => {
  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
              colors1
            ).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
              colors1
            ).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" {...prpos}></Button>
    </ConfigProvider>
  );
};

export const Cart: FC = () => {
  const products = $query('cart.products');
  const clear = () => $exec(clearCart());
  const totalAmount = $query(totalProductsSelector);
  const subtotal = $query(subtotalSelector);
  const installments = $query(maxInstallmentsSelector);
  const { modal } = App.useApp();

  const onCheckout = () => {
    if (!Object.keys(products).length) {
      notification.warning({
        message: '系统提示',
        description: `购物车是空的，请添加你心仪的商品到购物车吧`,
        placement: 'top',
        duration: 1,
        closeIcon: false,
      });
      return;
    }

    modal.confirm({
      title: '结算',
      content: `当前共 ${totalAmount} 件商品，金额 $${subtotal}，确定支付？`,
      onOk() {
        clear();
        notification.success({
          message: '结算完成',
          description: `共支付 $${subtotal}`,
          placement: 'top',
          closeIcon: false,
        });
        $exec(showCart(false));
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-2 min-h-0  overflow-y-auto scrollbar-none">
        <ProductList value={products} />
      </div>
      <div className="p-4 border-t border-solid border-gray-300">
        <Subtotal value={subtotal} installments={installments} />

        {!subtotal ? (
          <Button type="primary" className="mt-16" block size="large" disabled>
            无法结算
          </Button>
        ) : (
          <SummaryButtom block onClick={onCheckout}>
            结算
          </SummaryButtom>
        )}
      </div>
    </div>
  );
};
