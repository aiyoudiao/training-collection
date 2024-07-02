import React, { useRef, useState, useEffect, memo } from "react";
import { Nav } from "@/components/Nav";
import { List } from "@/components/List";
import { Modal } from "@/components/Modal";
import { useUrlLang, useRequestUrl } from "@/hooks/useUtils";

interface Repo {
  id: number;
  name: string;
  // 其他仓库相关字段
}

interface Params {
  current: number;
  lang: string;
  limit: number;
}

const Home: React.FC = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [repoList, setRepoList] = useState<Repo[]>([]);
  const [params, setParams] = useState<Params>({
    current: 1,
    lang: useUrlLang(),
    limit: 10,
  });
  const repoCache = useRef<{ [key: string]: Repo[] }>({});
  const [loadError, setLoadError] = useState<string>("");

  /**
   * 处理语言变化
   * @param {string} lang - 选择的编程语言
   */
  const handleLangChange = (lang: string) => {
    setLoadError("");
    const params = {
      lang,
      current: 1,
      limit: 10,
    };
    setParams(params);

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
  const fetchGithubRepos = (lang: string, current: number, limit: number) => {
    setLoading(true);
    setLoadError("");
    const url = useRequestUrl(lang, current, limit);

    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        const items = data?.items || [];
        const updatedItems = current === 1 ? items : [...repoList, ...items];
        setRepoList(updatedItems);
        repoCache.current[lang] = updatedItems;

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
   * @param {boolean} isReLoad - 是否重新加载
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

export default memo(Home);
