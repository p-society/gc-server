import app from '../../../src/app';

describe('\'users/verification\' service', () => {
  it('registered the service', () => {
    const service = app.service('users/verification');
    expect(service).toBeTruthy();
  });
});
