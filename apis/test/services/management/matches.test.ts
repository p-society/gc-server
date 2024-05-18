import assert from 'assert';
import app from '../../../src/app';

describe('\'management/matches\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/matches');

    assert.ok(service, 'Registered the service');
  });
});
