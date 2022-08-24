import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getListUsers() {
    return this.http.get<any[]>('https://fakestoreapi.com/users');
  }
}
