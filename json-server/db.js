const countries = require("./countries");
const iemarkers = require("./iemarkers");
const exportvqs = require("./exportvqs");
const pythongraph = require("./pythongraph");
const timelapse = require("./timelapse");
const flows = require("./clsFlow");
const transports = require("./clsProducts");
const products = require("./clsTransport");

module.exports = () => ({
  countries,
  iemarkers,
  exportvqs,
  pythongraph,
  timelapse,
  flows,
  transports,
  products
});
