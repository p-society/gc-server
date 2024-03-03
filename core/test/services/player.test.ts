import app from '../../src/app';

describe('\'player\' service', () => {
  it('registered the service', () => {
    const service = app.service('player');
    expect(service).toBeTruthy();
  });
});
