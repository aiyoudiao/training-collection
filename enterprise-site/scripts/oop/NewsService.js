// 单例：获取请求新闻数据的对象
export class NewsService {
  constructor() {
    if (NewsService.instance) {
      return NewsService.instance;
    }
    this.baseUrl = "https://64006b1463e89b0913ae6339.mockapi.io/api/";
    this.newsUrl = new URL("news", this.baseUrl);

    NewsService.instance = Object.freeze(this);
    return NewsService.instance;
  }

  /**
   * 获取 NewsService 的实例
   * @returns {NewsService}
   */
  static getNewsService() {
    if (NewsService.instance) {
      return NewsService.instance;
    }
    return new NewsService();
  }

  /**
   * 获取新闻列表
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object[]>}
   */
  getNews(page, limit) {
    const search = new URLSearchParams([
      ["page", String(page)],
      ["limit", String(limit)],
    ]);
    const url = new URL(this.newsUrl);
    url.search = search.toString();

    return fetch(url).then((res) => res.json());
  }

  /**
   * 获取最近的新闻
   * @param {number} num
   * @returns {Promise<Object[]>}
   */
  getRecentNews(num) {
    return this.getNews(1, num);
  }

  /**
   * 通过 ID 获取新闻
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getNewsById(id) {
    const url = new URL(`${this.newsUrl}/${id}`);
    return fetch(url).then((res) => res.json());
  }
}
