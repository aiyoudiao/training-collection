import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Drawer, Layout } from 'antd';

import { Cart, Filter, ProductList } from '../components';
import { totalProductsSelector } from '../redux/selector';
import { $query, $exec } from '../redux';
import { showCart } from '../redux/slice/cartSlice';

function App() {
  const show = $query('cart.show');
  const total = $query(totalProductsSelector) || 0;

  return (
    <Layout className="min-h-full">
      <Layout.Header className="z-10 sticky bg-blue-600 top-0 w-full px-4 lg:px-8">
        <div className="flex  items-center h-full">
          <div className="text-2xl text-white">购物车</div>
          <div className="flex justify-end items-center h-full flex-auto"></div>
          <button
            className="flex justify-center items-center text-white p-2 rounded-lg text-2xl bg-transparent border-none hover:bg-white/10 active:bg-white/20"
            onClick={() => {
              $exec(showCart(true));
            }}
          >
            <Badge count={total} showZero color="#faad14" offset={[0, 0]}>
              <ShoppingCartOutlined className="text-3xl text-white align-middle" />
            </Badge>
          </button>
        </div>
      </Layout.Header>
      <Layout.Content className='overflow-y-auto scrollbar-none'>
        <div className="flex flex-col max-w-5xl mx-auto p-4 overflow-y-auto scrollbar-none">
          <Filter />
          <ProductList />
        </div>
      </Layout.Content>
      <Drawer
        open={show}
        onClose={() => $exec(showCart(false))}
        title="购物车结算"
        placement="right"
        style={{ padding: 0 }}
      >
        <Cart />
      </Drawer>
    </Layout>
  );
}

export default App;
