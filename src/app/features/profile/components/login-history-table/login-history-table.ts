import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-history-table',
  imports: [CommonModule],
  templateUrl: './login-history-table.html',
  styleUrl: './login-history-table.css',
})
export class LoginHistoryTable {

  private authService = inject(AuthService);
  public loginHistory = this.authService.loginHistory;

}
