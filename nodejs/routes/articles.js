var express = require('express'),
    api = require(process.cwd() + '/controllers/api'),
    app = express.Router();

app.get('/', api.allArticles);

app.post('/:id', api.createNew);

app.get('/:id', api.showArticle);

app.put('/:id', api.updateArticle);

app.delete('/:id', api.deleteArticle);

module.exports = app;
