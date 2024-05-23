import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessagesService } from '../../services/messages/messages.service'
import { MessageDto } from '../../dtos/message.dto'
import { Message } from '@stomp/stompjs'
import { RxStompService } from '../../services/messages/rx-stomp.service'
import { Subscription } from 'rxjs'
import { rxStompServiceFactory } from '../../services/messages/rx-stomp-service-factory'
import { CookieService } from 'ngx-cookie-service'
import { UserDTO } from '../../dtos/user.dto'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    NgClass,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesComponent implements OnInit, OnDestroy {
  chatRooms: { user: string; messages: MessageDto[] }[] = []
  users: UserDTO[] = []
  filteredUsers: UserDTO[] = []
  selectedChatRoom: { user: string; messages: MessageDto[] } | null = null
  message: string = ''
  user: string = ''

  constructor(
    private router: Router,
    private messageService: MessagesService,
    private rxStompService: RxStompService,
    private cookieService: CookieService
  ) {}

  //@ts-ignore
  private topicSubscription: Subscription

  ngOnInit() {
    this.getMessages()
    this.user = this.cookieService.get('user')

    this.topicSubscription = this.rxStompService
      .watch(`/user/${this.user}/topic`)
      .subscribe((message: Message) => {
        const body = JSON.parse(message.body)
        const messageDto: MessageDto = {
          fromUser: body.from,
          toUser: body.to,
          message: body.message,
          timestamp: body.timestamp,
        }
        this.processMessage(messageDto)
      })

    this.messageService.getAllUsers().subscribe((users) => {
      this.users = users.filter((user) => user.email !== this.user)
      this.filteredUsers = this.users
      console.log(this.users)
    })
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe()
  }

  getMessages() {
    this.messageService.getMessages().subscribe((messages: MessageDto[]) => {
      console.log('messages', messages)
      messages.forEach((message) => {
        this.processMessage(message)
      })
    })
  }

  onSendMessage() {
    if (!this.selectedChatRoom || !this.message.trim()) return
    const toUsername = this.selectedChatRoom.user
    const messageContent = this.message
    const fromUsername = this.user
    const timeStamp = this.generateTimestamp()

    const message = {
      to: toUsername,
      message: messageContent,
      from: fromUsername,
      timestamp: timeStamp,
    }

    this.rxStompService.publish({
      destination: '/app/chat',
      body: JSON.stringify(message),
    })

    this.message = ''
    let existingChat = this.chatRooms.find((room) => room.user === toUsername)
    if (!existingChat) {
      existingChat = { user: toUsername, messages: [] }
      this.chatRooms.push(existingChat)
    }
    this.selectedChatRoom = existingChat
  }
  selectFromList(email: string) {
    const existingChat = this.chatRooms.find((room) => room.user === email)
    if (existingChat) {
      this.selectedChatRoom = existingChat
    } else {
      this.selectedChatRoom = { user: email, messages: [] }
    }
  }

  keyword: string = ''
  onInput(event: any) {
    this.keyword = event.target.value
    this.searchFilter()
  }
  searchFilter() {
    this.filteredUsers = this.users.filter((user) =>
      user?.email?.toLowerCase().includes(this.keyword)
    )
  }

  processMessage(message: MessageDto) {
    const from = message.fromUser
    const to = message.toUser

    const isCurrentUserSender = from === this.user
    const otherUser = isCurrentUserSender ? to : from

    const chatRoomIndex = this.chatRooms.findIndex(
      (room) => room.user === otherUser
    )

    if (chatRoomIndex === -1) {
      this.chatRooms.push({ user: otherUser, messages: [message] })
    } else {
      this.chatRooms[chatRoomIndex].messages.push(message)
    }
  }
  private generateTimestamp(): string {
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
    const year = now.getFullYear().toString()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  isPopupActive: boolean = false

  togglePopup() {
    this.isPopupActive = !this.isPopupActive
  }

  hidePopup() {
    this.isPopupActive = false
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest('.searchInput') && !target.closest('.popup')) {
      this.hidePopup()
    }
  }
}
