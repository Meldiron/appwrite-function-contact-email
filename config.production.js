/*
|-------------------------------------------------------------------------------
| Production config           https://maizzle.com/docs/environments/#production
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/

module.exports = {
  build: {
    templates: {
      destination: {
        path: "appwrite-function/email-template-dist",
      },
    },
  },
  inlineCSS: {
    mergeLonghand: true,
  },
  prettify: true,
  removeUnusedCSS: true,
};
