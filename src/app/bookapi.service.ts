import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookapiService {

  url : string = "http://localhost:54701/api/Book/";

  constructor(private httpclient:HttpClient) { }
  
  GetBookList() : Observable<Book[]>{
    let books :Book[] = null;
    let urlpath = this.url + "GetBooks";    
    const httpOptions = {
      headers: new HttpHeaders({'accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'})
    };

    return this.httpclient.get<Book[]>(urlpath,httpOptions);
  }

}
