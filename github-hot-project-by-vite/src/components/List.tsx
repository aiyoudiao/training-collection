import React from 'react';
import { Avatar } from './Avatar';
import { Loading } from './Loading';
import { InfinityLoad } from './InfinityLoad';

// 单个仓库项组件
interface ItemProps {
  data: {
    id: number;
    owner: {
      avatar_url: string;
      login: string;
    };
    html_url: string;
    name: string;
    stargazers_count: number;
    forks_count: number;
    open_issues: number;
  };
  indexKey: number;
}

/**
 * 单个仓库项组件
 * 
 * @param {ItemProps} props - 组件属性
 * @returns {JSX.Element} 仓库项的 JSX 元素
 */
function Item({ data: repo, indexKey }: ItemProps): JSX.Element {
  return (
    <div className="lg:w-1/4 md:w-1/3 w-1/2 p-2" key={repo.id}>
      <div className="bg-green-100 py-4 rounded-lg shadow-lg">
        <div className="px-4 mb-2 text-center text-lg text-green-800">
          第 {indexKey} 名
        </div>
        <div className="mb-4 flex justify-center">
          <Avatar url={repo.owner.avatar_url} />
        </div>
        <div className="px-4">
          <div className="mb-4 flex items-center justify-center">
            <a
              href={repo.html_url}
              target="_blank"
              className="font-bold text-green-700 text-center text-sm truncate hover:text-green-900"
              title={repo.name}
            >
              {repo.name}
            </a>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-user text-green-500"></i>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              {repo.owner.login}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              <span className="font-bold mr-1">{repo.stargazers_count}</span>
              stars
            </div>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-code-fork text-green-500"></i>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              <span className="font-bold mr-1">{repo.forks_count}</span>
              forks
            </div>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              <span className="font-bold mr-1">{repo.open_issues}</span>
              open issues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="py-10 text-center text-slate-500 text-sm">No Data</div>
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
