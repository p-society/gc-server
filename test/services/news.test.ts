import app from '../../src/app';

describe('\'news\' service', () => {
  it('registered the service', () => {
    const service = app.service('news');
    expect(service).toBeTruthy();
  });
});
