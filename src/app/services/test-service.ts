import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TestService {
  private apiurl = "https://jsonplaceholder.typicode.com/postsgg";
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiurl)
    // .pipe(catchError(this.handleError));
  }

  // handleError(err){
  //   if(err instanceof HttpErrorResponse){
  //     // Serverside error
  //   } else {
  //     // this is client side error
  //   }
  //   return throwError(err);
  // }
}
