const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    numTestsKeptInMemory: 0,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true, // Syarat dokumentasi video bawaan Cypress
    reporter: 'cypress-mochawesome-reporter', // Syarat dokumentasi bentuk HTML
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Halaman watch YouTube sering membuat renderer/GPU crash (autoplay + decode video).
      on('before:browser:launch', (browser, launchOptions) => {
        launchOptions.args.push(
          '--autoplay-policy=user-gesture-required', // video tidak autoplay
          '--mute-audio',
          '--disable-gpu',
          '--disable-accelerated-video-decode',
          '--disable-dev-shm-usage'
        );
        return launchOptions;
      });
    },
    expose: {
      agodaUrl: "https://www.agoda.com",
      amazonUrl: "https://www.amazon.com",
      youtubeUrl: "https://www.youtube.com/?hl=id"
    },
    defaultCommandTimeout: 10000,
  },
});