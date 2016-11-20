'use strict';

var articlesWrapper = document.querySelector('#articles'),
    requestUrl = 'https://newsapi.org/v1/articles?source=buzzfeed&apiKey=61c999a35d5d4ee29e48ccbecff42afd',
    options = {
    method: 'GET',
    cache: 'default'
},
    buffer = document.createDocumentFragment();

fetch(requestUrl, options).then(function (response) {
    return response.json();
}).then(function (json) {
    json['articles'].forEach(function (item) {
        var article = document.createElement('article'),
            title = item.title,
            author = item.author,
            date = item.publishedAt,
            _item$urlToImage = item.urlToImage,
            urlToImage = _item$urlToImage === undefined ? 'http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg' : _item$urlToImage,
            text = item.description,
            url = item.url,
            articleText = '<h3>' + title + '</h3>\n                                <span>Author: ' + author + ', date: <em>' + date + '</em></span><br/>\n                                <img src=' + urlToImage + '>\n                                <p>' + text + '</p>\n                                <a href=' + url + '>Read more...</a>';


        article.innerHTML = articleText;
        buffer.appendChild(article);

        return buffer;
    });

    articlesWrapper.appendChild(buffer);
}).catch(function (error) {
    var errorMessage = document.createElement('h2');

    errorMessage.innerHTML = 'Oh no: ' + error.message + '!';
    buffer.appendChild(errorMessage);
    articlesWrapper.appendChild(buffer);
});