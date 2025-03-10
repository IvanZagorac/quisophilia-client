export type UserRegisterType = {
    name:string;
    surname: string;
    email  : string;
    password: string;
    confirmPassword?:string;
    image?: string;
    teamId?: number;     
    type: string;
}