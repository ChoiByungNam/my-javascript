import { isElement, isFunction } from '../../util/is';

import Header from '../../components/header';
// import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
// import Loader from '../../components/loader';
// import Scroller from '../../components/interaction/scroller';

let UID = 0;

const defaults = {
  headerSelector: '#header',
  navigationSelecotor: '#navigation',
  footerSelector: '#footer'
};

export default class UI {
  constructor(option) {
    const options = Object.assign({}, defaults, option);
    this.id = UID++;
    this.options = options;

    /**
     * Header
     */
    const headerElement = document.querySelector(options.headerSelector);
    if (headerElement && isElement(headerElement)) {
      this.header = new Header(headerElement, {
        preMenuOpen: () => {
          const { state } = this.navigation;
          return !state.open && !state.motioning;
        },
        preMenuClose: () => {
          const { state } = this.navigation;
          return state.open && !state.motioning;
        },
        menuOpen: () => {
          if (this.navigation && isFunction(this.navigation.open)) {
            this.navigation.open();
          }
        },
        menuClose: () => {
          if (this.navigation && isFunction(this.navigation.close)) {
            this.navigation.close();
          }
        }
      });
    }

    /**
     * Navigation
     */
    // const navigationElement = document.querySelector(
    //   options.navigationSelecotor
    // );
    // if (navigationElement && isElement(navigationElement)) {
    //   this.navigation = new Navigation(navigationElement, {});
    // }

    /**
     * Footer
     */
    const footerElement = document.querySelector(options.footerSelector);
    this.footer = new Footer(footerElement);

    /**
     * 스크롤 이벤트
     */
    // this.scroller = new Scroller({
    //   onScroll: (...args) => this.onScroll(...args),
    //   onScrollEnd: (...args) => this.onScrollEnd(...args)
    // });
  }
  // onScroll(from, to) {
  //   const { options } = this;
  //   if (options.onScroll && isFunction(options.onScroll)) {
  //     options.onScroll(from, to);
  //   }
  // }
  // onScrollEnd(top) {
  //   const { options } = this;
  //   if (options.onScrollEnd && isFunction(options.onScrollEnd)) {
  //     options.onScrollEnd(top);
  //   }
  // }
}
window.UI = UI;
const ui = new UI();
window.ui = ui;