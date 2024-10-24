import app from '../../src/app';

describe('\'squad-player\' service', () => {
  it('registered the service', () => {
    const service = app.service('squad-player');
    expect(service).toBeTruthy();
  });
});
