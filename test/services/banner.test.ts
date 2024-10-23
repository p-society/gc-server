import app from '../../src/app';

describe('\'banner\' service', () => {
  it('registered the service', () => {
    const service = app.service('banner');
    expect(service).toBeTruthy();
  });
});
