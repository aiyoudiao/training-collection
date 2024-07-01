import { LazyLoadImage } from "./LazyLoadImage.js";

// 建造者：文章结构及内容的缔造
export class NewsArticleBuilder {
  constructor(newsId) {
    this.newsId = newsId;
    this.articleElement = document.querySelector("article");
  }

  /**
   * 构建新闻文章
   * @param {object} news - 新闻数据对象
   */
  buildArticle(news) {
    this.articleElement.append(this.createBanner());

    const sectionElement = document.createElement("section");
    sectionElement.className = "p-4";

    sectionElement.append(this.createTitle(news.title));
    sectionElement.append(this.createSource(news.from, news.createdAt));
    sectionElement.append(this.createBody(news.content1));
    sectionElement.append(this.createIllustration());
    sectionElement.append(this.createBody(news.content2));

    this.articleElement.append(sectionElement);

    return this.articleElement;
  }

  /**
   * 创建横幅图片
   * @returns {HTMLElement} - 横幅图片元素
   */
  createBanner() {
    return this.createImage("banner");
  }

  /**
   * 创建插图图片
   * @returns {HTMLElement} - 插图图片元素
   */
  createIllustration() {
    return this.createImage("illustration");
  }

  /**
   * 创建图片元素
   * @param {string} type - 图片类型
   * @returns {HTMLElement} - 图片元素
   */
  createImage(type) {
    const imgElement = LazyLoadImage.create(
      `https://loremflickr.com/1200/675/cat=${this.newsId}-${type}`,
      `https://loremflickr.com/320/180/cat=${this.newsId}-${type}`,
      "新闻插图",
      `https://loremflickr.com/800/450/cat=${this.newsId}-${type} 800w, https://loremflickr.com/1200/675/cat=${this.newsId}-${type} 1200w`,
      "100vw"
    );

    return imgElement;
  }

  /**
   * 创建标题元素
   * @param {string} title - 标题文本
   * @returns {HTMLElement} - 标题元素
   */
  createTitle(title) {
    const titleElement = document.createElement("h3");
    titleElement.className =
      "px-4 text-base sm:text-3xl text-center text-black font-bold";
    titleElement.textContent = title;

    return titleElement;
  }

  /**
   * 创建来源元素
   * @param {string} source - 来源文本
   * @param {string} date - 日期文本
   * @returns {HTMLElement} - 来源元素
   */
  createSource(source, date) {
    const sourceElement = document.createElement("div");
    sourceElement.className =
      "my-4 text-xs sm:text-base text-[#b1b1b1] text-center";
    sourceElement.textContent = `${new Date(
      date
    ).toLocaleDateString()}　来源：${source}`;

    return sourceElement;
  }

  /**
   * 创建内容段落元素
   * @param {string} content - 段落文本
   * @returns {HTMLElement} - 内容段落元素
   */
  createBody(content) {
    const bodyElement = document.createElement("p");
    bodyElement.textContent = content;

    return bodyElement;
  }
}
