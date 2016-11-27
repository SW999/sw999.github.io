const articlesWrapper = document.querySelector('#articles'),
    requestUrl = 'https://newsapi.org/v1/articles?source=buzzfeed&apiKey=61c999a35d5d4ee29e48ccbecff42afd',
    options = {
        method: 'GET',
        cache: 'default'
    },
    buffer = document.createDocumentFragment(),
    loadButton = document.querySelector('#loadButton');

fetch(requestUrl, options)
    .then(response => response.json())
    .then(json => {
        json['articles'].forEach(function (item) {
            let article = document.createElement('article'),
                {title, author, publishedAt: date, urlToImage='http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg', description: text, url} = item,
                articleText = `<h3>${title}</h3>
                                <span>Author: ${author}, date: <em>${date}</em></span><br/>
                                <img src=${urlToImage}>
                                <p>${text}</p>
                                <a href=${url}>Read more...</a>`;


            article.innerHTML = articleText;
            buffer.appendChild(article);

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
