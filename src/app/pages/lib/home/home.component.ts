import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutComponent } from '@azra/layout'

@Component({
  selector: 'azra-home',
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <azra-layout />

    <router-outlet name="abouts-drawer" />
    <router-outlet name="contacts-drawer" />
  `,
  styles: `
    :host {
      @apply block h-full;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
