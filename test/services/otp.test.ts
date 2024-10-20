import app from '../../src/app';

describe('\'otp\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp');
    expect(service).toBeTruthy();
  });
});
