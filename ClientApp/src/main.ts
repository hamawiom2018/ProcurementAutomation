import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
