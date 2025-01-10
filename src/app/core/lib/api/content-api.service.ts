import { computed, inject, Injectable } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService, type Content, type ContentBook } from '@azra/core'
import { map } from 'rxjs'

import { contentUrl, countComicsAmount } from './api-utils'

@Injectable({
  providedIn: 'root',
})
export class ContentApiService {
  private readonly apiService = inject(ApiService)

  private contentResource = rxResource({
    loader: () =>
      this.apiService
        .get<Content>(contentUrl)
        .pipe(map((req) => req.data[0].books.book)),
  })

  public readonly isContentLoading = computed(() =>
    this.contentResource.isLoading(),
  )
  public readonly contentError = computed(() => this.contentResource.error())
  public readonly contentBooks = computed(
    () => this.contentResource.value() ?? ([] as ContentBook[]),
  )
  public readonly contentImagesAmount = computed(() => {
    const amount = this.contentBooks()

    return countComicsAmount<ContentBook[]>(amount)
  })
}
