import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import {
  ContentApiService,
  LocalStorageService,
  ResponsiveService,
} from '@azra/core'
import { SeparatorIconComponent } from '@azra/icons'
import { InputNumber } from 'primeng/inputnumber'

@Component({
  selector: 'azra-sidebar',
  imports: [
    SeparatorIconComponent,
    RouterLink,
    InputNumber,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [ResponsiveService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly contentApiService = inject(ContentApiService)
  private readonly localStorageService = inject(LocalStorageService)
  private readonly responsiveService = inject(ResponsiveService)

  //public readonly isHandset$ = this.responsiveService.isHandset$
  public readonly isHandset$ = this.responsiveService.isHandset$

  public readonly contents = this.contentApiService.contentBooks

  // TODO temp
  public comicId = 1
  effect = effect(() => console.log(this.contents()))
  //
}
