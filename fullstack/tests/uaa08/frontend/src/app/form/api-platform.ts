export type ApiResourceCreate_Form<T extends object> = Omit<
  T,
  | "@context"
  | "@id"
  | "@type"
  | 'id'
  | 'createdAt'
  | 'updatedAt'
>;
