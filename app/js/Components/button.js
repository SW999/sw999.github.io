let dom = require("./domFacade");

let articlesWrapper = dom.getEl('#articles'),
    buffer = dom.tempEl(),
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
