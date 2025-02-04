import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../user.model'; // Importez votre modèle


@Component({
  selector: 'app-les-employes',
  standalone: true,
  templateUrl: './les-employes.component.html',
  styleUrls: ['./les-employes.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LesEmployesComponent implements OnInit {
  userRole: string = '';
  users: User[] = []; // Utilisez le modèle User ici
  showNewUserForm: boolean = false; // Contrôle de l'affichage du formulaire
  showupdateUserForm:boolean = false;
  newUser: User = new User(0, '', '', '', [{ id: 0, name: 'ROLE_USER' }]); // Utilisez votre modèle ici

  constructor(private authService: AuthService, private http: HttpClient, private storageService: StorageService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = this.storageService.getToken();
    this.http
      .get<User[]>('http://localhost:8080/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => {
          console.error('Failed to fetch users', error);
        },
      });
  }

  // Ajouter un utilisateur
  addUser(): void {
    const token = this.storageService.getToken();
    this.http
      .post<User>('http://localhost:8080/api/users', this.newUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (response) => {
          this.users.push(response); // Ajouter le nouvel utilisateur à la liste locale
          this.showNewUserForm = false; // Cacher le formulaire après ajout
          this.newUser = new User(0, '', '', '', [{ id: 0, name: 'ROLE_USER' }]); // Réinitialiser le formulaire
        },
        error: (error) => {
          console.error('Failed to add user', error);
        },
      });
  }

  toggleNewUserForm(): void {
    this.showNewUserForm = !this.showNewUserForm;
    this.showupdateUserForm = false; // Assurez-vous que le formulaire de modification est masqué
  }
  
  toggleUpdateUserForm(): void {
    this.showupdateUserForm = !this.showupdateUserForm;
    this.showNewUserForm = false; // Assurez-vous que le formulaire d'ajout est masqué
  }
  


  deleteUser(userId: number): void {
    const token = this.storageService.getToken();
    this.http
      .delete(`http://localhost:8080/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          // Retirer l'utilisateur supprimé de la liste locale
          this.users = this.users.filter(user => user.id !== userId);
        },
        error: (error) => {
          console.error('Failed to delete user', error);
        },
      });
  }
  
  editUser(user: User): void {
    this.newUser = { ...user }; // Charger les données de l'utilisateur
    this.showupdateUserForm = true;
   // this.showNewUserForm = false; // Masquer le formulaire d'ajout
  }
  updateUser(): void {
    const token = this.storageService.getToken();
    this.http
      .put<User>(`http://localhost:8080/api/users/${this.newUser.id}`, this.newUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (response) => {
          // Mettre à jour l'utilisateur dans la liste locale
          const index = this.users.findIndex(user => user.id === this.newUser.id);
          if (index !== -1) {
            this.users[index] = response;
          }
          this.showNewUserForm = false; // Cacher le formulaire après modification
          this.newUser = new User(0, '', '', '', [{ id: 0, name: 'ROLE_USER' }]); // Réinitialiser le formulaire
        },
        error: (error) => {
          console.error('Failed to update user', error);
        },
      });
  }
  




}
