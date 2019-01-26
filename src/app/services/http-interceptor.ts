import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as Sentry from "@sentry/browser";

export class HttpIntercept implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          // server-side error
          Sentry.captureException(error);
          return throwError(error);
        } else {
          // client-side error
          return throwError(error);
        }
      })
    );
  }
}
