import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tender } from 'src/app/services/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css']
})
export class TenderDetailsComponent implements OnInit {
  id!: number;
  tender!: Tender;

  constructor(public tenderService: TenderService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['tenderId'];
    this.tenderService.find(this.id).subscribe((data: Tender) => {
      this.tender = data;
    });
  }


}
