import { inject, Injectable } from '@angular/core'
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { MessageDto } from '../../dtos/message.dto'
import { UserDTO } from '../../dtos/user.dto'
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageDto[]> {
    let url = `http://localhost:8080/messages`
    return this.http.get<MessageDto[]>(url, { withCredentials: true })
  }
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>('http://localhost:8080/api/users')
  }
}
