var express = require('express'),
    api = require(process.cwd() + '/controllers/api'),
    app = express.Router();

app.get('/', api.allArticles);

app.get('/:alias', api.showArticle);

app.post('/', api.createNew);

app.put('/:alias', api.updateArticle);

app.delete('/:alias', api.deleteArticle);

module.exports = app;
