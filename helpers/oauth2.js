import oauthserver from 'oauth2-server';
import * as oauth2Model from '../app/models/oauth2';
import config from './../settings/config';

export let oauth2 = oauthserver({
  model: oauth2Model,
  grants: config.get('oauth2Grants'),
  debug: false,
  passthroughErrors: true
});
