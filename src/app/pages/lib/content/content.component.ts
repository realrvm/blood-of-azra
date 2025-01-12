import {
  ChangeDetectionStrategy,
  Component,
  effect,
  type ElementRef,
  inject,
  signal,
  viewChild,
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
  public image = viewChild<ElementRef<HTMLImageElement>>('img')

  private blob = this.contentApiService.blob
  public isBlobLoading = this.contentApiService.isBlobLoading
  public isBlobError = this.contentApiService.isBlobError

  effect = effect(() => {
    if (this.blob()) {
      const url = URL.createObjectURL(this.blob() as Blob)

      const image = this.image() as ElementRef<HTMLImageElement>

      if (image) image.nativeElement.src = url
    }
  })

  // TODO temp
  public currentImageNumber = signal(1)
  public hasNoImage = signal(false)
  public debounceTime = 500
  //

  public handleOnImgClick(): void {
    this.contentApiService.imagesRequest.update((prev) => (prev ? prev + 1 : 1))
  }
}
