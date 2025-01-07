import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'azra-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: `
    :host {
      @apply block bg-black min-h-full h-full;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
