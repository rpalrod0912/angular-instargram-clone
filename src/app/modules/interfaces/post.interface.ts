import { SafeResourceUrl } from '@angular/platform-browser';

//Important the endpoint of my Back End api/posts/user/2 return an array all time
export interface PostInterface {
  id: number;
  user_id: number;
  image: string;
  imageDecoded?: SafeResourceUrl;
  content: string;
  created_at: string;
  updated_at: string | null;
}
