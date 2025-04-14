import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReimbursementFormComponent } from './components/reimbursement-form/reimbursement-form.component';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'receipt-reimbursement-ui';
}
