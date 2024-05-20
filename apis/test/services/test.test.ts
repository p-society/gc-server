import assert from 'assert';
import app from '../../src/app';

describe('\'test\' service', () => {
  it('registered the service', () => {
    const service = app.service('test');

    assert.ok(service, 'Registered the service');
  });
});
