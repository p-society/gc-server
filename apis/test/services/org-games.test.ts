import assert from 'assert';
import app from '../../src/app';

describe('\'org-games\' service', () => {
  it('registered the service', () => {
    const service = app.service('org-games');

    assert.ok(service, 'Registered the service');
  });
});
