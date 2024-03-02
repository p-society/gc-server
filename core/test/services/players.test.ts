import app from '../../src/app';

describe('\'players\' service', () => {
  it('registered the service', () => {
    const service = app.service('players');
    expect(service).toBeTruthy();
  });
});
