import assert from 'assert';
import app from '../../../../src/app';

describe('\'management/teams/players\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/teams/players');

    assert.ok(service, 'Registered the service');
  });
});
