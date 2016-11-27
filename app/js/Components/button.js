let articlesWrapper = document.querySelector('#articles'),
    buffer = document.createDocumentFragment(),
    button = document.createElement('button');

button.id = 'loadButton';
button.className = 'load-button';
button.innerHTML = 'Load news';
button.addEventListener('click', function () {
  require.ensure([], function() {
    require('./loadNewsList');
    require('../../css/article-styles.css');
  });
});

buffer.appendChild(button);

articlesWrapper.appendChild(buffer);
