var ArticleModel = require(process.cwd() + '/models/article'),
    log = require(process.cwd() + '/libs/log')(module);

exports.allArticles = function (req, res) {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
            res.render('articles', {title: 'Articles', json: articles});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
};

exports.createNew = function(req, res) {
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
            res.redirect("/articles/" + req.body._id);
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
};

exports.showArticle = function (req, res) {
    var numberOfDocs,
        setNumberOfDocuments = function (err, count) {
            if (err) return;

            numberOfDocs = count;
        };
    ArticleModel.count({}, setNumberOfDocuments);

    return ArticleModel.findById(req.params.id, function (err, article) {
        if (!err) {
            res.render('article', {title: 'Article ' + req.params.id, json: article, nextId: numberOfDocs + 1});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
};

exports.updateArticle = function (req, res) {
    return ArticleModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, article) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({error: 'Validation error put'});
            } else {
                res.statusCode = 500;
                res.send({error: 'Server error'});
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }

        log.info("article updated");
        res.render('article', {title: 'Article ' + req.params.id + ' (changed)', json: article});
    });
};

exports.deleteArticle = function (req, res) {
    return ArticleModel.findByIdAndRemove(req.params.id, function (err, article) {
        if (err) {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
        log.info("article removed");
        res.render('deleted', {title: 'Article was deleted'});
    });
};
