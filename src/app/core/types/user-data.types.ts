export interface UserData {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    number: string;
    password: string; 
    balance: number;
    created_at?: string; 
    email_verified?: boolean;
    phone_verified?: boolean;
}


export interface CreateUserDTO {
    firstname: string;
    lastname: string;
    email: string;
    number: string;
    password: string;
    confirm?: string;
}

export interface UserStatus {
    id: string;
    aud: string; // "authenticated"
    role: string; // "authenticated"
  
    email: string;
    phone: string;
  
    is_anonymous: boolean;
  
    created_at: string; // ISO date
    updated_at: string; // ISO date
    confirmed_at: string | null; // ISO date or null
    email_confirmed_at: string | null; // ISO date or null
    last_sign_in_at: string | null; // ISO date or null
  
    identities: Identity[];
  }
  
  export interface Identity {
    id?: string;
    user_id?: string;
    identity_data?: Record<string, any>;
    provider?: string;
    created_at?: string;
    updated_at?: string;
  }
