"use strict";

const SERVER_URL = `http://localhost:3000`;
const LATEST_COMMENTS_NUMBER = 4;
const MOST_COMMENTED_ARTICLES_NUMBER = 4;

const socket = io(SERVER_URL);

const addLatestComment = (comment) => {
  const template = document.querySelector(`#new-comment`);
  const newComment = template.cloneNode(true).content;
  console.log(newComment);

  newComment.querySelector(
    `.last__list-image`
  ).src = `/img/${comment.User.avatar}`;
  newComment.querySelector(
    `.last__list-name`
  ).textContent = `${comment.User.firstName} ${comment.User.lastName}`;
  newComment.querySelector(`.last__list-link`).textContent = comment.text;
  newComment.querySelector(
    `.last__list-link`
  ).href = `/articles/${comment.articleId}`;

  const commentsList = document.querySelector(`.last__list`);
  commentsList.prepend(newComment);

  if (commentsList.childElementCount > LATEST_COMMENTS_NUMBER) {
    commentsList.lastElementChild.remove();
  }
};

const swap = (container, newElement, oldElementPosition) => {
  container.insertBefore(newElement, container.children[oldElementPosition]);
};

const getMostCommentedArticleElement = (newArticle) => {
  const template = document.querySelector(`#most-commented-article`);
  const newElement = template.cloneNode(true).content;
  console.log(newElement);

  newElement.querySelector(`.most-commented-id`).textContent = newArticle.id;
  newElement.querySelector(`.hot__link-sup`).textContent =
    newArticle.commentsNumber;
  newElement.querySelector(`.hot__list-link`).textContent = newArticle.title;
  newElement.querySelector(
    `.hot__list-link`
  ).href = `/articles/${newArticle.id}`;

  return newElement;
};

const updateMostCommented = (updatedArticle) => {
  const articlesList = document.querySelector(`.hot__list`);
  const articles = articlesList.children;
  const articlesArray = Array.from(articles);
  const commentsNumbers = articlesArray.map(
    (el) => +el.querySelector(`.hot__link-sup`).textContent
  );

  if (
    commentsNumbers.length &&
    updatedArticle.commentsNumber < commentsNumbers[commentsNumbers.length - 1]
  ) {
    return;
  }

  let currentPosition = 0;

  for (let oldArticleComments of commentsNumbers) {
    if (
      oldArticleComments === updatedArticle.commentsNumber ||
      oldArticleComments < updatedArticle.commentsNumber
    ) {
      break;
    }
    currentPosition++;
  }

  const newElement = getMostCommentedArticleElement(updatedArticle);
  swap(articlesList, newElement, currentPosition);

  articlesArray.forEach((element) => {
    if (
      +element.querySelector(`.most-commented-id`).textContent ===
      updatedArticle.id
    ) {
      element.remove();
    }
  });
};

socket.on(`comment:create`, ({ newComment, updatedArticle }) => {
  addLatestComment(newComment);
  updateMostCommented(updatedArticle);
});
