import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { ReceiptService } from '../../services/receipt.service';

@Component({
  selector: 'app-reimbursement-form',
  standalone: true,
  templateUrl: './reimbursement-form.component.html',
  styleUrls: ['./reimbursement-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ReimbursementFormComponent {
  reimbursementForm: FormGroup;
  submitSuccess = false;
  submitError = false;

  today: string = new Date().toISOString().split('T')[0]; // For disabling future dates

  @ViewChild('fileInput') fileInputRef!: ElementRef;

  constructor(private fb: FormBuilder, private receiptService: ReceiptService) {
    this.reimbursementForm = this.fb.group({
      date: ['', [Validators.required, this.futureDateValidator]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      file: [null, Validators.required]
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const selectedDate = new Date(value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? { futureDate: true } : null;
  }

  onDateTouched() {
    this.f['date'].markAsTouched();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only PDF, PNG, or JPEG allowed.');
        this.reimbursementForm.get('file')?.reset();
        this.fileInputRef.nativeElement.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Max 5MB allowed.');
        this.reimbursementForm.get('file')?.reset();
        this.fileInputRef.nativeElement.value = '';
        return;
      }
      this.reimbursementForm.patchValue({ file });
    }
  }

  onSubmit() {
    if (this.reimbursementForm.valid) {
      const formData = new FormData();
      formData.append('date', this.reimbursementForm.get('date')?.value);
      formData.append('amount', this.reimbursementForm.get('amount')?.value);
      formData.append('description', this.reimbursementForm.get('description')?.value);
      formData.append('file', this.reimbursementForm.get('file')?.value);

      this.receiptService.submitReceipt(formData).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.submitError = false;
          this.reimbursementForm.reset();
          this.fileInputRef.nativeElement.value = '';

          // Hide the success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: () => {
          this.submitSuccess = false;
          this.submitError = true;
        }
      });
    }
  }

  get f(): { [key: string]: any } {
    return this.reimbursementForm.controls;
  }
}