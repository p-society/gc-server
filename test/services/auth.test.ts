import app from '../../src/app';

describe('\'auth\' service', () => {
  it('registered the service', () => {
    const service = app.service('auth');
    expect(service).toBeTruthy();
  });
});
