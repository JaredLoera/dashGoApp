import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/core/interfaces/user';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterLink, RouterOutlet],

})
export class LayoutComponent implements OnInit {

  userProfile: user | null = null;
  constructor() { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userProfile = JSON.parse(userData);
    }
  }

}
