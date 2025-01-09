import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
  type ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideServiceWorker } from '@angular/service-worker'
import { API_URL, errorHandlerInterceptor, preset } from '@azra/core'
import { environment } from '@azra/env/environment'
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
        preset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    { provide: API_URL, useValue: environment.api_url },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}
