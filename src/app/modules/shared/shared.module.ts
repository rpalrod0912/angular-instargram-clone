import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [TextInputComponent],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule,
  ],
  exports: [
    InputTextModule,
    TextInputComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class SharedModule {}
