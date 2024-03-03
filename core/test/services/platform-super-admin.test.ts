import app from '../../src/app';

describe('\'platform-super-admin\' service', () => {
  it('registered the service', () => {
    const service = app.service('platform-super-admin');
    expect(service).toBeTruthy();
  });
});
