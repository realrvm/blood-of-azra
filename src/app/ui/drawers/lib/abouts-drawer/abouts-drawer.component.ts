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
  selector: 'azra-abouts-drawer',
  imports: [SeparatorIconComponent, DrawerModule],
  templateUrl: './abouts-drawer.component.html',
  styles: ``,
  providers: [DrawersApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutsDrawerComponent implements OnInit {
  private readonly aboutsApiService = inject(DrawersApiService)
  private readonly aboutsDrawerService = inject(DrawersService)

  public readonly aboutsValue = this.aboutsApiService.drawersValue
  public readonly errorMessage = this.aboutsApiService.errorMessage
  public readonly aboutsLoading = this.aboutsApiService.drawersLoading

  public aboutsDrawer = this.aboutsDrawerService.isAboutsDrawerOpen

  public onHide(): void {
    this.aboutsDrawer.set(false)
  }

  public ngOnInit(): void {
    this.aboutsApiService.slug.set('/api/abouts')
  }
}
