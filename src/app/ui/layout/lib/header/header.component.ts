import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TransitionDirective } from '@azra/core'
import { DrawersService } from '@azra/drawers'
import { SeparatorIconComponent } from '@azra/icons'

@Component({
  selector: 'azra-header',
  imports: [
    CommonModule,
    SeparatorIconComponent,
    RouterLink,
    TransitionDirective,
  ],
  templateUrl: './header.component.html',
  styles: `
    :host {
      @apply block h-full md:h-auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly drawerService = inject(DrawersService)

  public readonly aboutsDrawerOpen = this.drawerService.isAboutsDrawerOpen
  public readonly contactsDrawerOpen = this.drawerService.isContactsDrawerOpen

  public onShowContacts(): void {
    this.contactsDrawerOpen.set(true)
  }

  public onShowAbouts(): void {
    this.aboutsDrawerOpen.set(true)
  }
}
