import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class RestService {

  private _token: string;

  private tokenSubject: Subject<string>;

  observableToken: Observable<string>;

  constructor(private http: Http, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.tokenSubject = new Subject<string>();
    this.observableToken = this.tokenSubject.asObservable();
  }

  private buildOptions(request: any): RequestOptions {
    let headers = this.buildHeaders(request);
    let options = new RequestOptions({
      headers: headers,
      search: request.search
    });
    return options;
  }

  private buildHeaders(request: any): Headers {
    let headers = new Headers();
    let headerArray = [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' }
    ];
    if (request.authorize) {
      headerArray = headerArray.concat({
        key: "Authorization",
        value: this.token
      });
    }
    if (request.headers) {
      headerArray = headerArray.concat(request.headers);
    }
    headerArray.forEach((header) => {
      headers.append(header.key, header.value);
    });
    return headers;
  }

  private retry(request: any, error: any): boolean {
    // TODO: improve conditional for expired token
    return (error._body === 'Token is expired!') && request.authorize;
  }

  private refresh(): Observable<boolean> {
    return Observable.create(observer => {
      this.get({
        url: this.config.AUTH.REFRESH,
        authorize: true
      }).subscribe(response => {
        if (response.token) {
          this.token = response.token;
          observer.next(true);
        }
        else {
          observer.next(false);
        }
        observer.complete();
      }, (error) => {
        console.error('Error: ', error);
      });
    });
  }

  private processError(error: any): Observable<any> {
    console.error('Error: ', error);
    return Observable.throw(error);
  }

  get(request: any): Observable<any> {
    return this.http.get(request.url, this.buildOptions(request)).map(response => {
      return response.json();
    }).catch(error => {
      if (this.retry(request, error)) {
        return this.refresh().flatMap((success: boolean) => {
          if (success) {
            return this.get(request);
          }
          else {
            return this.processError(error);
          }
        });
      }
      return this.processError(error);
    });
  }

  post(request: any): Observable<any> {
    let body = JSON.stringify(request.data);
    return this.http.post(request.url, body, this.buildOptions(request)).map(response => {
      return response.json();
    }).catch(error => {
      if (this.retry(request, error)) {
        return this.refresh().flatMap((success: boolean) => {
          if (success) {
            return this.post(request);
          }
          else {
            return this.processError(error);
          }
        });
      }
      return this.processError(error);
    });
  }

  put(request: any): Observable<any> {
    let body = JSON.stringify(request.data);
    return this.http.put(request.url, body, this.buildOptions(request)).map(response => {
      return response.json();
    }).catch(error => {
      if (this.retry(request, error)) {
        return this.refresh().flatMap((success: boolean) => {
          if (success) {
            return this.put(request);
          }
          else {
            return this.processError(error);
          }
        });
      }
      return this.processError(error);
    });
  }

  delete(request: any): Observable<any> {
    return this.http.delete(request.url, this.buildOptions(request)).map(response => {
      return response.json();
    }).catch(error => {
      if (this.retry(request, error)) {
        return this.refresh().flatMap((success: boolean) => {
          if (success) {
            return this.delete(request);
          }
          else {
            return this.processError(error);
          }
        });
      }
      return this.processError(error);
    });
  }

  upload(request: any, file: any, token: string): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      formData.append("uploads[]", file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', request.url, true);
      request.headers.forEach((header) => {
        xhr.setRequestHeader(header.key, header.value);
      });
      xhr.send(formData);
    });
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    this.tokenSubject.next(this.token);
  }

}
