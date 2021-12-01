-- All categories
SELECT * FROM categories;

-- non-empty categories
SELECT id, name FROM categories
  JOIN articles_categories
  ON categoryId = id
  GROUP BY id;

-- categories with number of articles
SELECT id, name, count(categoryId) FROM categories
  LEFT JOIN articles_categories
  ON categoryId = id
  GROUP BY id;

--all articles
SELECT
  count(comments.id) AS commentsNumber,
  STRING_AGG(DISTINCT categories.name, ', ') AS categories,
  articles.id,
  articles.title,
  articles.announce,
  articles.createdDate,
  users.firstName,
  users.lastName,
  users.email
FROM articles
  JOIN users ON articles.userId = users.id
  LEFT JOIN comments ON articles.id = comments.articleId
  JOIN articles_categories ON articles.id = articles_categories.articleId
  JOIN categories ON  articles_categories.categoryId = categories.id
  GROUP BY articles.id, users.id
  ORDER BY articles.id ASC

--one article
SELECT
  count(comments) AS comments,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  articles.id,
  articles.title,
  articles.announce,
  articles.createdDate,
  articles.fullText
FROM articles
  LEFT JOIN comments ON articles.id = comments.articleId
  JOIN articles_categories ON articles.id = articles_categories.articleId
  JOIN categories ON articles_categories.categoryId = categories.id
WHERE articles.id = 0
  GROUP BY articles.id

-- 5 newest comments
SELECT
  comments.id,
  comments.articleId,
  comments.text,
  users.firstName,
  users.lastName
FROM comments
  JOIN users ON comments.userId = users.id
  ORDER BY createdDate DESC
  LIMIT 5

-- comments for article
SELECT
  comments.*,
  users.firstName,
  users.lastName
FROM comments
  JOIN users ON comments.userId = users.id
WHERE comments.articleId = 0
  ORDER BY createdDate DESC

UPDATE articles
SET title = 'Как я встретил новый год'
WHERE articles.id = 0
