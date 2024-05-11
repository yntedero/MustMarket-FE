import { Component, DestroyRef, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private readonly dstRef = inject(DestroyRef)
  private readonly auth = inject(AuthService)

  logout(): void {
    this.auth.logout().pipe(takeUntilDestroyed(this.dstRef)).subscribe()
  }

  isUserAuthorized(): boolean {
    return this.auth.isUserAuthorized()
  }
}
