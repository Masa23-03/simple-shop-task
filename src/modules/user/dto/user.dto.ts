import { User } from 'generated/prisma';

export type UpdateUserDTO = Partial<Pick<User, 'name' | 'email'>>;

export type UserOverviewResponseDTO = Pick<User, 'name' | 'email' | 'role'> & {
  id: string;
};
