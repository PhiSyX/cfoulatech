import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-alert',
  imports: [
    NgClass,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent
{
  /**
   * Variant de style
   */
  @Input({ required: true })
  declare variant: "error" | "success" | "warning" | "info";
}
