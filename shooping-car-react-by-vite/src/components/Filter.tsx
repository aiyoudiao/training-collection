import { Checkbox, Form, Radio, Select } from 'antd';
import { useAppSelector } from '../redux';
import { changeSort, changeSizes } from '../redux/slice/productSlice';

const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'].map((size) => ({
  label: size,
  value: size,
}));

export const Filter = () => {
  const [sort, checkedSizes] = useAppSelector((state) => [state.product.sort, state.product.sizes]);

  const [priceSort] = sort;

  return (
    <Form>
      <Form.Item className="mb-2" label="尺寸">
        <Checkbox.Group
          className='hidden sm:block'
          value={checkedSizes}
          options={sizes}
          onChange={(values) => {
            changeSizes(values as string[]);
          }}
        />
        <Select
          className="sm:hidden"
          options={sizes}
          mode="multiple"
          value={checkedSizes}
          onChange={(values) => {
            changeSizes(values);
          }}
        ></Select>
      </Form.Item>
      <Form.Item className="mb-2" label="价格">
        <Radio.Group
          value={priceSort.order}
          onChange={(e) => {
            changeSort([
              {
                order: e.target.value,
                property: 'price',
              },
            ]);
          }}
        >
          <Radio.Button value="asc">按价格升序</Radio.Button>
          <Radio.Button value="desc">按价格降序</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
