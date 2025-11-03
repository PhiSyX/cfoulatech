import { map, Observable } from 'rxjs';

import { PhotoResource } from '~/api/resource/photo.resource';
import { Photo } from '~/models/photo';

// -------- //
// Fonction //
// -------- //

const toPhoto = (res: Observable<PhotoResource>): Observable<Photo> => res.pipe(
  map(toPhotoModel),
);

const toPhotoModel = (res: PhotoResource): Photo => {
  return {
    chemin: res.chemin,
    description: res.description,
    title: res.title,
    id: res.id,
  };
};

// ------ //
// Export //
// ------ //

export {
  toPhoto
};

