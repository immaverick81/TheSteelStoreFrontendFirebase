import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { CrmLeadDetailService } from './../../../core/services/crm-detail.service';

@Component({
  selector: 'app-lead-tracker',
  templateUrl: './lead-tracker.component.html',
  styleUrls: ['./lead-tracker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeadTrackerComponent implements OnInit {
  @Input() crmLeadDetail: any;
  @Input() showEditForm: boolean;
  trackerDetails: any[] = [];
  columns: any;
  loading = false;
  pageSize = 10;
  leadTypeOptions: SelectItem[];
  trackerForm = this.fb.group({
    status: new FormControl(''),
    createdAt: new FormControl(''),
    trackComments: new FormControl(''),
  });

  constructor(private fb: FormBuilder, private crmService: CrmLeadDetailService, private datePipe: DatePipe) {
    this.columns = [
      { field: 'RowNum', header: '#' },
      { field: 'Status', header: 'Status' },
      // { field: 'LeadComments', header: 'Comments' },
      { field: 'Date', header: 'Date' },
      { field: 'Time', header: 'Time' },
    ];
  }
  ngOnInit() {
    this.loadTrackerDetails();
    this.leadTypeOptions = [
      {label: 'Primary', value: 'Primary'},
      {label: 'Secondary', value: 'Secondary'},
      {label: 'Reminder Sent', value: 'Reminder Sent'},
      {label: 'Closed', value: 'Closed'},
      {label: 'Opportunity', value: 'Opportunity'},
      {label: 'Converted', value: 'Converted'}
    ];
  }

  loadTrackerDetails() {
    this.loading = true;
    this.trackerDetails = [];
    this.crmService.allTrackerById(this.crmLeadDetail?.LeadGuid).subscribe(data => {
      const todaysDate = new Date().getTime();
      data.data.map((item, index) => {
        const createdTime = new Date(item.CreatedAt).getTime();
        const Difference_In_Days = Math.round((todaysDate - createdTime) / (1000 * 3600 * 24));
        this.trackerDetails.push({
          RowNum: index + 1,
          Status: item.Status,
          LeadComments: item.LeadComments,
          Date: this.datePipe.transform(item.CreatedAt, 'MM/dd/yyyy'),
          Time: Difference_In_Days < 0 ? '0 day ago' : `${Difference_In_Days} days ago`
        });
      });
      this.loading = false;
    });
  }

  addTracker() {
    this.crmService.addTracker({
      leadGuid: this.crmLeadDetail.LeadGuid,
      status: this.trackerForm.controls['status'].value,
      leadComments: this.trackerForm.controls['trackComments'].value,
      createdAt: this.trackerForm.controls['createdAt'].value,
    });
    this.loadTrackerDetails();
  }
}
