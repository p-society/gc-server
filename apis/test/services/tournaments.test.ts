import assert from 'assert';
import app from '../../src/app';

describe('\'tournaments\' service', () => {
  it('registered the service', () => {
    const service = app.service('tournaments');

    assert.ok(service, 'Registered the service');
  });
});
