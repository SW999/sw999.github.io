function Build() {
  this.construct = function(builder) {
    builder.step1();
    builder.step2();
    builder.step3();

    return builder.get();
  }
}

function ArticleBuilder(content) {
  this.article = null;

  this.step1 = function() {
    this.article = new Article(content);
  };

  this.step2 = function() {
    this.article.createWrapper();
  };

  this.step3 = function() {
    this.article.addContent();
  };

  this.get = function() {
    return this.article;
  };
}

function Article(content1) {
  this.wrapper = null;

  this.content = '';

  this.createWrapper = function() {
    this.wrapper = document.createElement('article');
  };

  this.addContent = function() {
    let {title, author, publishedAt: date, urlToImage='http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg', description: text, url} = content1;

    this.content = `<h3>${title}</h3>
                    <span>Author: ${author}, date: <em>${date}</em></span><br/>
                    <img src="${urlToImage}">
                    <p>${text}</p>
                    <a href="${url}">Read more...</a>`;

    this.wrapper.innerHTML = this.content;
  };

  this.getArticleContent = function() {
    return this.wrapper;
  }
}

let CreateNewArticle = function (content) {

  this.getItem = function () {
    let build = new Build(),
        articleBuilder = new ArticleBuilder(content),
        article = build.construct(articleBuilder);
  
  return article.getArticleContent();
 };
};

module.exports = CreateNewArticle;
