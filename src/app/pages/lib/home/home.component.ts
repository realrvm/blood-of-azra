import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LayoutComponent } from '@azra/layout'

@Component({
  selector: 'azra-home',
  imports: [LayoutComponent],
  template: `<azra-layout />`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
