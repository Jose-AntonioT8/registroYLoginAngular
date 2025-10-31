import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private auth:AuthService,
    private Routes:Router
  ){

  };
  onSubmit(){
    alert('Cerrando sesión');
    this.auth.logout();
    this.Routes.navigate(['/login']);
  };
}
