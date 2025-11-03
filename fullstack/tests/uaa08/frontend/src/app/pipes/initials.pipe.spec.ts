import { InitialsPipe } from './initials.pipe';

describe('InitialPipe', () => {

  it('devrait avoir J. D.', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('Julien Dunia')).toBe('J. D.');
  });

  it('devrait avoir J. A.', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('Jean Aimable')).toBe('J. A.');
  });

});
