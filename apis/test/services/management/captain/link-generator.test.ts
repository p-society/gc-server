import assert from 'assert';
import app from '../../../../src/app';

describe('\'management/captain/link-generator\' service', () => {
  it('registered the service', () => {
    const service = app.service('management/captain/link-generator');

    assert.ok(service, 'Registered the service');
  });
});
