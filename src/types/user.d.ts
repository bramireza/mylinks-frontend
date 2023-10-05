export interface User {
  _id: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDay: Date | null;
  nationality: string;
  gender: string;
  pictureUrl: string;
}
