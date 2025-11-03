import { Pipe, PipeTransform } from '@angular/core';

import { UserRole } from '~/api/resource/user.resource';

@Pipe({
  name: 'roles',
})
export class RolesPipe implements PipeTransform
{
  transform(roles: Array<UserRole>): Array<Capitalize<string>>
  {
    return roles.map((roleRaw) => {
      const role = roleRaw.slice('ROLE_'.length);
      return role.slice(0, 1).toUpperCase() + role.slice(1).toLowerCase() as Capitalize<string>;
    });
  }
}
