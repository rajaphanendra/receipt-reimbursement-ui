import { Routes } from '@angular/router';
import { ReimbursementFormComponent } from './components/reimbursement-form/reimbursement-form.component';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'submit', pathMatch: 'full' },
  { path: 'submit', component: ReimbursementFormComponent },
  { path: 'receipts', component: ReceiptListComponent }
];