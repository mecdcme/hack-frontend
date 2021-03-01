const countries = require("./countries");
const iemarkers = require("./iemarkers");
const exportvqs = require("./exportvqs");
const pythongraph = require("./pythongraph");
const timelapse = require("./timelapse");
const flows = require("./clsFlow");
const products = require("./clsProducts");
const product3s = require("./clsProducts3");
const transports = require("./clsTransport");
const expVar = require("./expvar");
const impVar = require("./impvar");

module.exports = () => ({
  countries,
  iemarkers,
  exportvqs,
  pythongraph,
  timelapse,
  flows,
  transports,
  products,
  product3s,
  expVar,
  impVar
});
