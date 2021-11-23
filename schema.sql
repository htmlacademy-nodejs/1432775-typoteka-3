DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  avatar VARCHAR(15),
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  passwordHash VARCHAR(32) NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  createdDate TIMESTAMP DEFAULT current_timestamp,
  announce VARCHAR(250) NOT NULL,
  fullText VARCHAR(1000),
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX ON articles(title);

CREATE TABLE photos (
  id VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  articleId INTEGER PRIMARY KEY,
  FOREIGN KEY (articleId) REFERENCES articles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  text VARCHAR(1000) NOT NULL,
  createdDate TIMESTAMP DEFAULT current_timestamp,
  userId INTEGER NOT NULL,
  articleId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (articleId) REFERENCES articles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE articles_categories (
  articleId INTEGER NOT NULL,
  categoryId INTEGER NOT NULL,
  CONSTRAINT articles_categories_pk PRIMARY KEY (articleId, categoryId),
  FOREIGN KEY (articleId) REFERENCES articles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES categories (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
