import { CustomDatePipe } from './custom-date.pipe';

describe('CustomDatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });
});
