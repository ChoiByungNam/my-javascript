import { getElement } from '../../util/index';

const defaults = {
  copyrightDateSelector: '.copyright__date'
};

export default class Header {
  constructor(element, option) {
    const options = Object.assign({}, defaults, option);
    const root = getElement(element);

    Object.assign(this, {
      root,
      options
    });

    console.log(root, options);
  }
}