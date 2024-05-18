import assert from 'assert';
import app from '../../src/app';

describe('\'form-fields\' service', () => {
  it('registered the service', () => {
    const service = app.service('form-fields');

    assert.ok(service, 'Registered the service');
  });
});
