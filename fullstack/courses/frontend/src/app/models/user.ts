export interface User
{
  id: number;
  name: string;
  email: string;
  registeredAt: Date;
}

export type CreateUserModel = Omit<User, 'id' | 'registeredAt'>;
