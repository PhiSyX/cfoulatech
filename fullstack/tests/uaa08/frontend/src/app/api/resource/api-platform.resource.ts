/**
 * Réponse envoyée par API Platform: Resource.
 */
export interface ApiPlatformResource<T extends string>
{
  '@context': string;
  '@id': `/api/${Lowercase<T>}s/${number}`;
  '@type': Capitalize<T>;
  id: number;
}

/**
 * Réponse envoyée par API Platform: CollectionResource.
 */
export interface ApiPlatformResourceCollection<T>
{
  '@context': `/api/contexts/${string}`;
  '@id': `/api/${string}`;
  '@type': 'Collection';
  member: Array<T>;
  totalItems: number;
  view: {
    '@id': `/api/${string}?${string}`;
    '@type': 'PartialCollectionView';
    first?: `/api/${string}?itemsPerPage=${number}&page=${number}`
    last?: `/api/${string}?itemsPerPage=${number}&page=${number}`
    previous?: `/api/${string}?itemsPerPage=${number}&page=${number}`
    next?: `/api/${string}?itemsPerPage=${number}&page=${number}`
  };
}
