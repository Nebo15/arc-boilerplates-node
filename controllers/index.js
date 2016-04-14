import validator from 'node-validator';
import {validate} from '../helpers/validator';

export let getIndex = (req, res) => {
  res.renderJson('user', {"id": 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"});
};

export let postIndex = (req, res) => {
  let validationRules = validator.isObject().withRequired('postparam', validator.isNumber());
  validate(validationRules, req.body)
    .then(
      () => {
        res.sendJson(req.app.get('config'));
      },
      (err) => {
        res.addError(422, 'validation_error', 'some_message');
        res.addInvalidFields(err);
        res.renderJson();
      }
    );
};
