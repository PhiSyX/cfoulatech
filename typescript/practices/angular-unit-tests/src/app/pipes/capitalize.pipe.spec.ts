import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should be have the first letter in capitalize', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform("hello")).toBe('Hello');
    // expect(pipe.transform(" hello ")).toBe(' Hello ');
  });

  it('should be empty string if the value to capitalize is string', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform("")).toBe("");
  });
});
