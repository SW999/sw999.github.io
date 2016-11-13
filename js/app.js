'use strict';

let articlesWrapper = document.querySelector('#articles'),
    myRequest = new Request('https://newsapi.org/v1/articles?source=buzzfeed&apiKey=61c999a35d5d4ee29e48ccbecff42afd'),
    buffer = document.createDocumentFragment();

fetch(myRequest).then(function(response) {
    return response.json().then(function(json) {
        json['articles'].forEach(function (item, index) {
            let article = document.createElement('article'),
                title = document.createElement('h3'),
                author = document.createElement('span'),
                date = document.createElement('span'),
                description = document.createElement('p'),
                img = document.createElement('img'),
                link = document.createElement('a');

            title.innerHTML = item.title;
            author.innerHTML = 'Author: ' + item.author + '<br/>';
            date.innerHTML = item.publishedAt + '<br/>';
            img.src = item.urlToImage;
            description.innerHTML = item.description + '<br/>';
            link.innerHTML = 'Read more...';
            link.href = item.url;

            description.appendChild(link);
            article.appendChild(title);
            article.appendChild(author);
            article.appendChild(date);
            article.appendChild(img);
            article.appendChild(description);
            buffer.appendChild(article);

            return buffer;
        });

        articlesWrapper.appendChild(buffer);
    });
});
