import app from '../../src/app';

describe('\'squad\' service', () => {
  it('registered the service', () => {
    const service = app.service('squad');
    expect(service).toBeTruthy();
  });
});
