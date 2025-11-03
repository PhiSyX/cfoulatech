import { RolesPipe } from './roles.pipe';

describe('RolesPipe', () => {
  it('devrait me retourner `Client` pour le rôle `ROLE_CLIENT`', () => {
    const pipe = new RolesPipe();
    expect(pipe.transform(['ROLE_CLIENT'])).toEqual(['Client']);
  });

  it('devrait me retourner `Proprietaire` pour le rôle `ROLE_PROPRIETAIRE`', () => {
    const pipe = new RolesPipe();
    expect(pipe.transform(['ROLE_PROPRIETAIRE'])).toEqual(['Proprietaire']);
  });

  it('devrait me retourner `Admin` pour le rôle `ROLE_ADMIN`', () => {
    const pipe = new RolesPipe();
    expect(pipe.transform(['ROLE_ADMIN'])).toEqual(['Admin']);
  });


  it('devrait me retourner `Admin` et `Proprietaire` pour le rôle `ROLE_ADMIN`, `ROLE_PROPRIETAIRE`', () => {
    const pipe = new RolesPipe();
    expect(pipe.transform(['ROLE_ADMIN', 'ROLE_PROPRIETAIRE'])).toEqual(['Admin', 'Proprietaire']);
  });
});
