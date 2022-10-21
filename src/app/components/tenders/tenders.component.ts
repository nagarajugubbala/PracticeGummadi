import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tender } from 'src/app/services/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {
  tenders: Tender[] = [];

  constructor(public tenderService: TenderService, private http: HttpClient) { }

  ngOnInit(): void {
    this.tenderService.getAllTenders().subscribe((res: Tender[]) => {
      this.tenders = res;
      console.log(this.tenders);
    });
  }


  fileName = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.http.post("/api/thumbnail-upload", formData);
      upload$.subscribe();
    }
  }

}
