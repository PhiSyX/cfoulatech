import { Adresse } from '~/models/adresse';
import { AddressPipe } from './address.pipe';

describe('AddressPipe', () => {
  it('devrait formatter une adresse correctement', () => {
    const pipe = new AddressPipe();
    const adresse: Adresse = {
      id: 42,
      pays: 'Belgique',
      ville: 'Bruxelles',
      rue: 'Rue de la formation CFITECH',
      codePostal: 1081,
      numero: '42',
    };
    expect(pipe.transform(adresse)).toBe(
      'Rue de la formation CFITECH n°42, 1081 Bruxelles, Belgique'
    );
  });
});
