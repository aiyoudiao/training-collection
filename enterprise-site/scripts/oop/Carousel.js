import { LazyLoadImage } from "./LazyLoadImage.js";

// Carousel：用于实现轮播图的逻辑。
export class Carousel {
  /**
   * 创建 Carousel 实例
   */
  constructor() {
    this.bannerInfos = [
      {
        image: "./assets/banner1-lg.jpg",
        imageSet: "./assets/banner1.jpg 800w, ./assets/banner1-lg.jpg 1200w",
        imagePlaceholder: "./assets/banner1-xs.jpg",
        title: "开启互联网+ 从我们开始",
        description: "域名主机，网站建设，云服务器，企业邮箱一站式解决",
      },
      {
        image: "./assets/banner2-lg.jpg",
        imageSet: "./assets/banner2.jpg 800w, ./assets/banner2-lg.jpg 1200w",
        imagePlaceholder: "./assets/banner2-xs.jpg",
        title: "新闻中心",
        description:
          "几乎所有的伟大成就，都是团队集体协作追求远大目标的结果。这些团队的领导者挑选了团队的成员，并激励他们追求自己不敢想象的成就。",
      },
      {
        image: "./assets/banner3-lg.jpg",
        imageSet: "./assets/banner3.jpg 800w, ./assets/banner3-lg.jpg 1200w",
        imagePlaceholder: "./assets/banner3-xs.jpg",
        title: "关于我们",
        description:
          "企业构建互联网信息技术服务平台，领先技术变革，提升产业效率，致力于使能软件企业引领发展，服务制造企业转型升级，为政企客户提供“多快好省”的信息技术服务。",
      },
    ];

    this.bannerDoms = [];
    this.$carousel = document.querySelector(".carousel");
    this.$carouselContainer = document.querySelector(".carousel__container");
    this.$carouselIndicator = document.querySelector(".carousel__indicator");

    this.indicatorItems = this.createIndicators();
    this.counter = 0;
    this.currentBanner = null;
    this.currentIndicator = null;
    this.animation = null;

    this.setupEvents();
    this.start(this.counter);
  }

  /**
   * 设置事件监听
   */
  setupEvents() {
    this.$carousel.addEventListener("mouseenter", () => {
      if (this.animation) this.animation.pause();
    });

    this.$carousel.addEventListener("mouseleave", () => {
      if (this.animation) this.animation.play();
    });

    this.indicatorItems.forEach((item, i) => {
      this.$carouselIndicator.append(item);
      item.addEventListener("click", () => {
        this.counter = i;
        this.bannerDoms.forEach((banner) => (banner.style.zIndex = -1));
        if (this.animation) this.animation.cancel();
        this.start(this.counter);
        if (this.animation) this.animation.pause();
      });
    });
  }

  /**
   * 开始轮播
   * @param {number} currentIndex
   */
  start(currentIndex) {
    const index = currentIndex % this.bannerInfos.length;

    if (!this.bannerDoms[index]) {
      const bannerDom = this.createBannerDom(index);
      this.bannerDoms[index] = bannerDom;
      this.$carouselContainer.append(bannerDom);
    }

    const banner = this.bannerDoms[index];
    const indicator = this.indicatorItems[index];

    if (this.currentBanner) {
      this.currentBanner.classList.add("fadeout");
      this.currentBanner.classList.remove("fadein");
    }

    if (this.currentIndicator) {
      this.currentIndicator.classList.remove(
        "carousel__indicator-item--active"
      );
    }

    this.currentBanner = banner;
    this.currentBanner.classList.add("fadein");
    this.currentBanner.classList.remove("fadeout");
    this.currentBanner.style.zIndex = currentIndex;

    this.currentIndicator = indicator;
    this.currentIndicator.classList.add("carousel__indicator-item--active");

    const $innerBar = Array.from(
      document.querySelectorAll(".progress__inner-bar")
    ).find((el) => this.matchParent(el.parentElement, this.currentIndicator));

    this.animation = $innerBar.animate(
      [{ strokeDashoffset: 2 * Math.PI * 40 }, { strokeDashoffset: 0 }],
      5000
    );

    this.animation.onfinish = () => {
      this.counter += 1;
      this.start(this.counter);
    };
  }

  /**
   * 创建横幅 DOM
   * @param {number} index
   * @returns {HTMLDivElement}
   */
  createBannerDom(index) {
    const banner = this.bannerInfos[index];

    const $carouselTitle = document.createElement("div");
    $carouselTitle.classList.add("carousel__title", "sm:text-6xl");
    $carouselTitle.textContent = banner.title;

    const $carouselDescription = document.createElement("div");
    $carouselDescription.classList.add(
      "carousel__description",
      "sm:mt-6",
      "sm:text-3xl"
    );
    $carouselDescription.textContent = banner.description;

    const $carouselContent = document.createElement("div");
    $carouselContent.classList.add("carousel__content", "sm:justify-center");
    $carouselContent.append($carouselTitle, $carouselDescription);

    const $carouselImage = LazyLoadImage.create(
      banner.image,
      banner.imagePlaceholder,
      "横幅",
      banner.imageSet,
      "100vw"
    );
    $carouselImage.classList.add("carousel__image");

    const $carouselContentWrapper = document.createElement("div");
    $carouselContentWrapper.classList.add("carousel__content-wrapper");
    $carouselContentWrapper.append($carouselImage, $carouselContent);

    const $carouselItem = document.createElement("div");
    $carouselItem.classList.add("carousel__item");
    $carouselItem.append($carouselContentWrapper);

    return $carouselItem;
  }

  /**
   * 创建轮播指示器
   * @returns {HTMLDivElement[]}
   */
  createIndicators() {
    return Array.from({ length: this.bannerInfos.length }).map(() => {
      const $indicatorItem = document.createElement("div");
      $indicatorItem.classList.add("carousel__indicator-item");
      $indicatorItem.innerHTML = `
            <svg class="progress" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle class="progress__inner-bar" cx="50" cy="50" r="40"></circle>
              <circle class="progress__bar" cx="50" cy="50" r="40" />
            </svg>
          `;
      return $indicatorItem;
    });
  }

  /**
   * 匹配父元素
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @returns {boolean}
   */
  matchParent(node, parent) {
    if (!node.parentElement) return false;
    if (node.parentElement === parent) return true;
    return this.matchParent(node.parentElement, parent);
  }
}
