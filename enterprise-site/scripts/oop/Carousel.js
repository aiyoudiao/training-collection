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
    this.$header = document.querySelector("#header");
    this.$carousel = document.querySelector("#carousel");
    this.$carouselContainer = document.querySelector("#carousel-container");
    this.$carouselIndicator = document.querySelector("#carousel-indicator");

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
    [this.$header, this.$carousel].forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (this.animation) this.animation.pause();
      });

      item.addEventListener("mouseleave", () => {
        if (this.animation) this.animation.play();
      });
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
      this.currentBanner.classList.remove("fadeIn");
    }

    if (this.currentIndicator) {
      this.currentIndicator.classList.remove("scale-150");
    }

    this.currentBanner = banner;
    this.currentBanner.classList.add("fadeIn");
    this.currentBanner.classList.remove("fadeout");
    this.currentBanner.style.zIndex = currentIndex;

    this.currentIndicator = indicator;
    this.currentIndicator.classList.add("scale-150");

    const $innerBar = Array.from(
      document.querySelectorAll("[name='progress-inner-bar']")
    ).find((el) => this.matchParent(el.parentElement, this.currentIndicator));

    // 获取半径为40的圆的周长，
    this.animation = $innerBar.animate(
      [{ strokeDashoffset: 251 }, { strokeDashoffset: 0 }],
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
    $carouselTitle.classList.add(
      "md:text-[5rem]",
      "md:leading-[6.5rem]",
      "max-md:text-5xl"
    );
    $carouselTitle.textContent = banner.title;

    const $carouselDescription = document.createElement("div");
    $carouselDescription.classList.add(
      "md:mt-7",
      "md:text-4xl",
      "max-md:mt-3",
      "max-md:text-xl"
    );
    $carouselDescription.textContent = banner.description;

    const $carouselContent = document.createElement("div");
    $carouselContent.classList.add(
      ..."relative w-full h-full flex flex-col items-center justify-end bg-center bg-no-repeat bg-cover text-white pt-0 pb-[10%] px-[10%]".split(
        " "
      ),
      "md:justify-center",
      "md:pt-16"
    );
    $carouselContent.append($carouselTitle, $carouselDescription);

    const $carouselImage = LazyLoadImage.create(
      banner.image,
      banner.imagePlaceholder,
      "横幅",
      banner.imageSet,
      "100vw",
      "w-full h-full object-cover".split(" ")
    );
    $carouselImage.classList.add("absolute", "inset-0");

    const $carouselContentWrapper = document.createElement("div");
    $carouselContentWrapper.classList.add(
      ..."relative w-full h-full".split(" ")
    );
    $carouselContentWrapper.append($carouselImage, $carouselContent);

    const $carouselItem = document.createElement("div");
    $carouselItem.classList.add(
      ..."z-0 absolute top-0 left-0 w-full h-full".split(" ")
    );
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
      //
      $indicatorItem.classList.add(
        ..."cursor-pointer transition-all duration-[linear] delay-[0.2s] scale-100 hover:scale-150".split(
          " "
        )
      );
      $indicatorItem.innerHTML = `
            <span class="w-4 h-4">
              <svg  class="w-3 h-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle name="progress-inner-bar" fill="none" stroke="white" stroke-width="10" stroke-dasharray="251" cx="50" cy="50" r="40" transform="rotate(-90 50 50)" stroke-linecap="round" class="[stroke-dashoffset:251]"></circle>
                <circle cx="50" cy="50" r="40" stroke="#B1B1B1" stroke-opacity="0.5" fill="none" stroke-width="10"/>
              </svg>
            </span>
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
