import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgClass, NgFor, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";
import {MessagesService} from "../../services/messages/messages.service"
import {MessageDto} from "../../dtos/message.dto";
import {Message} from "@stomp/stompjs";
import {RxStompService} from "../../services/messages/rx-stomp.service";
import {Subscription} from "rxjs";
import {rxStompServiceFactory} from "../../services/messages/rx-stomp-service-factory";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  standalone:true,
  imports: [
    NgFor, FormsModule, NgIf, NgClass,
    CommonModule, FormsModule
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    }
  ],
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class MessagesComponent implements OnInit , OnDestroy {
  chatRooms: { user: string, messages: MessageDto[] }[] = [];
  selectedChatRoom: { user: string, messages: MessageDto[] } | null = null;
  message: string = "";
  user: string = "";

  constructor(
    private router: Router,
    private messageService: MessagesService,
    private rxStompService: RxStompService,
    private cookieService: CookieService
  ) {
  }


  getMessages() {
    this.messageService.getMessages().subscribe((messages: MessageDto[]) => {
      console.log("messages", messages);
      messages.forEach(message => {
        this.processMessage(message);

      });

    });
  }
  //@ts-ignore
  private topicSubscription: Subscription;


  ngOnInit() {
    this.getMessages();
    this.user = this.cookieService.get('user');

    this.topicSubscription = this.rxStompService
      .watch(`/user/${this.user}/topic`)
      .subscribe((message: Message) => {
        const body = JSON.parse(message.body);
        const messageDto: MessageDto = {
          fromUser: body.from,
          toUser: body.to,
          message: body.message
        };
        this.processMessage(messageDto);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    if (!this.selectedChatRoom || !this.message.trim()) return;
    const toUsername = this.selectedChatRoom.user;
    const messageContent = this.message;
    const fromUsername = this.user;

    const message = {
      to: toUsername,
      message: messageContent,
      from: fromUsername
    };
    this.rxStompService.publish({ destination: '/app/chat', body: JSON.stringify(message) });
    this.message = "";
  }

  selectChatRoom(chatRoom: { user: string, messages: MessageDto[] }) {
    this.selectedChatRoom = chatRoom;
  }

  processMessage(message: MessageDto) {
    const from = message.fromUser;
    const to = message.toUser;

    const isCurrentUserSender = from === this.user;
    const otherUser = isCurrentUserSender ? to : from;

    const chatRoomIndex = this.chatRooms.findIndex(room => room.user === otherUser);

    if (chatRoomIndex === -1) {
      // If the chat room doesn't exist, create a new one and push the message
      this.chatRooms.push({ user: otherUser, messages: [message] });
    } else {
      // If the chat room already exists, push the message to its messages array
      this.chatRooms[chatRoomIndex].messages.push(message);
    }
  }
}
