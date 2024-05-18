import assert from 'assert';
import app from '../../../src/app';

describe('\'management/teams\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/teams');

    assert.ok(service, 'Registered the service');
  });
});
