import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ContentApiService, DebounceDirective } from '@azra/core'

@Component({
  selector: 'azra-arrow-left',
  imports: [DebounceDirective],
  template: `
    <button
      (debounceClick)="onPrevSlideClick()"
      azraDebounce
      [debounceTime]="200"
    >
      <img
        src="assets/images/arrow-left.png"
        alt="arrow_left"
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
export class ArrowLeftComponent {
  private readonly contentApiService = inject(ContentApiService)

  public onPrevSlideClick(): void {
    this.contentApiService.imagesRequest.update((prev) =>
      prev <= 1 ? 1 : prev - 1,
    )
  }
}
