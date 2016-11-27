'use strict';
require("../css/styles.css");
require("../js/components/button");

if(process.env.NODE_ENV === 'development') {
  const json = require("../../custom-loaders/json-loader!../json/articles.json");
  console.log(process.env.NODE_ENV);
}
