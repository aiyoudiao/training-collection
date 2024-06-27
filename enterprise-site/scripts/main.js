import { AnimationObserver } from "./oop/AnimationObserver.js";
import { LazyLoadObserver } from "./oop/LazyLoadObserver.js";
import { NewsItem } from "./oop/NewsItem.js";
import { NewsService } from "./oop/NewsService.js";
import { DOMObserver } from "./oop/DOMObserver.js";
import { Carousel } from "./oop/Carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  const animationObserver = new AnimationObserver();
  const lazyLoadObserver = new LazyLoadObserver();
  new DOMObserver(animationObserver, lazyLoadObserver);

  new Carousel();

  const $menu = document.querySelector(".header__menu");
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

  const newsService = new NewsService();
  const $newsList = document.querySelector(".news__list");
  if ($newsList) {
    $newsList.innerHTML = "";

    newsService.getRecentNews(4).then((newsList) => {
      for (const [i, news] of newsList.entries()) {
        const $newsItem = NewsItem.create(
          `https://loremflickr.com/270/420?lock=${i}`,
          `https://loremflickr.com/90/140?lock=${i}`,
          news.title,
          news.summary,
          news.id
        );

        $newsList.append($newsItem);
      }
    });
  }
});
