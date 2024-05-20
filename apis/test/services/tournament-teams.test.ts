import assert from 'assert';
import app from '../../src/app';

describe('\'tournament-teams\' service', () => {
  it('registered the service', () => {
    const service = app.service('tournament-teams');

    assert.ok(service, 'Registered the service');
  });
});
