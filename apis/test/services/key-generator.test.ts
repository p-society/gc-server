import assert from 'assert';
import app from '../../src/app';

describe('\'key-generator\' service', () => {
  it('registered the service', () => {
    const service = app.service('key-generator');

    assert.ok(service, 'Registered the service');
  });
});
