var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');
var mongoose = require('mongoose');
var log = require('./../libs/log')(module);
var URLSlugs = require('mongoose-url-slugs');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Article = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  url: { type: String, required: true },
  modified: { type: Date, default: Date.now }
});

Article.plugin(URLSlugs('title', {field: 'alias'}));

module.exports = mongoose.model('Article', Article);
