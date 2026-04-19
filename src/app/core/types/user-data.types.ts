export interface UserData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    number: string;
    password?: string; 
    balance: number;
    created_at?: string; 
}


export interface CreateUserDTO {
    firstname: string;
    lastname: string;
    email: string;
    number: string;
    password: string;
    confirm?: string;
}