import { Nl2brPipe } from './nl2br.pipe';

describe('Nl2brPipe', () => {
  it('devrait retourner un tableau de taille 2', () => {
    const pipe = new Nl2brPipe();
    const msg = "Bonjour\nComment ça va ?";
    expect(pipe.transform(msg)).toEqual(["Bonjour", "Comment ça va ?"]);
  });
});
