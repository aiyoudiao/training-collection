import { Loading } from './Loading';
import { InfinityLoad } from './InfinityLoad';
import { Item, ItemProps } from './Item';


// 列表组件
interface ListProps {
  loading: boolean;
  items: ItemProps['data'][];
  loadMore: () => void;
  total: number;
  error?: string;
}

/**
 * 列表组件
 * 
 * @param {ListProps} props - 组件属性
 * @returns {JSX.Element} 列表的 JSX 元素
 */
export function List({ loading, items, loadMore, total, error }: ListProps): JSX.Element {
  if (loading && items.length === 0) {
    return <Loading />;
  }
  if (!loading && items.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500 text-sm">大皆空</div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-around mx-2">
        {items.map((item, index) => (
          <Item key={`${item.id}-${index}`} data={item} indexKey={index + 1} />
        ))}
      </div>
      <InfinityLoad
        loading={items.length < total && !error}
        loadMore={loadMore}
      />
    </>
  );
}
