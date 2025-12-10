import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/core/interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { responseMessage } from 'src/app/core/interfaces/responseMessage';
import { User } from 'src/app/core/services/user/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [FormsModule, CommonModule],
})
export class UsersComponent implements OnInit {

  users: user[] = [];
  selectedUser: user | null = null;
  showUserModal = false;

  userForm: Partial<user> = {
    fullName: '',
    email: '',
    curp: '',
    roleId: 1,
  };

  constructor(private userService: User) { }

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.userService.getAdmins().subscribe({
      next: (res: user[]) => this.users = res,
      error: (err: any) => console.error('Error fetching admins', err)
    });
  }

  openUserModal(u?: user) {
    if (u) {
      this.selectedUser = u;
      this.userForm = { ...u };
    } else {
      this.selectedUser = null;
      this.userForm = { fullName: '', email: '', curp: '', roleId: 1 };
    }
    this.showUserModal = true;
  }

  closeUserModal() {
    this.showUserModal = false;
  }

  saveUser() {
    if (this.selectedUser) {
      // Editar usuario
      this.userService.updateUser(this.selectedUser.id!, this.userForm).subscribe({
        next: (res: responseMessage) => {
          if (this.selectedUser) {
            Object.assign(this.selectedUser, this.userForm);
          }
          this.closeUserModal();
        },
        error: (err: any) => console.error('Error updating user', err)
      });
    } else {
      // Crear admin
      this.userService.createAdmin(this.userForm).subscribe({
        next: (res: responseMessage) => {
          this.loadAdmins();
          this.closeUserModal();
        },
        error: (err: any) => console.error('Error creating admin', err)
      });
    }
  }

  deleteUser(u: user) {
    if (!confirm(`¿Eliminar usuario ${u.fullName}?`)) return;
    this.userService.deleteUser(u.id!).subscribe({
      next: (res: responseMessage) => this.loadAdmins(),
      error: (err: any) => console.error('Error deleting user', err)
    });
  }
}
