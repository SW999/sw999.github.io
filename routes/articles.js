var express = require('express'),
    api = require(process.cwd() + '/controllers/api'),
    app = express.Router();

app.get('/', api.allArticles);

app.post('/:alias', api.createNew);

app.get('/:alias', api.showArticle);

app.put('/:alias', api.updateArticle);

app.delete('/:alias', api.deleteArticle);

module.exports = app;
