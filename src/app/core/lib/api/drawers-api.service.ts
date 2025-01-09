import { computed, inject, Injectable, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService, type DrawersResource, type DrawersSlug } from '@azra/core'
import { map } from 'rxjs'

@Injectable()
export class DrawersApiService {
  private readonly apiService = inject(ApiService)
  public slug = signal<DrawersSlug | undefined>(undefined)

  private readonly drawersResource = rxResource({
    request: () => this.slug(),
    loader: ({ request }) =>
      this.apiService
        .get<{ data: DrawersResource[] }>(request)
        .pipe(map(({ data }) => data[0])),
  })

  public drawersError = computed(() => this.drawersResource.error())
  public drawersLoading = computed(() => this.drawersResource.isLoading())
  public drawersValue = computed(
    () => this.drawersResource.value() ?? ({} satisfies DrawersResource),
  )
}
