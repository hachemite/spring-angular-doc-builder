import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // 1. Clone request to add header
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Handle the response
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // Check if the error is 403 (Forbidden) or 401 (Unauthorized)
      if (error.status === 403 || error.status === 401) {

        // If we are getting 403 on the login page itself, it's a wrong password.
        // But if we are inside the app, it means the token expired.
        if (!req.url.includes('/auth/login')) {
            console.warn('⚠️ Token expired or invalid. Logging out.');

            // Clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');

            // Redirect to login
            router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    })
  );
};
