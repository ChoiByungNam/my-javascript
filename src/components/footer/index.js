import { getElement } from '../../util/index';

const defaults = {
  copyrightDateSelector: '.copyright__date'
};

export default class Footer {
  constructor(element, option) {
    const options = Object.assign({}, defaults, option);
    const root = getElement(element);
    const dateElement = getElement(`${options.copyrightDateSelector}`, root);

    Object.assign(this, {
      dateElement,
      root,
      options
    });

    this.getDate();
  }

  getDate() {
    const { options, dateElement } = this;

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    dateElement.innerHTML = `${year}${month}${date}`;
  }
}