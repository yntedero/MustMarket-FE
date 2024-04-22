import {Component, OnInit} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";
import {MessagesService} from "../../services/messages/messages.service"
import {MessageDto} from "../../dtos/message.dto";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, NgClass],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})


export class MessagesComponent implements OnInit{
   messages: MessageDto[] = [
  //   { id: 1, name: 'User 1', messages: [{ text: 'Message 1', senderId: 1 }, { text: 'Message 2', senderId: 1 }] },
  //   { id: 2, name: 'User 2', messages: [{ text: 'Message 3', senderId: 2 }, { text: 'Message 4', senderId: 2 }] },
   ];


  constructor(
    private router: Router,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.getMessages(1,3);
  }

  getMessages(senderId?: number, receiverId?: number) {
    this.messageService.getMessages(senderId, receiverId).subscribe((messages: MessageDto[]) => {
      console.log("messages", messages);
      if (messages.length > 0) {
        this.messages = messages;
      }
    });
  }

}
