import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type BadgeVariantType =
  | null
  | "danger"
  | "info"
  | "warning"
  | "success"
  | "primary"
  ;

@Component({
  selector: 'ui-badge',
  imports: [
    NgClass,
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent
{
  @Input() variant: BadgeVariantType = null;
}
