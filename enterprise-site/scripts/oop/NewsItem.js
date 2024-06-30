import { LazyLoadImage } from "./LazyLoadImage.js";

// 工厂方法：创建新闻项
export class NewsItem {
  /**
   * 创建新闻项
   * @param {string} image
   * @param {string} placeholderImage
   * @param {string} title
   * @param {string} summary
   * @param {string} id
   * @returns {HTMLLIElement}
   */
  static create(image, placeholderImage, title, summary, id) {
    const imgWrapper = LazyLoadImage.create(
      image,
      placeholderImage,
      "新闻插图"
    );
    imgWrapper.classList.add("news__image", "hover-scale");

    const titleElem = document.createElement("h3");
    titleElem.classList.add("news__title", "sm:text-lg");
    titleElem.setAttribute("data-animation", "fadeIn");
    titleElem.textContent = title;

    const summaryElem = document.createElement("p");
    summaryElem.classList.add("news__summary");
    summaryElem.setAttribute("data-animation", "fadeIn");
    summaryElem.textContent = summary;

    const link = document.createElement("a");
    link.href = `./news-detail.html?id=${id}`;

    const newsItem = document.createElement("li");
    newsItem.classList.add("news__item", "sm:basis-1/4", "sm:px-4");
    newsItem.append(imgWrapper, titleElem, summaryElem, link);

    return newsItem;
  }
}
