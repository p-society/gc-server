import assert from 'assert';
import app from '../../src/app';

describe('\'get-form\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-form');

    assert.ok(service, 'Registered the service');
  });
});
