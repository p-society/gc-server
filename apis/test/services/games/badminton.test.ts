import assert from 'assert';
import app from '../../../src/app';

describe('\'games/badminton\' service', () => {
  it('registered the service', () => {
    const service = app.service('games/badminton');

    assert.ok(service, 'Registered the service');
  });
});
