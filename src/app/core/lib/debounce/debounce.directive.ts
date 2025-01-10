import {
  DestroyRef,
  Directive,
  HostListener,
  inject,
  input,
  type OnInit,
  output,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, Subject } from 'rxjs'

@Directive({
  selector: '[azraDebounce]',
  standalone: true,
})
export class DebounceDirective implements OnInit {
  public readonly debounceTime = input.required<number>()
  public readonly debounceClick = output<Event>()
  private readonly clicks = new Subject<Event>()
  private readonly destroyRef = inject(DestroyRef)

  public ngOnInit(): void {
    this.clicks
      .pipe(
        debounceTime(this.debounceTime()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => this.debounceClick.emit(e))
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.clicks.next(event)
  }
}
