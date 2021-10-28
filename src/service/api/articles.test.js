"use strict";

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);

const NoteService = require(`../data-service/NotesService`);
const CommentService = require(`../data-service/CommentsService`);

const {testNotes, testComments} = require(`../testData`);
const {StatusCode, COMMENT_ID_SIZE, NOTE_ID_SIZE} = require(`../../const`);

const noteService = new NoteService(testNotes, NOTE_ID_SIZE);
const commentSerice = new CommentService(
    testComments,
    COMMENT_ID_SIZE,
    noteService
);

const app = express();
app.use(express.json());

articles(app, noteService, commentSerice);

const getValidArticle = () => {
  const validArticle = JSON.parse(JSON.stringify(testNotes[0]));

  delete validArticle.id;
  delete validArticle.comments;

  return validArticle;
};

describe(`/articles route works correctly with articles`, () => {
  it(`Returns list of aricles`, async () => {
    const res = await request(app).get(`/articles`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(5);
  });

  describe(`Article creation works correctly`, () => {
    let validArticle;
    beforeEach(() => {
      validArticle = getValidArticle();
    });

    it(`Creates new article`, async () => {
      const res = await request(app).post(`/articles`).send(validArticle);

      expect(res.statusCode).toBe(StatusCode.CREATED);
      expect(res.body.id.length).toBe(NOTE_ID_SIZE);

      delete res.body.id;

      expect(res.body).toEqual({...validArticle, comments: []});
    });

    it(`Should return 400 if one of required fields is missing`, async () => {
      // non required field
      delete validArticle.fullText;

      await Promise.all(
          Object.keys(validArticle).map(async (key) => {
            const invalidArticle = Object.assign({}, validArticle);
            delete invalidArticle[key];

            const res = await request(app).post(`/articles`).send(invalidArticle);

            expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
          })
      );
    });

    it(`Should return 400 if there is an unexpected field`, async () => {
      validArticle.unexpectedField = `some value`;

      const res = await request(app).post(`/articles`).send(validArticle);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });
  });

  describe(`Returns article by id`, () => {
    it(`Returns correct article by id`, async () => {
      const res = await request(app).get(`/articles/7BdzEYyBO_`);

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(res.body).toEqual(testNotes[0]);
    });

    it(`Returns 404 if article with given id doesn't exist`, async () => {
      const res = await request(app).get(`/articles/abc`);

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });
  });

  describe(`Article update works correctly`, () => {
    let validUpdate;
    beforeEach(() => {
      validUpdate = getValidArticle();
    });

    it(`Updates article if update is valid`, async () => {
      const res = await request(app)
        .put(`/articles/MKaCh4a7mF`)
        .send(validUpdate);

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(res.body.id).toBe(`MKaCh4a7mF`);
      expect(res.body.title).toBe(validUpdate.title);
    });

    it(`Returns 404 if article with given id doesn't exist`, async () => {
      const res = await request(app).put(`/articles/ab cd`).send(validUpdate);

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });

    it(`Returns 400 if article update is invalid`, async () => {
      validUpdate.unexpectedField = `some value`;
      const res = await request(app)
        .put(`/articles/MKaCh4a7mF`)
        .send(validUpdate);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });
  });

  describe(`Article deletion works correctly`, () => {
    it(`Deletes article`, async () => {
      const res = await request(app).delete(`/articles/Ew7HE_kkmO`);

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(noteService.findOne(`Ew7HE_kkmO`)).toBeUndefined();
    });

    it(`Returns 404 if article with given id doesn't exist`, async () => {
      const res = await request(app).delete(`/articles/he nne`);

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });
  });
});

describe(`/articles route works correctly with comments`, () => {
  describe(`Returns comments of given id article`, () => {
    it(`Returns correct comments`, async () => {
      const res = await request(app).get(`/articles/7BdzEYyBO_/comments`);

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(res.body.length).toBe(6);
      expect(res.body[0].noteId).toBe(`7BdzEYyBO_`);
    });

    it(`Returns 404 if given article doesn't exist`, async () => {
      const res = await request(app).get(`/articles/ahs cy/comments`);

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });
  });

  describe(`Creates new comment for given id article`, () => {
    let validComment;
    beforeEach(() => {
      validComment = JSON.parse(JSON.stringify(testComments[0]));
      delete validComment.id;
      delete validComment.noteId;
    });

    it(`Creates new comment`, async () => {
      const res = await request(app)
        .post(`/articles/7BdzEYyBO_/comments`)
        .send(validComment);

      expect(res.statusCode).toBe(StatusCode.CREATED);
      expect(res.body.noteId).toBe(`7BdzEYyBO_`);

      const isCommentAddedToArticle = noteService
        .findOne(`7BdzEYyBO_`)
        .comments.includes(res.body.id);
      expect(isCommentAddedToArticle).toBeTruthy();
    });

    it(`Returns 404 if given article doesn't exist`, async () => {
      const res = await request(app)
        .post(`/articles/as gs/comments`)
        .send(validComment);

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });

    it(`Returns 400 if not all required fields are presented`, async () => {
      const res = await request(app)
        .post(`/articles/7BdzEYyBO_/comments`)
        .send({});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if unexpected field is presented`, async () => {
      validComment.unexpectedField = 1456;
      const res = await request(app)
        .post(`/articles/7BdzEYyBO_/comments`)
        .send(validComment);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });
  });

  describe(`Deletes comment of given id article`, () => {
    it(`Deletes comment`, async () => {
      const res = await request(app).delete(
          `/articles/7BdzEYyBO_/comments/dkVIP-MD8q`
      );

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(res.body.id).toBe(`dkVIP-MD8q`);

      const isCommentAddedToArticle = noteService
        .findOne(`7BdzEYyBO_`)
        .comments.includes(`dkVIP-MD8q`);
      expect(isCommentAddedToArticle).toBeFalsy();
    });

    it(`Returns 404 if given article doesn't exist`, async () => {
      const res = await request(app).delete(
          `/articles/agd btg/comments/dkVIP-MD8q`
      );

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });

    it(`Returns 404 if given comment doesn't exist`, async () => {
      const res = await request(app).delete(
          `/articles/7BdzEYyBO_/comments/ag shr`
      );

      expect(res.statusCode).toBe(StatusCode.NOT_FOUND);
    });

  });
});
