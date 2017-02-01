var ArticleModel = require(process.cwd() + '/models/article');

exports.allArticles = function (req, res) {
    return ArticleModel.find(function (err, articles) {
        if (err) {
            res.statusCode = 500;
            return res.send({error: err.message});
        }
            res.statusCode = 200;
            res.status(200).send({data: JSON.stringify(articles)});
    });
};

exports.showArticle = function (req, res) {
    return ArticleModel.findOne({'alias': req.params.alias}, function (err, article) {
        if (err) {
            res.statusCode = 500;
            return res.status(500).send({error: err.message});
        }
        res.statusCode = 200;
        res.status(200).send({data: JSON.stringify(article)});
    });
};

exports.createNew = function(req, res) {
    var article = new ArticleModel({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        url: req.body.url,
        modified: Date.now()
    });

    article.save(function (err, newArticle) {
        if (!err) {
            res.status(200).send({ ok: 'New article was created' });
        } else {
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error new', art: req.body });
            } else {
                res.statusCode = 500;
                res.status(500).send({ error: err.message });
            }
        }
    });
};

exports.updateArticle = function (req, res) {
    return ArticleModel.findOneAndUpdate({'alias' : req.params.alias}, {$set: req.body}, {new: true}, function (err, article) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({error: 'Validation error put: '+err.message});
            } else {
                res.statusCode = 500;
                res.send({error: 'Server error: '+err.message});
            }
        }
        res.render('article', {json: article});
    });
};

exports.deleteArticle = function (req, res) {
    return ArticleModel.findOneAndRemove({'alias' : req.params.alias}, function (err, article) {
        if (err) {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        } else {
            res.render('deleted', {title: 'Article was deleted'});
        }
    });
};
