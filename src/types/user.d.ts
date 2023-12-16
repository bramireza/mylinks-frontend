export interface Avatar{
  secure_url: string;
  public_id: string | null;
}
export interface User {
  _id: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDay?: Date;
  nationality: string;
  gender: string;
  avatar: Avatar;
}
