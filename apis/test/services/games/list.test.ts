import assert from 'assert';
import app from '../../../src/app';

describe('\'games/list\' service', () => {
  it('registered the service', () => {
    const service = app.service('games/list');

    assert.ok(service, 'Registered the service');
  });
});
