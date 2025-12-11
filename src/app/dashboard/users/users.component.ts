import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/core/interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  // FORMULARIO EN SNAKE_CASE PARA LA API
  userForm = {
    full_name: '',
    email: '',
    age: '',
    curp: '',
    password: '',
    role_id: 1
  };

  apiErrors: { [key: string]: string } = {};

  toast = {
    show: false,
    message: '',
    type: '' as 'success' | 'error'
  };

  constructor(private userService: User) { }

  ngOnInit() {
    this.loadAdmins();
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => (this.toast.show = false), 3000);
  }

  // ABRIR MODAL
  openUserModal(user: user | null = null) {
    this.apiErrors = {};
    this.showUserModal = true;

    if (user) {
      this.selectedUser = user;
      // Mapear camelCase del API a snake_case para el formulario
      this.userForm = {
        full_name: user.fullName || '',
        email: user.email || '',
        password: '',
        age: user.age || '',
        curp: user.curp || '',
        role_id: user.roleId || 1
      };
    } else {
      this.selectedUser = null;
      this.userForm = {
        full_name: '',
        email: '',
        password: '',
        age: '',
        curp: '',
        role_id: 1
      };
    }
  }

  // CERRAR MODAL
  closeUserModal() {
    this.showUserModal = false;
  }

  // GUARDAR
  saveUser() {
    this.apiErrors = {};

    // Payload en snake_case para la API
    const payload: any = {
      full_name: this.userForm.full_name,
      email: this.userForm.email,
      age: this.userForm.age,
      curp: this.userForm.curp,
      role_id: this.userForm.role_id
    };

    if (this.userForm.password) {
      payload.password = this.userForm.password;
    }

    if (this.selectedUser) {
      // ACTUALIZAR
      this.userService.updateUser(this.selectedUser.id, payload).subscribe({
        next: () => {
          this.showToast("Usuario actualizado correctamente", "success");
          this.closeUserModal();
          this.loadAdmins();
        },
        error: (err) => {
          console.error("❌ ERROR UPDATE:", err);
          this.apiErrors = err.error?.errors || {};
        }
      });
    } else {
      // CREAR
      this.userService.createAdmin(payload).subscribe({
        next: () => {
          this.showToast("Usuario creado correctamente", "success");
          this.closeUserModal();
          this.loadAdmins();
        },
        error: (err) => {
          console.error("❌ ERROR CREATE:", err);
          this.apiErrors = err.error?.errors || {};
          this.showToast("Error al crear usuario", "error");
        }
      });
    }
  }

  // CARGAR LISTA
  loadAdmins() {
    this.userService.getAdmins().subscribe({
      next: (res: any[]) => {
        // Mapear la respuesta del backend a nuestro tipo TS
        this.users = res.map(u => ({
          id: u.id,
          fullName: u.fullName,  // <-- ya viene de la API
          email: u.email,
          age: u.age,
          curp: u.curp,
          roleId: u.roleId
        }));
      },
      error: () => this.showToast('Error al cargar usuarios', 'error')
    });
  }

  // ELIMINAR
  deleteUser(u: user) {
    if (!confirm(`¿Eliminar usuario ${u.fullName}?`)) return;
    this.userService.deleteUser(u.id).subscribe({
      next: () => {
        this.loadAdmins();
        this.showToast("Usuario eliminado correctamente", "success");
      },
      error: () => this.showToast("Error al eliminar usuario", "error")
    });
  }
}
