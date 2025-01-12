import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core'
import { DrawersApiService } from '@azra/core'
import { DrawersService } from '@azra/drawers'
import { SeparatorIconComponent } from '@azra/icons'
import { DrawerModule } from 'primeng/drawer'

@Component({
  selector: 'azra-contacts-drawer',
  imports: [SeparatorIconComponent, DrawerModule],
  templateUrl: './contacts-drawer.component.html',
  styles: ``,
  providers: [DrawersApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsDrawerComponent implements OnInit {
  private readonly contactsService = inject(DrawersApiService)
  private readonly contactsDrawerService = inject(DrawersService)

  public readonly contactsValue = this.contactsService.drawersValue
  public readonly contactsError = this.contactsService.drawersError
  public readonly contactsLoading = this.contactsService.drawersLoading

  public contactsDrawer = this.contactsDrawerService.isContactsDrawerOpen

  public onHide(): void {
    this.contactsDrawer.set(false)
  }

  public ngOnInit(): void {
    this.contactsService.slug.set('/api/contacts')
  }
}
