import { Checkbox, Form, Radio, Select } from 'antd';
import { $query, $exec } from '../redux';
import { changeSort, changeSizes } from '../redux/slice/productSlice';

const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'].map((size) => ({
  label: size,
  value: size,
}));

export const Filter = () => {
  const {sort, sizes: checkedSizes} = $query('product');

  const [priceSort] = sort;

  return (
    <Form>
      <Form.Item className="mb-2" label={<span className='font-bold text-lg'>尺寸</span>}>
        <Checkbox.Group
          className='hidden sm:block text-lg'
          value={checkedSizes}
          options={sizes}
          onChange={(values) => {
            $exec(changeSizes(values as string[]));
          }}
        />
        <Select
        
          className="sm:hidden text-md"
          options={sizes}
          mode="multiple"
          value={checkedSizes}
          onChange={(values) => {
            $exec(changeSizes(values));
          }}
        ></Select>
      </Form.Item>
      <Form.Item className="mb-2" label={<span className='font-bold text-lg'>价格</span>}>
        <Radio.Group
          value={priceSort.order}
          onChange={(e) => {
            $exec(changeSort([
              {
                order: e.target.value,
                property: 'price',
              },
            ]));
          }}
        >
          <Radio.Button value="asc" className='text-md'>按价格升序</Radio.Button>
          <Radio.Button value="desc" className='text-md'>按价格降序</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
