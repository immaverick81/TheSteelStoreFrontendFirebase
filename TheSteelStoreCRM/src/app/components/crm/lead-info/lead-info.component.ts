import { CrmLeadDetailService } from 'src/app/core/services/crm-detail.service';
import { AWS_S3_BASE_URL } from './../../../constants/app.constants';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ViewContainerRef, Injector, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeadInfoComponent implements OnInit {
  @Input() crmLeadDetail: any;
  @ViewChild('vcContainer', { read: ViewContainerRef })
  vcContainer: ViewContainerRef;
  @ViewChild('vcContainer2', { read: ViewContainerRef })
  vcContainer2: ViewContainerRef;
  columns: any;
  loading = false;
  pageSize = 10;
  imageList: any[] = [];
  selectArea = '';
  selectRole = ''

  constructor(private injector: Injector, private cfr: ComponentFactoryResolver, private crmService: CrmLeadDetailService) {
    this.columns = [
      { field: '', header: '#' },
      { field: '', header: 'Status' },
      { field: '', header: 'Date' },
      { field: '', header: 'Time' },
    ];
  }
  ngOnInit() {
    this.selectArea = this.crmService.getSelectedArea(this.crmLeadDetail.DistributionArea);
    this.selectRole = this.crmService.getRoleName(this.crmLeadDetail.LeadOf);
    this.crmLeadDetail.DocImageList.map(item => {
      this.imageList.push({
        imgSrc: `${AWS_S3_BASE_URL}${item.imageName}`
      });
    });
    this.loadTrackerInfo();
    this.loadReminderInfo();
  }

  async loadTrackerInfo() {
    if (this.vcContainer) {
      this.vcContainer.clear();
    }
      const { LeadTrackerComponent } = await import('../lead-tracker/lead-tracker.component');
      const containerFactory = this.cfr.resolveComponentFactory(LeadTrackerComponent);
      const { instance } = this.vcContainer.createComponent(containerFactory, null, this.injector);
      instance.crmLeadDetail = this.crmLeadDetail;
      instance.showEditForm = false;
  }

  async loadReminderInfo() {
    if (this.vcContainer2) {
      this.vcContainer2.clear();
    }
      const { LeadReminderComponent } = await import('../lead-reminder/lead-reminder.component');
      const containerFactory = this.cfr.resolveComponentFactory(LeadReminderComponent);
      const { instance } = this.vcContainer2.createComponent(containerFactory, null, this.injector);
      instance.crmLeadDetail = this.crmLeadDetail;
      instance.showEditForm = false;
  }
}
