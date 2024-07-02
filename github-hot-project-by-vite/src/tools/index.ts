/**
 * 获取 URL 中的语言参数
 * @returns {string} - 语言参数或 "All"（如果未指定）
 */
export const fetchUrlLang = (): string =>
  new URLSearchParams(window.location.search).get("language") || "All";

/**
 * 构建 GitHub 仓库的请求 URL
 * @param {string} [lang="All"] - 要过滤的编程语言
 * @param {number} [current=1] - 分页的页码
 * @param {number} [limit=10] - 每页的条数
 * @returns {string} - 构建的请求 URL
 */
export const fetchRequestUrl = (
  lang: string = "All",
  current: number = 1,
  limit: number = 10
): string => {
  const baseUrl = "https://api.github.com/search/repositories";
  const query =
    lang === "All"
      ? "q=stars:%3E1&sort=stars&order=desc&type=Repositories"
      : `q=stars:%3E1+language:${lang}&sort=stars&order=desc&type=Repositories`;
  return `${baseUrl}?${query}&page=${current}&per_page=${limit}`;
};

/**
 * 获取 URL 中的两个用户参数
 * @returns {Object} - 包含两个 GitHub 用户名的对象
 */
export const fetchTwoUserName = (): {
  githubUserOne: string;
  githubUserTwo: string;
} => {
  const searchParams = new URLSearchParams(window.location.search);
  const githubUserOne = searchParams.get("userOne") || "";
  const githubUserTwo = searchParams.get("userTwo") || "";
  return { githubUserOne, githubUserTwo };
};
