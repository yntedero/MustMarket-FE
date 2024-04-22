import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MessageDto} from "../../dtos/message.dto";
@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  constructor(private http: HttpClient) { }

  getMessages(senderId?: number, receiverId?: number): Observable<MessageDto[]> {
    let url = `http://localhost:8080/messages/${senderId}/${receiverId}`;
    return this.http.get<MessageDto[]>(url, { withCredentials: true });
  }
}
