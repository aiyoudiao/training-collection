import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Drawer, Layout } from 'antd';

import { Cart, Filter, ProductList } from '../components';
import { selectTotalProducts } from '../redux/selector';
import { useAppSelector, useAppDispatch } from '../redux';
import { showCart } from '../redux/slice/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.cart.show);
  debugger;

  const total = useAppSelector(selectTotalProducts) || 0;

  return (
    <Layout className="min-h-full">
      <Layout.Header className="z-10 sticky top-0 w-full px-4 lg:px-8">
        <div className="flex items-center h-full">
          <div className="text-lg text-white">江南服装厂</div>
          <div className="flex justify-end items-center h-full flex-auto"></div>

          <button
            className="flex justify-center items-center text-white p-2 rounded-lg text-2xl bg-transparent border-none hover:bg-white/10 active:bg-white/20"
            onClick={() => {
              dispatch(showCart(true));
            }}
          >
            <Badge count={total} showZero color="#faad14" offset={[0, 0]}>
              <ShoppingCartOutlined className="text-3xl text-white align-middle" />
            </Badge>
          </button>
        </div>
      </Layout.Header>
      <Layout.Content>
        <div className="flex flex-col max-w-5xl mx-auto p-4">
          <Filter />
          <ProductList />
        </div>
      </Layout.Content>
      <Drawer
        open={show}
        onClose={() => dispatch(showCart(false))}
        title="购物车"
        placement="right"
        style={{ padding: 0 }}
      >
        <Cart />
      </Drawer>
    </Layout>
  );
}

export default App;
