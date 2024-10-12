import app from '../../src/app';

describe('\'setQuery\' service', () => {
  it('registered the service', () => {
    const service = app.service('set-query');
    expect(service).toBeTruthy();
  });
});
