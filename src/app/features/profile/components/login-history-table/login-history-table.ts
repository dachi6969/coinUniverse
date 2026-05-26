import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionType } from '../../../../core/types/auth-types';

@Component({
  selector: 'login-history-table',
  imports: [CommonModule],
  templateUrl: './login-history-table.html',
  styleUrl: './login-history-table.css',
})
export class LoginHistoryTable {
  public readonly history = input<SessionType[] | null>([]);
}
