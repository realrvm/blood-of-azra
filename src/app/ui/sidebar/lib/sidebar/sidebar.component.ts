import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  //effect,
  inject,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { ContentApiService, ResponsiveService } from '@azra/core'
import { SeparatorIconComponent } from '@azra/icons'
import { InputNumber } from 'primeng/inputnumber'

@Component({
  selector: 'azra-sidebar',
  imports: [
    SeparatorIconComponent,
    RouterLink,
    InputNumber,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [ResponsiveService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly contentApiService = inject(ContentApiService)
  private readonly responsiveService = inject(ResponsiveService)
  private readonly router = inject(Router)

  public readonly isHandset$ = this.responsiveService.isHandset$
  private readonly isHandset = toSignal(this.isHandset$, {
    initialValue: false,
  })

  public readonly currentPage = this.contentApiService.imagesRequest

  public readonly contents = this.contentApiService.contentData
  public readonly maxAmount = this.contentApiService.contentImagesAmount

  public pageId: number | null = null

  public onChapterClick(title: string): void {
    this.contentApiService.findComicByChapterClick(title)

    if (this.isHandset()) {
      this.router.navigate(['/handset'])
    }
  }

  public toLastViewedPage(): void {
    this.contentApiService.toLastViewedPage()
    this.router.navigate(['/handset'])
  }

  public onJumpToPage(): void {
    if (this.pageId === null || this.pageId < 1) {
      this.contentApiService.toPage(1)
    } else {
      this.contentApiService.toPage(this.pageId)
    }

    if (this.isHandset()) {
      this.router.navigate(['/handset'])
    }

    this.pageId = null
  }

  public onPressJumpToPage(e: KeyboardEvent): void {
    if (e.key !== 'Enter') return

    this.onJumpToPage()
  }
}
