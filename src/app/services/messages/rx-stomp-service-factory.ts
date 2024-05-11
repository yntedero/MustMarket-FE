import { RxStompService } from './rx-stomp.service'
import { CookieService } from 'ngx-cookie-service'
import { inject } from '@angular/core'

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService()
  const token = inject(CookieService).get('token')
  console.log(token)
  rxStomp.configure({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    debug: (msg: string): void => {
      console.log(new Date(), msg)
    },
  })
  rxStomp.activate()
  return rxStomp
}
