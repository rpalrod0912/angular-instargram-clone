import { SafeResourceUrl } from '@angular/platform-browser';

export interface UserInterface {
  created_at: string;
  email: string;
  id: number;
  image: string | null;
  imageDecoded?: SafeResourceUrl;
  password: string;
  token: string;
  updated_at: string;
  username: string;
}

export interface UserFollowersInterface {
  followers: number;
  followeds: number;
}
