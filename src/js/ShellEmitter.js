export default class ShellEmitter {
  shells = [];

  constructor(shellsCount) {
    for (let i = 0; i < shellsCount; ++i) {
      this.shells.push(new Shell());
    }
  }

  activate() {}
}
