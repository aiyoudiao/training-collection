const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;
import { Nav } from "./components/Nav.js";
import { List } from "./components/List.js";
import { Modal } from "./components/Modal.js";

/**
 * 获取 URL 中的语言参数
 * @returns {string} - 语言参数或 "All"（如果未指定）
 */
const fetchUrlLang = () =>
  new URLSearchParams(window.location.search).get("language") || "All";

/**
 * 构建 GitHub 仓库的请求 URL
 * @param {string} [lang="All"] - 要过滤的编程语言
 * @param {number} [current=1] - 分页的页码
 * @param {number} [limit=10] - 每页的条数
 * @returns {string} - 构建的请求 URL
 */
const buildRequestUrl = (lang = "All", current = 1, limit = 10) => {
  const baseUrl = "https://api.github.com/search/repositories";
  const query =
    lang === "All"
      ? "q=stars:%3E1&sort=stars&order=desc&type=Repositories"
      : `q=stars:%3E1+language:${lang}&sort=stars&order=desc&type=Repositories`;
  return `${baseUrl}?${query}&page=${current}&per_page=${limit}`;
};

const App = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [repoList, setRepoList] = useState([]);
  const [params, setParams] = useState({
    current: 1,
    lang: fetchUrlLang(),
    limit: 10,
  });
  const repoCache = useRef({});
  const [loadError, setLoadError] = useState("");

  /**
   * 处理语言变化
   * @param {string} lang - 选择的编程语言
   */
  const handleLangChange = (lang) => {
    setLoadError(null);
    setParams({
      lang,
      current: 1,
    });

    const cachedRepos = repoCache.current?.[lang] || [];
    if (cachedRepos.length > 0) {
      setRepoList(cachedRepos);
    } else {
      setRepoList([]);
      fetchGithubRepos(lang, 1, 10);
    }
    window.history.replaceState({}, "", `?language=${lang}`);
  };

  useEffect(() => {
    fetchGithubRepos(params.lang, params.current, params.limit);
  }, []);

  /**
   * 获取 GitHub 数据
   * @param {string} lang - 编程语言
   * @param {number} current - 页码
   * @param {number} limit - 每页条数
   */
  const fetchGithubRepos = (lang, current, limit) => {
    setLoading(true);
    setLoadError(null);
    const url = buildRequestUrl(lang, current, limit);

    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        const items = data?.items || [];
        const updatedItems = current === 1 ? items : [...repoList, ...items];
        setRepoList(updatedItems);

        if (current === 1) {
          repoCache.current[lang] = updatedItems;
        }

        setTotalCount(data?.total_count || 0);
      })
      .catch((err) => {
        err.json().then((error) => {
          setLoadError(error?.message || "Error");
        });
      })
      .finally(() => setLoading(false));
  };

  const __loadMore = () => {
    setParams((prev) => ({
      ...prev,
      current: prev.current + 1,
    }));
    fetchGithubRepos(params.lang, params.current + 1, params.limit);
  };

  /**
   * 获取下一页数据
   */
  const loadMore = (isReLoad = false) => {
    if (isReLoad) {
      __loadMore();
      return;
    }

    if (loading || loadError) {
      return;
    }

    __loadMore();
  };

  return (
    <>
      <Nav language={params.lang} change={handleLangChange} />
      <Modal error={loadError} onReload={loadMore} />
      <List
        error={loadError}
        loading={loading}
        items={repoList}
        total={totalCount}
        loadMore={loadMore}
      />
    </>
  );
};

const rootElement = document.getElementById("root");
const reactRoot = createRoot(rootElement);
reactRoot.render(<App />);
