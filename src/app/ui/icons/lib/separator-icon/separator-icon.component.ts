import { ChangeDetectionStrategy, Component } from '@angular/core'

import { IconWrapperComponent } from '../icon-wrapper/icon-wrapper.component'

@Component({
  selector: 'azra-separator-icon',
  imports: [IconWrapperComponent],
  templateUrl: './separator-icon.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorIconComponent {}
