import { Avatar } from "./Avatar";
import { Loading } from "./Loading";
import { InfinityLoad } from "./InfinityLoad";

function Item({ data: repo, indexKey }) {
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

export function List({ loading, items, loadMore, total, error }) {
  if (loading && items.length === 0) {
    return <Loading />;
  }
  if (!loading && items.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500 text-sm">No Data</div>
    );
  }

  console.log("items.length < total && !error", items.length < total && !error);

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
