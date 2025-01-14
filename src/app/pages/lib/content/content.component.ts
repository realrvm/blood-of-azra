import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  imports: [SidebarComponent, DebounceDirective],
  templateUrl: './content.component.html',
  styles: `
    :host {
      @apply block h-full p-4;
    }
  `,
  host: {
    '(document:keyup)': 'handleOnPress($event)',
  },
  providers: [ContentApiService],
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
  private currentImageNumber = this.contentApiService.imagesRequest.asReadonly()
  private imagesAmount = this.contentApiService.contentImagesAmount
  public amountTitle = computed(() =>
    this.imagesAmount() - 1 >= this.currentImageNumber()
      ? this.currentImageNumber()
      : `${this.currentImageNumber()} - Last Page`,
  )

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
    const max = this.imagesAmount()
    this.contentApiService.imagesRequest.update((prev) =>
      prev < max ? prev + 1 : max,
    )
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
      this.contentApiService.imagesRequest.update((prev) => {
        const max = this.imagesAmount()

        if (prev < 1) return 1

        return prev < max ? prev + 1 : max
      })
    }
  }
}
