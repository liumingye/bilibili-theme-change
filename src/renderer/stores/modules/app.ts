import { action, computed, makeObservable, observable } from 'mobx';

type Theme = 'light' | 'dark';

class App {
  constructor() {
    makeObservable(this);

    if (window.localStorage.theme) {
      this.theme = window.localStorage.theme as Theme;
    }

    document.body.setAttribute('data-theme', this.theme);
  }

  @observable theme: Theme = 'light';

  @observable count = 0;

  @observable menu = [];

  @action inc = (value: number) => {
    this.count += value;
  };

  @action setTheme = (_theme: Theme) => {
    this.theme = _theme;
    window.localStorage.setItem('theme', _theme);
    document.body.setAttribute('data-theme', _theme);
  };

  @computed get total() {
    return this.count;
  }
}

export default new App();
