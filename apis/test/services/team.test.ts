import app from '../../src/app';

describe('\'team\' service', () => {
  it('registered the service', () => {
    const service = app.service('team');
    expect(service).toBeTruthy();
  });
});
