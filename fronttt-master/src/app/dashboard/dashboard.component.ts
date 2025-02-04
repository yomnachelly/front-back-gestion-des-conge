import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

interface LeaveBalance {
  id: number;
  userId: number;
  congeRepos: number;
  congeMaladie: number;
  initialDate: string; // Assuming this is a string in ISO format
}

interface DemandStats {
  accepted: number;
  rejected: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: number = 1; // Should be dynamic, perhaps from StorageService?
  userRole: string = ''; // User role (director/employee)
  leaveBalance: LeaveBalance = { id: 0, userId: 0, congeRepos: 0, congeMaladie: 0, initialDate: '' };
  demandStats: DemandStats = { accepted: 0, rejected: 0 };

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole() || 'employee'; // Default role if none found
    this.fetchLeaveBalance();
    this.fetchDemandStatistics();
  }

  private getToken(): string | null {
    return this.storageService.getToken();
  }

  private fetchLeaveBalance() {
    const token = this.getToken();
    if (!token) {
      console.error('No token found. User must be authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<LeaveBalance>(`http://localhost:8080/api/solde-conge/user/${this.userId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching leave balance:', error);
          if (error.status === 401) {
            console.error('Unauthorized - Invalid or expired JWT token.');
          }
          return throwError(() => new Error('Error fetching leave balance'));
        })
      )
      .subscribe(response => {
        this.leaveBalance = response;
      });
  }

  private fetchDemandStatistics() {
    const token = this.getToken();
    if (!token) {
      console.error('No token found. User must be authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<DemandStats>(`http://localhost:8080/api/demandes/user/${this.userId}/stats`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching demand statistics:', error);
          if (error.status === 401) {
            console.error('Unauthorized - Invalid or expired JWT token.');
          }
          return throwError(() => new Error('Error fetching demand statistics'));
        })
      )
      .subscribe(response => {
        this.demandStats = response;
      });
  }
}