import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms' // Ensure the path is correct

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule],
})
export class ProfileComponent implements OnInit {
  user: any = null // Consider replacing 'any' with a specific type
  currentPassword: string = ''
  newPassword: string = ''

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (data) => (this.user = data),
      error: (error) => console.error('Error fetching user details:', error),
    })
  }
}
