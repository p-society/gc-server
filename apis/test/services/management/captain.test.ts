import assert from 'assert';
import app from '../../../src/app';

describe('\'management/captain\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/captain');

    assert.ok(service, 'Registered the service');
  });
});
