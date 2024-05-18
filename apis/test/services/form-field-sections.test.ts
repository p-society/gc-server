import assert from 'assert';
import app from '../../src/app';

describe('\'form-field-sections\' service', () => {
  it('registered the service', () => {
    const service = app.service('form-field-sections');

    assert.ok(service, 'Registered the service');
  });
});
