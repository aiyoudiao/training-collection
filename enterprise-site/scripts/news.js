import { AnimationObserver } from "./oop/AnimationObserver.js";
import { LazyLoadObserver } from "./oop/LazyLoadObserver.js";
import { Pagination } from "./oop/Pagination.js";
import { DOMObserver } from "./oop/DOMObserver.js";
import { Drawer } from "./oop/Drawer.js";

document.addEventListener("DOMContentLoaded", () => {
  const animationObserver = new AnimationObserver();
  const lazyLoadObserver = new LazyLoadObserver();
  new DOMObserver(animationObserver, lazyLoadObserver);

  new Drawer();

  const $newsList = document.querySelector(".news__list");
  const $paginationSizer = document.querySelector(".pagination__sizer");
  const $paginationInput = document.querySelector(".pagination__jumper-input");

  new Pagination($paginationSizer, $paginationInput, $newsList);
});
