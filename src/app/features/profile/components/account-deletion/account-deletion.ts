import { Component, signal, output, input } from '@angular/core';

@Component({
  selector: 'account-deletion',
  imports: [],
  templateUrl: './account-deletion.html',
  styleUrl: './account-deletion.css',
})
export class AccountDeletion {
  public readonly pending = input<boolean>(false);
  public readonly canDelete = output();
  
  public readonly inputValue = signal('');
}
