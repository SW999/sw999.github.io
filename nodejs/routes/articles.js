var libs = process.cwd() + '/libs/',
    ArticleModel = require(libs + 'mongoose').ArticleModel,
    express = require('express'),
    log = require(libs + 'log')(module),
    app = express.Router();

app.get('/', function(req, res) {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
            res.render('articles', { title: 'Articles', json:articles });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/:id', function(req, res) {
    var article = new ArticleModel({
        _id: req.body._id,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        url: req.body.url,
        modified: Date.now()
    });

    article.save(function (err) {
        if (!err) {
            log.info("article created");
            res.render('article', { title: 'New article was added', json:article });
        } else {
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error new', art: req.body });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

app.get('/:id', function(req, res) {
    var numberOfDocs,
        setNumberOfDocuments = function(err, count){
        if(err) return;

        numberOfDocs = count;
    };
    ArticleModel.count({}, setNumberOfDocuments);

    return ArticleModel.findById(req.params.id, function (err, article) {
        if (!err) {
            res.render('article', { title: 'Article '+req.params.id, json:article, nextId:numberOfDocs+1 });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/:id', function (req, res){
    return ArticleModel.findById(req.params.id, function (err, article) {
        article._id = req.params.id;
        article.title = req.body.title;
        article.description = req.body.description;
        article.author = req.body.author;
        article.content = req.body.content;
        article.url = req.body.url;
        article.modified = Date.now();

        return article.save(function (err) {
            if (!err) {
                log.info("article updated");
                res.render('article', { title: 'Article '+req.params.id+' (changed)', json:article });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error put' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

app.delete('/:id', function (req, res){
    return ArticleModel.findById(req.params.id, function (err, article) {
        return article.remove(function (err) {
            if (!err) {
                log.info("article removed");
                res.render('deleted', { title: 'Article was deleted' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

module.exports = app;
