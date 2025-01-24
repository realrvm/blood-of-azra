import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  forwardRef,
  inject,
  type OnInit,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { ArrowLeftComponent, ArrowRightComponent } from '@azra/arrows'
import {
  ContentApiService,
  DebounceDirective,
  ResponsiveService,
} from '@azra/core'

@Component({
  selector: 'azra-handset',
  imports: [
    DebounceDirective,
    forwardRef(() => ArrowLeftComponent),
    forwardRef(() => ArrowRightComponent),
  ],
  templateUrl: './handset.component.html',
  styles: `
    :host {
      @apply p-1;
    }
  `,
  providers: [ContentApiService, ResponsiveService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandsetComponent implements OnInit {
  private readonly contentApiService = inject(ContentApiService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)
  private readonly responsiveService = inject(ResponsiveService)
  public hasNoImage = signal<boolean>(true)
  private currentImageNumber = this.contentApiService.imagesRequest
  private imagesAmount = this.contentApiService.contentImagesAmount
  public amountTitle = computed(() =>
    this.imagesAmount() - 1 >= this.currentImageNumber()
      ? this.currentImageNumber()
      : `${this.currentImageNumber()} - Last Page`,
  )

  public readonly image = viewChild<ElementRef<HTMLImageElement>>('img')
  private readonly blob$ = this.contentApiService.blob$

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

    this.responsiveService.isHandset$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result) {
          this.router.navigate(['/content'])
        }
      })
  }

  public handleOnImgClick(): void {
    const max = this.imagesAmount()
    this.contentApiService.imagesRequest.update((prev) =>
      prev < max ? prev + 1 : max,
    )
  }

  public goToChapters(): void {
    this.router.navigate(['/content'])
  }

  public goToMainPage(): void {
    this.router.navigate(['/'])
  }
}
