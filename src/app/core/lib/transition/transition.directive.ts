import { Directive, ElementRef, inject, Renderer2 } from '@angular/core'

@Directive({
  selector: '[azraTransition]',
  standalone: true,
})
export class TransitionDirective {
  private readonly render = inject(Renderer2)
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef)

  constructor() {
    this.render.setAttribute(
      this.elementRef.nativeElement,
      'class',
      'transition duration-300 cursor-pointer hover:text-beige',
    )
  }
}
