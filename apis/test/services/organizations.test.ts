import assert from 'assert';
import app from '../../src/app';

describe('\'organizations\' service', () => {
  it('registered the service', () => {
    const service = app.service('organizations');

    assert.ok(service, 'Registered the service');
  });
});
