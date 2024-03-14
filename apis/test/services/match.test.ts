import app from '../../src/app';

describe('\'match\' service', () => {
  it('registered the service', () => {
    const service = app.service('match');
    expect(service).toBeTruthy();
  });
});
