import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

var pendingRequests = 0; // Counter to keep track of pending HTTP requests

// Injectable class to intercept HTTP requests for showing loading indicators
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  // Intercept method to handle HTTP requests and responses
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // if (!(request.body instanceof FormData)) {
    //   this.loadingService.showLoading();
    //   pendingRequests++;
    // }

    // Show loading indicator for all requests
    this.loadingService.showLoading();
    pendingRequests++;

    // Continue handling the HTTP request and response
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          // Handle loading indicator when a response is received
          if (event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading(); // Handle loading indicator in case of an error
        }
      })
    );
  }

  handleHideLoading() {
    pendingRequests--;
    if (pendingRequests === 0) {  // Hide loading indicator when there are no pending requests
      this.loadingService.hideLoading();
    }
  }
}
