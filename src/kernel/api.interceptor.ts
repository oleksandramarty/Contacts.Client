import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";

export const HTTP_METHODS = {
    GET: 'GET',
    HEAD: 'HEAD',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    CONNECT: 'CONNECT',
    OPTIONS: 'OPTIONS',
    TRACE: 'TRACE',
};

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    private sso_req = null;

    constructor(
        private router: Router) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorCustomResponse) => {
                if (typeof error === 'string') {
                    error = JSON.parse(error);
                }
                return throwError(error);
            })
        );
    }
}

export declare class HttpErrorCustomResponse extends HttpErrorResponse {
    fields: any;
}
