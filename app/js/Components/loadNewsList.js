let ArticleBuilder = require("./articleBuilder");
let dom = require("./domFacade");

const articlesWrapper = dom.getEl('#articles'),
    requestUrl = 'https://newsapi.org/v1/articles?source=buzzfeed&apiKey=61c999a35d5d4ee29e48ccbecff42afd',
    options = {
        method: 'GET',
        cache: 'default'
    },
    buffer = dom.tempEl(),
    loadButton = dom.getEl('#loadButton');

fetch(requestUrl, options)
    .then(response => response.json())
    .then(json => {
        json['articles'].forEach(function (item) {
            let article = new ArticleBuilder.create(item);

            buffer.appendChild(article.getItem());

            return buffer;
        });

        articlesWrapper.removeChild(loadButton);
        articlesWrapper.appendChild(buffer);
    })
    .catch(error => {
        let errorMessage = document.createElement('h2');

        errorMessage.innerHTML = `Oh no: ${error.message}!`;
        buffer.appendChild(errorMessage);
        articlesWrapper.appendChild(buffer);
    });
