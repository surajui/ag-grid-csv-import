import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeSericeService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:3000/posts';

  public getData() {
    return this.http.get(this.baseUrl);
  }
  
}
