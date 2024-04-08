import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAuthenticatedUserId(): number {
    return 1; 
  }
}
