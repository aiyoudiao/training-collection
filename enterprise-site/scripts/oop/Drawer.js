export class Drawer {
  constructor() {
    this.$menu = document.querySelector("#header-menu");
    this.$drawer = document.querySelector("#drawer");
    this.$drawerCloser = document.querySelector("#drawer-closer");

    if (this.$drawer) {
      this.init();
    }
  }

  init() {
    this.drawerAnimation = this.$drawer.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
      {
        duration: 300,
        easing: "ease-in-out",
      }
    );

    this.drawerAnimation.pause();

    this.$menu.addEventListener("click", () => this.openDrawer());
    this.$drawerCloser.addEventListener("click", (e) => this.closeDrawer(e));
    this.$drawer.addEventListener("click", () => this.toggleDrawer());
  }

  openDrawer() {
    this.toggleDrawer();
    this.$drawer.style.transform = "translateX(100%)";
    setTimeout(() => {
      this.drawerAnimation.playbackRate = 1;
      this.drawerAnimation.play();
      this.drawerAnimation.onfinish = () => {
        this.$drawer.style.transform = "translateX(0)";
      };
    }, 50);
  }

  closeDrawer(event) {
    event.stopPropagation();
    this.drawerAnimation.playbackRate = -1;
    this.drawerAnimation.play();
    this.drawerAnimation.onfinish = () => {
      this.$drawer.style.transform = "translateX(100%)";
      this.toggleDrawer();
    };
  }

  toggleDrawer() {
    this.$drawer.classList.toggle("max-md:block");
  }
}
