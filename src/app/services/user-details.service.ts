import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  
  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  fetchAllUserDetails(pageNumber: number): Observable<any> {
    return this.http.get(`${this.baseUrl+'?page=${pageNumber'}`);
  }

  fetchUserDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
