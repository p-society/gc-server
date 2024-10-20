import app from '../../src/app';

describe('\'send_otp\' service', () => {
  it('registered the service', () => {
    const service = app.service('send_otp');
    expect(service).toBeTruthy();
  });
});
