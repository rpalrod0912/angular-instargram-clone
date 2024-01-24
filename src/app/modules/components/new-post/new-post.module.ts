import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from 'primeng/api';
import { NewPostRoutingModule } from './new-post-routing.module';
import { NewPostComponent } from './components/new-post.component';

@NgModule({
  declarations: [NewPostComponent],
  exports: [NewPostComponent],
  imports: [SharedModule, CommonModule, NewPostRoutingModule],
  providers: [MessageService],
})
export class NewPostModule {}
