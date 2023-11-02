import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() inputId!: string;
  @Input() inputType: string = 'text';
  @Input() label!: string;
  @Input()
  formGroupParent!: FormGroup;

  @Input() controlName: string = '';

  value: string | undefined;
}
