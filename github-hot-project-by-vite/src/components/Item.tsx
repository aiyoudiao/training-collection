import { Avatar } from "./Avatar";
import { Icon } from "./Icon";

// Item组件的属性类型定义
export interface ItemProps {
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
 * Item 组件
 *
 * @param {ItemProps} props - 组件属性
 * @returns {JSX.Element} Item 的 JSX 元素
 */
export function Item(props: ItemProps): JSX.Element {
  const item = props.data;

  return (
    <div
      className="flex-1 lg:w-[25%] lg:max-w-[25%] lg:min-w-[25%] md:w-[33.3%] md:max-w-[33.3%] md:min-w-[33.3%] w-[50%] max-w-[50%] min-w-[50%] p-2"
      key={item.id}
    >
      <div className="bg-green-100 py-4 rounded-lg hover:bg-green-200 transition-transform transform hover:scale-95">
        <div className="px-4 mb-2 text-center text-green-800 font-semibold">
          第 {props.indexKey} 名
        </div>
        <div className="mb-4">
          <Avatar url={item.owner.avatar_url} />
        </div>

        <div className="px-4">
          <div className="mb-4 flex items-center justify-center">
            <a
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-green-600 text-center text-sm truncate hover:text-green-800"
              title={item.name}
            >
              {item.name}
            </a>
          </div>
          <div className="flex items-center mb-2">
            <Icon iconName="fa-user" className=" text-green-500"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              {item.owner.login}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Icon iconName="fa-star" className=" text-yellow-500"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              <span className="font-bold mr-1">{item.stargazers_count}</span>
              stars
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Icon iconName="fa-code-fork" className=" text-green-500"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              <span className="font-bold mr-1">{item.forks_count}</span>
              forks
            </div>
          </div>
          <div className="flex items-center">
            <Icon
              iconName="fa-triangle-exclamation"
              className=" text-blue-500"
            ></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              <span className="font-bold mr-1">{item.open_issues}</span>
              open issues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
