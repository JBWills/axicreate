const { Application } = require("spectron");
const assert = require("assert");
const electronPath = require("electron");
const path = require("path");

// Sample code taken from:
// https://github.com/electron-userland/spectron
// eslint-disable-next-line func-names
describe("Application launch", function () {
  this.timeout(10_000);
  beforeEach(() => {
    this.app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: electronPath,
      args: [path.join(__dirname, "../app/electron/main.js")],
      env: {
        NODE_ENV: "test",
      },
    });

    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("shows an initial window", () => {
    return this.app.client.getWindowCount().then((count) => {
      assert.strictEqual(count, 1);
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    });
  });
});
