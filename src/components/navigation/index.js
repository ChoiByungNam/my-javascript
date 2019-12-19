import Velocity from 'velocity-animate';
import {
  getElement,
  getElements,
  sequentialToggleClass,
  timeout
} from '../../util';

const defaults = {
  closeButtonClass: 'button--navigation-close',
  listClass: 'navigation-list',
  itemClass: 'navigation-link',
  listOpenedClass: 'navigation-list--open',
  activeClass: 'is-active'
};

const defaultState = {
  open: false,
  motioning: false,
  dark: false
};

export default class Navigation {
  constructor(element, option) {
    const options = Object.assign({}, defaults, option);
    const state = Object.assign({}, defaultState);
    const rootElement = element;
    const closeButton = getElement(`.${options.closeButtonClass}`, rootElement);

    Object.assign(this, {
      options,
      rootElement,
      state
    });
    const items = getElements(`.${options.itemClass}`, rootElement);
    items.forEach(button => {
      button.addEventListener('click', event => {
        const target = event.target.closest(`.${options.itemClass}`);
        const item = target.parentNode;
        const root = item.parentNode;
        const subList = getElement(`.${options.listClass}`, item);
        const activeItem = getElement(`.${options.activeClass}`, root);

        if (subList) {
          event.preventDefault();
          if (item.classList.contains(options.activeClass)) {
            Velocity(subList, 'slideUp', 'fast');
            root.classList.remove(options.listOpenedClass);
            item.classList.remove(options.activeClass);
          } else {
            root.classList.add(options.listOpenedClass);
            if (activeItem) {
              const activeSub = getElement(`.${options.listClass}`, activeItem);
              activeItem.classList.remove(options.activeClass);
              Velocity(activeSub, 'slideUp', 'fast');
            }
            item.classList.add(options.activeClass);
            Velocity(subList, 'slideDown', 'fast');
          }
        }
      });
    });

    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }
  }
  async open() {
    const { rootElement, state } = this;
    if (state.open || state.motioning) return false;
    state.open = true;
    state.motioning = true;
    await sequentialToggleClass({
      element: rootElement,
      classes: ['ready', 'active'],
      interval: 100,
      type: 'add'
    }).then(() => {});
    await timeout(350);
    rootElement.classList.add('not-touch-event');
    state.motioning = false;
    return this;
  }
  async close() {
    const { rootElement, state } = this;
    if (!state.open || state.motioning) return false;
    state.open = false;
    state.motioning = true;
    await sequentialToggleClass({
      element: rootElement,
      classes: ['active', 'ready'],
      interval: 280,
      type: 'remove'
    });
    rootElement.classList.remove('not-touch-event');
    state.motioning = false;
    await timeout(350);
    return this;
  }
}