import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../../../../core/services/security-service/security-service';

@Component({
  selector: 'login-history-table',
  imports: [CommonModule],
  templateUrl: './login-history-table.html',
  styleUrl: './login-history-table.css',
})
export class LoginHistoryTable {

  private securityService = inject(SecurityService);
  public loginHistory = this.securityService.loginHistory;

}
