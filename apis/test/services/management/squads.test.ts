import assert from 'assert';
import app from '../../../src/app';

describe('\'management/squads\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/squads');

    assert.ok(service, 'Registered the service');
  });
});
