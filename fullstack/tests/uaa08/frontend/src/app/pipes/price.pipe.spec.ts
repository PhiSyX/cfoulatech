import { PricePipe } from './price.pipe';

describe('PricePipe', () => {
  it('devrait retourner 200 k €', () => {
    const pipe = new PricePipe();
    expect(pipe.transform(200_000)).toBe('200 k €');
  });

  it('devrait retourner 200,000 k €', () => {
    const pipe = new PricePipe();
    expect(pipe.transform(200_000, 'standard')).toBe('200 000,00 €');
  })
});
