import app from '../../src/app';

describe('\'team-player\' service', () => {
  it('registered the service', () => {
    const service = app.service('team-player');
    expect(service).toBeTruthy();
  });
});
