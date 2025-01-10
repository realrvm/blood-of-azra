import { BreakpointObserver } from '@angular/cdk/layout'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, shareReplay } from 'rxjs'

@Injectable()
export class ResponsiveService {
  private readonly breakpointObserver = inject(BreakpointObserver)

  public readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1070px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    )
}
