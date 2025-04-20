import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainForm: FormGroup;
  feedbackForm: FormGroup;
  showFeedback = false;

  genderOptions = ['Male','Female','Other'];
  countries = ['USA','India','Germany'];
  statesMap: Record<string,string[]> = {
    USA: ['New York','California','Texas'],
    India: ['Telangana','Maharashtra','Karnataka'],
    Germany: ['Bavaria','Berlin','Hesse']
  };

  constructor(private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      name:        ['', [Validators.required, Validators.minLength(2)]],
      email:       ['', [Validators.required, Validators.email]],
      age:         [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      gender:      ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      country:     ['', Validators.required],
      state:       [{value: '', disabled: true}, Validators.required],
      address:     ['', Validators.required],
      subscribe:   [false, Validators.requiredTrue]
    });

    this.feedbackForm = this.fb.group({
      rating:   ['', Validators.required],
      comments: ['']
    });

    this.mainForm.get('country')!.valueChanges.subscribe(country => {
      const stateCtrl = this.mainForm.get('state')!;
      if (country) {
        stateCtrl.enable();
        stateCtrl.setValidators(Validators.required);
      } else {
        stateCtrl.reset();
        stateCtrl.disable();
        stateCtrl.clearValidators();
      }
      stateCtrl.updateValueAndValidity();
    });
  }

  submitMain() {
    this.mainForm.markAllAsTouched();
    if (this.mainForm.invalid) {
      return;
    }
    console.log('Main data:', this.mainForm.value);
    this.showFeedback = true;
  }

  submitFeedback() {
    this.feedbackForm.markAllAsTouched();
    if (this.feedbackForm.invalid) {
      return;
    }
    console.log('Feedback:', this.feedbackForm.value);
    alert('🎉 Thank you for your feedback!');
    this.showFeedback = false;
    this.feedbackForm.reset();
    this.mainForm.reset();
  }
}
