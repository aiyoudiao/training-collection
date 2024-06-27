// 工厂方法：创建懒加载图像元素
export class LazyLoadImage {
  /**
   * 创建懒加载图像
   * @param {string} image
   * @param {string} placeholderImage
   * @param {string} alt
   * @param {string} srcset
   * @param {string} sizes
   * @returns {HTMLDivElement}
   */
  static create(image, placeholderImage, alt, srcset, sizes) {
    const img = document.createElement("img");
    img.setAttribute("data-lazy", image);
    if (srcset) {
      img.setAttribute("data-srcset", srcset);
    }
    if (sizes) {
      img.setAttribute("sizes", sizes);
    }
    img.setAttribute("data-placeholder", placeholderImage);
    img.setAttribute("alt", alt);

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("image--loading", "image");
    imgWrapper.append(img);

    img.onload = () => {
      imgWrapper.classList.remove("image--loading");
    };

    return imgWrapper;
  }
}
