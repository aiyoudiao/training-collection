import { AnimationObserver } from "./oop/AnimationObserver.js";
import { LazyLoadObserver } from "./oop/LazyLoadObserver.js";
import { NewsItem } from "./oop/NewsItem.js";
import { NewsService } from "./oop/NewsService.js";
import { DOMObserver } from "./oop/DOMObserver.js";
import { Drawer } from "./oop/Drawer.js";
import { Carousel } from "./oop/Carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  const animationObserver = new AnimationObserver();
  const lazyLoadObserver = new LazyLoadObserver();
  new DOMObserver(animationObserver, lazyLoadObserver);

  new Drawer();
  new Carousel();

  const newsService = new NewsService();
  const $newsList = document.querySelector(".news__list");
  if ($newsList) {
    $newsList.innerHTML = "";

    newsService.getRecentNews(4).then((newsList) => {
      for (const [i, news] of newsList.entries()) {
        const $newsItem = NewsItem.create(
          `https://loremflickr.com/270/420/cat=${i}`,
          `https://loremflickr.com/90/140/cat=${i}`,
          news.title,
          news.summary,
          news.id
        );

        $newsList.append($newsItem);
      }
    });
  }
});
