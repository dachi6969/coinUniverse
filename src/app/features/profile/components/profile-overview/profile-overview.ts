import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-services/auth-service';

@Component({
  selector: 'profile-overview',
  imports: [ReactiveFormsModule, NgOptimizedImage, CommonModule],
  templateUrl: './profile-overview.html',
  styleUrl: './profile-overview.css',
})
export class ProfileOverview {

  private authService = inject(AuthService);
  public user = this.authService.userData;
  public userStatus = this.authService.userStatusData;

}
