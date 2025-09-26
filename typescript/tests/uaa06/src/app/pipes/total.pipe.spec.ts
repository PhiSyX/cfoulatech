import { TotalPipe } from './total.pipe';

describe('TotalPipe', () => {
  it('vérifier que quantite:3 prix:8 donne 24€', () => {
    const pipe = new TotalPipe();
    expect(pipe.transform({ quantite: 3, prix: 8 })).toBe('24 €');
  });

  it('vérifier que quantite:5 prix:10 donne 50€', () => {
    const pipe = new TotalPipe();
    expect(pipe.transform({ quantite: 5, prix: 10 })).toBe('50 €');
  });
});
