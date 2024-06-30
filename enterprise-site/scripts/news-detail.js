import { NewsArticleBuilder } from "./oop/NewsArticleBuilder.js";
import { NewsService } from "./oop/NewsService.js";
import { AnimationObserver } from "./oop/AnimationObserver.js";
import { LazyLoadObserver } from "./oop/LazyLoadObserver.js";
import { Pagination } from "./oop/Pagination.js";
import { DOMObserver } from "./oop/DOMObserver.js";

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

  const $menu = document.querySelector(".header-menu");
  const $drawer = document.querySelector(".drawer");
  const $drawerCloser = document.querySelector(".drawer__closer");
  const $drawerContainer = document.querySelector(".drawer__container");

  if ($drawerContainer) {
    const drawerAnimation = $drawerContainer.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
      {
        duration: 300,
        easing: "ease-in-out",
      }
    );

    drawerAnimation.pause();

    $menu.addEventListener("click", () => {
      toggleDrawer();
      $drawerContainer.style.transform = "translateX(100%)";
      setTimeout(() => {
        drawerAnimation.playbackRate = 1;
        drawerAnimation.play();
        drawerAnimation.onfinish = () => {
          $drawerContainer.style.transform = "translateX(0)";
        };
      }, 50);
    });

    $drawerCloser.addEventListener("click", (e) => {
      e.stopPropagation();
      drawerAnimation.playbackRate = -1;
      drawerAnimation.play();
      drawerAnimation.onfinish = () => {
        $drawerContainer.style.transform = "translateX(100%)";
        toggleDrawer();
      };
    });

    $drawer.addEventListener("click", () => {
      toggleDrawer();
    });

    function toggleDrawer() {
      $drawer.classList.toggle("drawer--active");
    }
  }
});

// 初始化并构建新闻文章
document.addEventListener("DOMContentLoaded", () => {});
