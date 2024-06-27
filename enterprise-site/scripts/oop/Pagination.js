import { NewsItem } from "./NewsItem.js";
import { NewsService } from "./NewsService.js";
export class Pagination {
  /**
   * @param {number} total - 总记录数
   * @param {HTMLSelectElement} paginationSizer - 分页大小选择器
   * @param {HTMLInputElement} paginationInput - 页码跳转输入框
   * @param {HTMLElement} newsList - 新闻列表容器
   */
  constructor(total, paginationSizer, paginationInput, newsList) {
    this.total = total;
    this.paginationSizer = paginationSizer;
    this.paginationInput = paginationInput;
    this.newsList = newsList;
    this.url = new URL(window.location.href);
    this.page = parseInt(this.url.searchParams.get("page")) || 1;
    this.limit = parseInt(this.url.searchParams.get("limit")) || 8;

    this.init();
  }

  /**
   * 初始化分页组件
   */
  init() {
    this.setPaginationSizer();
    this.addPaginationSizerEvent();
    this.addPaginationInputEvent();
    this.generatePagination(this.total, this.page, this.limit);
    this.loadNews(this.page, this.limit);
  }

  /**
   * 设置分页大小选择器的值
   */
  setPaginationSizer() {
    this.paginationSizer.querySelectorAll("option").forEach((item) => {
      item.selected = item.value === String(this.limit);
    });
  }

  /**
   * 添加分页大小选择器的事件监听
   */
  addPaginationSizerEvent() {
    this.paginationSizer.addEventListener("change", (e) => {
      this.url.searchParams.set("limit", e.target.value);
      window.location.href = this.url.toString();
    });
  }

  /**
   * 添加分页跳转输入框的事件监听
   */
  addPaginationInputEvent() {
    this.paginationInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.value !== "") {
        this.url.searchParams.set("page", e.target.value);
        window.location.href = this.url.toString();
      }
    });
  }

  /**
   * 生成分页条
   * @param {number} total - 总记录数
   * @param {number} page - 当前页码
   * @param {number} limit - 每页记录数
   */
  generatePagination(total, page, limit) {
    const $paginationList = document.querySelector(".pagination__item-list");
    $paginationList.innerHTML = "";

    const startPage = 1;
    const endPage = Math.ceil(total / limit);
    const TOTAL_MIDDLE_NUMBERS = 5;

    const $prev = this.createPaginationItem("<");
    $prev.classList.add("pagination__prev");
    if (page === 1) {
      $prev.classList.add("pagination__item--disabled");
    } else {
      this.setLink($prev, page - 1);
    }
    $paginationList.append($prev);

    const $startItem = this.createPaginationItem("1");
    this.setLink($startItem, 1);
    this.setActive($startItem, 1, page);
    $paginationList.append($startItem);

    const $prevJumper = this.createPaginationItem("...");
    this.setLink(
      $prevJumper,
      this.clamp(startPage, page - TOTAL_MIDDLE_NUMBERS, endPage)
    );
    const $nextJumper = this.createPaginationItem("...");
    this.setLink(
      $nextJumper,
      this.clamp(startPage, page + TOTAL_MIDDLE_NUMBERS, endPage)
    );

    const middlePageStart = this.clamp(
      startPage + 1,
      page - Math.floor(TOTAL_MIDDLE_NUMBERS / 2),
      endPage - 1
    );
    for (let i = 0; i < TOTAL_MIDDLE_NUMBERS; i++) {
      const current = this.clamp(startPage, middlePageStart + i, endPage);
      if ([startPage, endPage].includes(current)) {
        continue;
      }
      const $item = this.createPaginationItem(current);
      this.setLink($item, current);
      if (i === 0 && current !== startPage + 1) {
        $paginationList.append($prevJumper);
      }
      $paginationList.append($item);
      this.setActive($item, current, page);
      if (i === TOTAL_MIDDLE_NUMBERS - 1 && current !== endPage - 1) {
        $paginationList.append($nextJumper);
      }
    }

    if (startPage !== endPage) {
      const $endItem = this.createPaginationItem(String(endPage));
      this.setLink($endItem, endPage);
      this.setActive($endItem, endPage, page);
      $paginationList.append($endItem);
    }

    const $next = this.createPaginationItem(">");
    $next.classList.add("pagination__next");
    if (page === endPage) {
      $next.classList.add("pagination__item--disabled");
    } else {
      this.setLink($next, page + 1);
    }
    $paginationList.append($next);
  }

  /**
   * 加载新闻列表
   * @param {number} page - 当前页码
   * @param {number} limit - 每页记录数
   */
  loadNews(page, limit) {
    const newsService = NewsService.getNewsService();
    newsService.getNews(page, limit).then((newsList) => {
      this.newsList.innerHTML = "";
      newsList.forEach((news, i) => {
        const $newItem = NewsItem.create(
          `https://loremflickr.com/270/420?lock=${page * limit + i}`,
          `https://loremflickr.com/90/140?lock=${page * limit + i}`,
          news.title,
          news.summary,
          news.id
        );
        this.newsList.append($newItem);
      });
    });
  }

  /**
   * 创建分页条目
   * @param {string|number} content - 条目内容
   * @returns {HTMLLIElement}
   */
  createPaginationItem(content) {
    const $item = document.createElement("li");
    $item.textContent = content;
    $item.classList.add("pagination__item");
    return $item;
  }

  /**
   * 为分页条目设置链接
   * @param {HTMLLIElement} el - 分页条目元素
   * @param {number} page - 页码
   */
  setLink(el, page) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    const $a = document.createElement("a");
    $a.href = url.toString();
    el.append($a);
  }

  /**
   * 设置当前激活的分页条目
   * @param {HTMLElement} el - 分页条目元素
   * @param {number} current - 当前页码
   * @param {number} page - 目标页码
   */
  setActive(el, current, page) {
    if (current === page) {
      el.classList.add("pagination__item--active");
    }
  }

  /**
   * 限制值在指定范围内
   * @param {number} min - 最小值
   * @param {number} value - 当前值
   * @param {number} max - 最大值
   * @returns {number}
   */
  clamp(min, value, max) {
    return Math.min(Math.max(min, value), max);
  }
}
