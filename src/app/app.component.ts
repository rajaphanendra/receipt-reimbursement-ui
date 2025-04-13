import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReimbursementFormComponent } from './components/reimbursement-form/reimbursement-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReimbursementFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'receipt-reimbursement-ui';
}