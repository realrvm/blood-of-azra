import { computed, inject, Injectable, signal } from '@angular/core'
import { rxResource, toObservable } from '@angular/core/rxjs-interop'
import {
  ApiService,
  type AzraImage,
  type CachedImage,
  type ChaptersTitleAndId,
  type Content,
  type ContentBook,
  LocalStorageService,
} from '@azra/core'
import {
  BehaviorSubject,
  combineLatest,
  filter,
  from,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs'

import {
  contentUrl,
  countImagesAmount,
  createContentStruct,
  getChaptersTitleAndIds,
} from './api-utils'

@Injectable()
export class ContentApiService {
  private readonly apiService = inject(ApiService)
  private readonly localStorageService = inject(LocalStorageService)
  private readonly localStorageValue = this.localStorageService.get(
    'azraLastImage',
  ) as string

  public imagesRequest = signal<number>(Number(this.localStorageValue) || 1)
  private imagesListSubject = new Subject<AzraImage[]>()

  private ids = new Set<number>()
  private cachedImages: CachedImage[] = []
  private titlesAndIds: ChaptersTitleAndId[] = []
  private maxAmount = new BehaviorSubject<number>(0)

  private contentResource = rxResource({
    loader: () =>
      this.apiService.get<Content>(contentUrl).pipe(
        map((req) => req.data[0].books.book),
        tap((data) => {
          this.imagesListSubject.next(createContentStruct(data))
          this.titlesAndIds = [...getChaptersTitleAndIds(data[0].chapters)]
          const max = countImagesAmount(data)
          this.maxAmount.next(max)
          if (
            Number(this.localStorageValue) > max ||
            Number(this.localStorageValue) < 1 ||
            !Number(this.localStorageValue)
          ) {
            this.localStorageService.set('azraLastImage', max)
          }
        }),
      ),
  })

  private readonly imagesRequest$ = toObservable(this.imagesRequest)

  public readonly blob$ = combineLatest(
    this.imagesListSubject,
    this.imagesRequest$,
    this.maxAmount,
  ).pipe(
    filter((response) => Boolean(response[0].length && response[2])),
    switchMap(([content, id]) => {
      this.ids.clear()
      this.getRange(id).forEach(this.ids.add, this.ids)

      const filteredCachedImages = this.cachedImages.filter((img) =>
        this.ids.has(img.id),
      )

      this.cachedImages = filteredCachedImages
      const blobIndex = this.cachedImages.findIndex((img) => img.id === id)

      if (blobIndex > -1) {
        return from(this.getRange(id)).pipe(
          mergeMap((ids) => {
            const currentBlobIndex = this.cachedImages.findIndex(
              (img) => img.id === ids,
            )

            if (currentBlobIndex === -1) {
              const azra = content.find(
                (comic) => comic.id === ids,
              ) as AzraImage
              if (azra) {
                this.apiService
                  .get<Blob>(azra.url, 'blob')
                  .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
                  .subscribe()
              }
            }

            const image = this.cachedImages[blobIndex]
            this.localStorageService.set('azraLastImage', image?.id)
            return of(image?.blob)
          }),
        )
      }

      return from(this.getRange(id)).pipe(
        mergeMap((ids) =>
          of(ids).pipe(
            switchMap(() => {
              const azra = content.find(
                (comic) => comic.id === ids,
              ) as AzraImage

              return this.apiService.get<Blob>(azra?.url, 'blob')
            }),
            tap((blob) => {
              this.cachedImages.push({ id: ids, blob })
            }),
            map(() => {
              const blobObj = this.cachedImages.find((img) => img.id === id)
              return blobObj?.blob
            }),
          ),
        ),
      )
    }),
  )

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

  public findComicByChapterClick(title: string): void {
    const contentAzra = this.titlesAndIds.find((item) => item.title === title)

    if (contentAzra) {
      this.localStorageService.set('azraLastImage', contentAzra.imgId)

      this.imagesRequest.set(contentAzra.imgId)
    }
  }

  public toLastViewedPage(): void {
    const lastImage = Number(this.localStorageValue) || 1

    this.imagesRequest.set(lastImage)
  }

  public toPage(pageId: number): void {
    this.localStorageService.set('azraLastImage', pageId)

    this.imagesRequest.set(pageId)
  }

  private checkAndCacheImage(id: number, blob: Blob) {
    if (this.ids.has(id)) {
      this.cachedImages.push({ id, blob })
    }
  }

  private getRange(id = 1): number[] {
    const max = this.maxAmount.getValue()

    if (id > 1 && max - id >= 3) return [id - 1, id, id + 1, id + 2]

    if (id > 1 && max - id < 3) return [max - 3, max - 2, max - 1, max]

    return [3, 2, 1]
  }
}
