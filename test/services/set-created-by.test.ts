import app from '../../src/app';

describe('\'setCreatedBy\' service', () => {
  it('registered the service', () => {
    const service = app.service('set-created-by');
    expect(service).toBeTruthy();
  });
});
