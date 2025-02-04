import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service'; // Import AuthService
import { StorageService } from './services/storage.service'; // Import StorageService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  userName: string = 'baha';
  userEmail: string = 'baha@gmail.com';
  title = 'gestion_conge_stage2';
  isNotificationPage = false;
  isDropdownVisible = false;
 
  constructor(
    private router: Router,
    private authService: AuthService, // Inject AuthService
    private storageService: StorageService // Inject StorageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNotificationPage = this.router.url === '/login';
      }
    });
  }
  loadUserData() {
    const user = this.authService.getUserData();
    if (user) {
      this.userName = user.username; // Supposons que le backend renvoie un champ 'name'
      this.userEmail = user.email; // Supposons que le backend renvoie un champ 'email'
    }
  }

  // Toggle dropdown
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Logout method
  logout(): void {
    // Call the logout API to expire the token on the backend
    this.authService.logout().subscribe({
      next: () => {
        // Clear the session storage (token and user data)
        this.storageService.clear();

        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Logout failed', error);
        alert('Logout failed. Please try again.');
      },
    });
  }
}
