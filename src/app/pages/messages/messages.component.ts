import {Component} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";


interface User {
  id: number;
  name: string;
  messages: Message[];
}

interface Message {
  text: string;
  senderId: number;
}
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, NgClass],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  users: User[] = [
    { id: 1, name: 'User 1', messages: [{ text: 'Message 1', senderId: 1 }, { text: 'Message 2', senderId: 1 }] },
    { id: 2, name: 'User 2', messages: [{ text: 'Message 3', senderId: 2 }, { text: 'Message 4', senderId: 2 }] },
  ];

  currentUser: User = { id: 3, name: 'User 3', messages: [] };
  selectedUser: User | undefined;
  newMessage: string = '';

  onSelectUser(user: User) {
    this.selectedUser = user;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      if (this.selectedUser) {
        this.selectedUser.messages.push({ text: this.newMessage, senderId: this.currentUser.id });
      }
      this.newMessage = '';
    }
  }
}
