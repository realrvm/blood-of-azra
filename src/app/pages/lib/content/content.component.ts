import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  inject,
  type OnInit,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ContentApiService, DebounceDirective } from '@azra/core'
import { SidebarComponent } from '@azra/sidebar'

@Component({
  selector: 'azra-desktop',
  imports: [SidebarComponent, DebounceDirective, AsyncPipe],
  templateUrl: './content.component.html',
  styles: `
    :host {
      @apply block h-full p-4;
    }
  `,
  host: {
    '(document:keyup)': 'handleOnPress($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  private readonly contentApiService = inject(ContentApiService)
  public readonly isContentError = this.contentApiService.contentError
  public readonly isContentLoading = this.contentApiService.isContentLoading
  public image = viewChild<ElementRef<HTMLImageElement>>('img')
  private readonly destroyRef = inject(DestroyRef)

  public blob$ = this.contentApiService.blob$
  public hasNoImage = signal<boolean>(true)
  public currentImageNumber = this.contentApiService.imagesRequest

  ngOnInit(): void {
    this.blob$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((blob) => {
      if (blob) {
        this.hasNoImage.set(false)

        const url = URL.createObjectURL(blob as Blob)

        const image = this.image() as ElementRef<HTMLImageElement>

        if (image) image.nativeElement.src = url
      } else {
        this.hasNoImage.set(true)
      }
    })
  }

  public handleOnImgClick(): void {
    this.contentApiService.imagesRequest.update((prev) => (prev ? prev + 1 : 1))
  }

  public handleOnPress(event: KeyboardEvent): void {
    event.stopPropagation()

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    if (event.code === 'ArrowLeft') {
      this.contentApiService.imagesRequest.update((prev) =>
        prev <= 1 ? 1 : prev - 1,
      )
    }

    if (event.code === 'ArrowRight') {
      this.contentApiService.imagesRequest.update((prev) =>
        prev < 1 ? 1 : prev + 1,
      )
    }
  }
}
