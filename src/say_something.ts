export default class SaySomething {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  public sayText(elem: HTMLElement) {
    elem && (elem.innerText = this.message);
  }
}
