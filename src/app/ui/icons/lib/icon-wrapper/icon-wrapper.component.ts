import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[azra-icon]',
  imports: [],
  template: `<ng-content />`,
  styles: `
    :host {
      @apply inline-flex leading-none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconWrapperComponent {}
