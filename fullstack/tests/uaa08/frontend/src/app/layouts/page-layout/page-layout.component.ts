import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '~/components/header/header.component';

@Component({
  selector:  'layout-page',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent
{
  @Input() lockScroll: boolean = false;
  @Input() title: string | null = null;
  @Input() withPadding: boolean = true;
  @Input() withContainer: boolean = true;
  @Input() withContainerFull: boolean = true;
  @Input() withBackground: boolean = true;
  @Input() bodyFullHeight: boolean = false;

  @Input() row = false;
  @Input() autoflow = false;
}
