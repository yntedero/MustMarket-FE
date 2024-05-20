import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class ProfileComponent implements OnInit {
  user: any = null // Use 'any' to handle user data dynamically

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (data) => {
        this.user = data // Directly assigning data to 'user'
      },
      error: (error) => {
        console.error('Error fetching user details:', error)
        // Optional: Implement user-friendly error handling
      },
    })
  }
}
