import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('devrait ne retourner que 20 caractères avec `...` (23 au total)', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('bonjour')).toBe('bonjour');
    expect(pipe.transform('bonjour tout le monde comment ça va')).toBe('bonjour tout le mond...');
  });

  it('devrait retourner du vide', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('     ')).toBe('');
  });
});
