import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private authService = inject(AuthService);
  private supabase = this.authService.supabase;

  public async checkEmail(email: string): Promise<boolean> {
    if (!email) return false;
  
    const { data: isTaken, error } = await this.supabase
      .rpc('check_if_email_exists', { email_input: email });
  
    if (error) {
      console.error('RPC Error:', error);
      return false;
    }
  
    if (isTaken) return true;
    
    return false; 
  };

  public async checkNumber(number: string): Promise<boolean> { 
    if (!number) return false;
  
    const { data: isTaken, error } = await this.supabase
      .rpc('check_if_number_exists', { number_input: number });
  
    if (error) {
      console.error('RPC Error:', error);
      return false;
    }
  
    if (isTaken) return true;
  
    return false;
  };

  
}
