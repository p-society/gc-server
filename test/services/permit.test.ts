import app from '../../src/app';

describe('\'permit\' service', () => {
  it('registered the service', () => {
    const service = app.service('permit');
    expect(service).toBeTruthy();
  });
});
