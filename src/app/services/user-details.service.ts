import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersData } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  
  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  fetchAllUserDetails(pageNumber: number): Observable<UsersData> {
    return this.http.get<UsersData>(`${this.baseUrl}?page=${pageNumber}`);
  }

  fetchUserDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
