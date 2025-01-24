import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ContentApiService, DebounceDirective } from '@azra/core'

@Component({
  selector: 'azra-arrow-right',
  imports: [DebounceDirective],
  template: `
    <button
      (debounceClick)="onNextSlideClick()"
      azraDebounce
      [debounceTime]="200"
    >
      <img
        src="assets/images/arrow-right.png"
        alt="arrow_right"
        width="40"
        height="10"
      />
    </button>
  `,
  styles: `
    :host {
      @apply self-center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowRightComponent {
  private readonly contentApiService = inject(ContentApiService)
  private imagesAmount = this.contentApiService.contentImagesAmount

  public onNextSlideClick(): void {
    this.contentApiService.imagesRequest.update((prev) => {
      const max = this.imagesAmount()

      if (prev < 1) return 1

      return prev < max ? prev + 1 : max
    })
  }
}
