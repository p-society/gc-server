import assert from 'assert';
import app from '../../../../src/app';

describe('\'management/squads/players\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/squads/players');

    assert.ok(service, 'Registered the service');
  });
});
