import { computed, inject, Injectable, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import {
  ApiService,
  type CachedImage,
  type Content,
  type ContentBook,
  LocalStorageService,
} from '@azra/core'
import { from, map, mergeMap, of, switchMap } from 'rxjs'

import { contentUrl, countImagesAmount, getRange } from './api-utils'

@Injectable({
  providedIn: 'root',
})
export class ContentApiService {
  private readonly apiService = inject(ApiService)
  private readonly localStorageService = inject(LocalStorageService)
  private readonly localStorageValue = this.localStorageService.get(
    'azraLastImage',
  ) as string

  public imagesRequest = signal<number>(Number(this.localStorageValue) || 1)

  private ids: number[] = []
  private cachedImages: CachedImage[] = []

  private contentResource = rxResource({
    loader: () =>
      this.apiService
        .get<Content>(contentUrl)
        .pipe(map((req) => req.data[0].books.book)),
  })

  private blobResource = rxResource({
    request: this.imagesRequest,
    loader: ({ request }) => {
      const imgId = this.cachedImages.findIndex((img) => img.id === request)

      if (imgId > -1) {
        return of(new Blob())
      }

      return from(getRange(request)).pipe(
        mergeMap((indexes) =>
          of(indexes).pipe(
            switchMap(() => {
              const url = '/uploads/dog_8b5c5b3c81.jpg'
              return this.apiService.get<Blob>(url, 'blob')
            }),
          ),
        ),
      )
    },
  })

  public blob = computed(() => this.blobResource.value())
  public isBlobLoading = computed(() => this.blobResource.isLoading())
  public isBlobError = computed(() => this.blobResource.error())

  public readonly isContentLoading = computed(() =>
    this.contentResource.isLoading(),
  )
  public readonly contentError = computed(() => this.contentResource.error())
  public readonly contentData = computed(
    () => this.contentResource.value() ?? ([] as ContentBook[]),
  )
  public readonly contentImagesAmount = computed(() => {
    const amount = this.contentData()

    return countImagesAmount<ContentBook[]>(amount)
  })
}
