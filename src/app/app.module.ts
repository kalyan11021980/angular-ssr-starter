import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import * as Sentry from "@sentry/browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercept } from './services/http-interceptor';

// Init sentry with your dsn key
Sentry.init({
  dsn: 'https://0ca2d1f087d445a9982df72dab4f9b17@sentry.io/1380120'
});

// setup custom config to capture details about user
Sentry.configureScope((scope) =>{
  scope.setUser({'email' :'kalyan11021980@gmail.com'});
})

@Injectable()
// pass angular inbuilt errorhandler to sentry 
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule
  ],
  // pass angular inbuilt errorhandler to sentry 
  providers: [
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
