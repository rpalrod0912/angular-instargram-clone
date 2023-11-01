import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [InputTextModule, FormsModule, CommonModule, ButtonModule],
  exports: [InputTextModule, FormsModule, CommonModule, ButtonModule],
})
export class SharedModule {}
