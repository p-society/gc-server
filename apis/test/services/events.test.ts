import assert from 'assert';
import app from '../../src/app';

describe('\'events\' service', () => {
  it('registered the service', () => {
    const service = app.service('events');

    assert.ok(service, 'Registered the service');
  });
});
