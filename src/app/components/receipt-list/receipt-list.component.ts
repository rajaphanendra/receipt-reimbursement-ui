import { Component, OnInit } from '@angular/core';
import { CommonModule,  NgFor, DatePipe } from '@angular/common';
import { ReceiptService } from '../../services/receipt.service';
// import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-receipt-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {
  receipts: any[] = [];
  baseDownloadUrl = 'http://localhost:5267/Uploads/';

  constructor(private receiptService: ReceiptService) {}

  ngOnInit() {
    this.fetchReceipts();
  }

  fetchReceipts() {
    this.receiptService.getReceipts().subscribe({
      next: (data) => {
        this.receipts = data;
      },
      error: (err) => {
        console.error('Error fetching receipts:', err);
      }
    });
  }
}
