import { SafeResourceUrl } from '@angular/platform-browser';
import { CommentInterface } from './comments.interface';

//Important the endpoint of my Back End api/posts/user/2 return an array all time
export interface PostInterface {
  id: number;
  user_id: number;
  user_name: string;
  image: string;
  imageDecoded?: SafeResourceUrl;
  content: string;
  created_at: string;
  updated_at: string | null;
  comments: CommentInterface[];
}
