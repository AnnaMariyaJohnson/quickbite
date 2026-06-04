export interface UserProfile{
    id:string;
    fullName:string;
    email:string;
    phone?:string | null;
}

export interface UpdateProfileRequest{
    fullName:string;
    phone?:string;
}