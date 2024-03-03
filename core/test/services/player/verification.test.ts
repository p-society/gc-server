import app from '../../../src/app';

describe('\'player/verification\' service', () => {
  it('registered the service', () => {
    const service = app.service('player/verification');
    expect(service).toBeTruthy();
  });
});
