var path = require("path");
module.exports = {
  devServer: {
    host: "localhost",
    port: 8070
  },
  configureWebpack: {
    resolve: {
      alias: {
        icons: path.resolve(__dirname, "node_modules/vue-material-design-icons")
      },
      extensions: [".vue"]
    }
  }
};
