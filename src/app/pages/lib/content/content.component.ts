import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core'
import { ContentApiService, DebounceDirective } from '@azra/core'
import { SidebarComponent } from '@azra/sidebar'

@Component({
  selector: 'azra-desktop',
  imports: [SidebarComponent, DebounceDirective],
  templateUrl: './content.component.html',
  styles: `
    :host {
      @apply block h-full p-4;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  private readonly contentApiService = inject(ContentApiService)
  public readonly isContentError = this.contentApiService.contentError
  public readonly isContentLoading = this.contentApiService.isContentLoading

  // TODO temp
  public currentImageNumber = signal(1)
  public hasNoImage = signal(false)
  public debounceTime = 500
  //

  public handleOnImgClick(): void {
    console.log('double click')
  }
}
