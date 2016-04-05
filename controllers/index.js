import express from 'express';
import contentType from '../middlewares/contentType';

let router = express.Router();

router.route('*')
  .all(contentType);

router.route('/')
  .get(function (req, res, next) {
    res.render('user', {"id": 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"});
  });

router.route('/test')
  .all(function (req, res, next) {
    let a = "Route description";
    next(a);
  })
  .get(function (a, req, res, next) {
    res.end(a);
  });


export default router;
