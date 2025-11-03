import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { BadgeComponent } from '~/components/badge/badge.component';

@Component({
  selector: 'ui-user-badge',
  imports: [
    BadgeComponent,
    NgClass,
  ],
  templateUrl: './user-badge.component.html',
  styleUrl: './user-badge.component.scss',
})
export class UserBadgeComponent
{
  @Input({ required: true })
  declare role: string;
}
