show dbs //get existed databases

use posts

article = {'_id': 11, 'author': 'John Dow', 'article': 'Text of article', 'comments': ['good', 'nice'], 'tags': ['stories', "short article"]}

db.articles.insert(article) //create a new item

db.articles.find({author: "Erin La Rosa"}, {tags: "stories"}).pretty() //get items with author: "Erin La Rosa" and tags: "stories"

db.articles.update({author: "Erin La Rosa"}, {$set: {tags: ['stories', 'short article']}}, false, true) //update tags for all items with author: "Erin La Rosa"

db.articles.find({tags: "short article"}).pretty() //check

db.articles.remove({author: "John Dow"}) //remove item

db.articles.count() //check

db.articles.createIndex({"author" : 1}) //add index for "author"

db.articles.getIndexes() //check
