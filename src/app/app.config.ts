import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
  type ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { API_URL, errorHandlerInterceptor } from '@azra/core'
import { environment } from '@azra/env/environment'
// eslint-disable-next-line
import Aura from '@primeng/themes/aura'
import { providePrimeNG } from 'primeng/config'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    { provide: API_URL, useValue: environment.api_url },
  ],
}
