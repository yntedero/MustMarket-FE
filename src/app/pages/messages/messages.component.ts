import {Component, OnDestroy, OnInit} from '@angular/core';
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
  styleUrls: ['./messages.component.scss']
})


export class MessagesComponent implements OnInit , OnDestroy {
  toUser: string = "";
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
    });
  }

  receivedMessages: string[] = [];
  //@ts-ignore
  private topicSubscription: Subscription;


  ngOnInit() {
    this.getMessages();
    this.user = this.cookieService.get('user');

    this.topicSubscription = this.rxStompService
      .watch(`/user/${this.user}/topic`)
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    const toUsername = this.toUser;
    const messageContent = this.message;
    const fromUsername = this.user;

    const message = {
      to: toUsername,
      message: messageContent,
      from: fromUsername
    };
    this.rxStompService.publish({ destination: '/app/chat', body: JSON.stringify(message) });
  }

}
