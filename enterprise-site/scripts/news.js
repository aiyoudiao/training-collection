import { AnimationObserver } from "./oop/AnimationObserver.js";
import { LazyLoadObserver } from "./oop/LazyLoadObserver.js";
import { Pagination } from "./oop/Pagination.js";
import { DOMObserver } from "./oop/DOMObserver.js";

document.addEventListener("DOMContentLoaded", () => {
  const animationObserver = new AnimationObserver();
  const lazyLoadObserver = new LazyLoadObserver();
  new DOMObserver(animationObserver, lazyLoadObserver);

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

  const $newsList = document.querySelector(".news__list");
  const $paginationSizer = document.querySelector(".pagination__sizer");
  const $paginationInput = document.querySelector(".pagination__jumper-input");
  const total = 100; // 先假设总记录数为 100

  new Pagination(total, $paginationSizer, $paginationInput, $newsList);
});
