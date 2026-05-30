import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { UserData, UserStatus } from '../../../../core/types/user-types/user-data.types';

@Component({
  selector: 'profile-overview',
  imports: [
    ReactiveFormsModule, 
    NgOptimizedImage, 
    CommonModule
  ],
  templateUrl: './profile-overview.html',
  styleUrl: './profile-overview.css',
})
export class ProfileOverview {
  public readonly user = input< UserData | null >(null);
  public readonly userStatus = input< UserStatus | null >(null);
}
