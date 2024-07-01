import { NewsArticleBuilder } from "./oop/NewsArticleBuilder.js";
import { NewsService } from "./oop/NewsService.js";
import { AnimationObserver } from "./oop/AnimationObserver.js";
import { LazyLoadObserver } from "./oop/LazyLoadObserver.js";
import { DOMObserver } from "./oop/DOMObserver.js";
import { Drawer } from "./oop/Drawer.js";

document.addEventListener("DOMContentLoaded", () => {
  const animationObserver = new AnimationObserver();
  const lazyLoadObserver = new LazyLoadObserver();
  new DOMObserver(animationObserver, lazyLoadObserver);

  const url = new URL(window.location.href);
  const newsId = url.searchParams.get("id");

  if (!newsId) {
    return;
  }

  const builder = new NewsArticleBuilder(newsId);
  const newsService = NewsService.getNewsService();

  newsService.getNewsById(newsId).then((news) => {
    builder.buildArticle(news);
  });

  new Drawer();
});

// 初始化并构建新闻文章
document.addEventListener("DOMContentLoaded", () => {});
