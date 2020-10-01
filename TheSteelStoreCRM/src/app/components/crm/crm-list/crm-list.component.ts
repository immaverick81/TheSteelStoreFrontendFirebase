import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';

import {SelectItem} from 'primeng/api';

import { map } from 'rxjs/operators';

import {ConfirmationService} from 'primeng/api';
import { ToastService} from 'src/app/core/services/toast.service';
import { LoaderService} from 'src/app/core/services/loader.service';
import { CrmLeadDetailService } from './../../../core/services/crm-detail.service';
interface Status {
  name: string;
  code: string;
}

@Component({
  selector: 'app-crm-list',
  templateUrl: './crm-list.component.html',
  styleUrls: ['./crm-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CrmListComponent implements OnInit {
  crmLeadDetail: any;
  @ViewChild('vcContainer', { read: ViewContainerRef })
  vcContainer: ViewContainerRef;
  @ViewChild('vcContainer2', { read: ViewContainerRef })
  vcContainer2: ViewContainerRef;
  @ViewChild('vcContainer3', { read: ViewContainerRef })
  vcContainer3: ViewContainerRef;
  status: SelectItem[];
  stages: SelectItem[];
  headerTitle: string;
  searchValue: string;
  displayBasicDoc = false;
  displayBasicDoc1 = false;
  selectedStatus: Status;
  fromDate: Date;
  toDate: Date;
  pageSize = 10;
  loading = false;
  columns: any[]; 
  disableToDate = true;
  displayBasic = false;
  clearDateIcon = false;
  crmData: any[];
  disableStage = false;
  selectedStage: any;
  filters: any;
  totalCount: number;
  addOrUpdate = false;
  msgs: any;
  first = 0;
  rowsPerPageOptions = [50, 100, 200, 500, 1000];
  leadId: any = '';
  loadingSpinner = false;
  constructor(private cfr: ComponentFactoryResolver, private injector: Injector, private datePipe: DatePipe,
    private crmDetailService: CrmLeadDetailService, private confirmationService: ConfirmationService,
    private loaderService: LoaderService, private toastService: ToastService) {
    this.status = [
      {label: 'All', value: 'All'},
      {label: 'Enable', value: 'Enable'},
      {label: 'Disable', value: 'Disable'}
    ];

    this.stages = [
      {label: 'Primary', value: 1},
      {label: 'Secondary', value: 2},
      {label: 'Opportunity', value: 3},
      {label: 'Closed', value: 4},
      {label: 'Converted', value: 5}
    ];
  }
  ngOnInit() {
    this.columns = [
      // { field: 'SERIALNO', header: 'S.No' },
      { field: 'LEADINFO', header: 'Lead Info' },
      // { field: 'GENERATORINFO', header: 'Generator Info' },
      { field: 'LEADOF', header: 'Lead Of' },
      { field: 'STAGE', header: 'Stage' },
      { field: 'CREATEDAT', header: 'Created At' },
      { field: 'STATUS', header: 'Status' },
      { field: '', header: '' },
      { field: '', header: 'Actions' },
    ];

    this.loadData();
  }

  showBasicDialog(leadDetail: any) {

  }

  loadData() {
    this.filters = {
      leadId: this.leadId || '',
      pageSize: 10,
      status: 2,
      searchText: this.searchValue,
      fromDate: null,
      toDate: null,
    };
    this.loading = true;
    this.crmDetailService.leadData(this.filters).subscribe(data => {
      this.crmData = data['data'];
      this.totalCount = this.crmData?.[0]?.TotalCount;
      this.loading = false;
    });
  }

  clearDates() {
    this.fromDate = null;
    this.toDate = null;
    this.filters = { ...this.filters,
      leadId: null,
      pageSize: this.pageSize,
      status: 2,
      searchText: this.searchValue,
      fromDate: null,
      toDate: null,
    }
    this.loading = true;
    this.crmDetailService.leadData(this.filters).subscribe(data => {
      this.crmData = data['data'];
      this.totalCount = this.crmData?.[0]?.TotalCount;
      this.loading = false;
    });
  }

  fromDateSelect() {
    const fromDate = new Date(this.datePipe.transform(this.fromDate, 'MM/dd/yyyy')).getTime();
    this.disableToDate = fromDate ? false : true;
    this.clearDateIcon = fromDate ? true : false;
  }

  setSelectedStage(leadTypeId) {
    this.selectedStage = this.crmDetailService.getLeadTypeName(leadTypeId);
    console.log(this.selectedStage);
    setTimeout(() => {
    this.disableStage = this.selectedStage.value === 5 ? true : false;
    }, 10);
  }

  getRoleName(roleId: number): string {
    return roleId === 4 ? 'Wholesaler' : roleId === 3 ? 'Supplier' : roleId === 5 ? 'Retailer' : '';
  }

  getLeadTypeName(leadTypeId: number): string {
    return leadTypeId === 1 ? 'Primary' : leadTypeId === 2 ? 'Secondary' : leadTypeId === 4 ? 'Opportunity' : leadTypeId === 3 ? 'Closed' :  leadTypeId === 5 ? 'Converted' : '';
  }

  private async loadChildComponentById(id: number) {
    switch(id) {
      case 1: {
      this.vcContainer2.clear();
      const { LeadDocumentComponent } = await import('../lead-document/lead-document.component');
      const containerFactory = this.cfr.resolveComponentFactory(LeadDocumentComponent);
      const { instance } = this.vcContainer2.createComponent(containerFactory, null, this.injector);
      instance.crmLeadDetail = this.crmLeadDetail;
      break;
    }
    case 2: {
      this.vcContainer2.clear();
      const { LeadReminderComponent } = await import('../lead-reminder/lead-reminder.component');
      const containerFactory = this.cfr.resolveComponentFactory(LeadReminderComponent);
      const { instance } = this.vcContainer2.createComponent(containerFactory, null, this.injector);
      instance.crmLeadDetail = this.crmLeadDetail;
      instance.showEditForm = true;
      break;
    }
    case 3: {
      this.vcContainer2.clear();
      const { LeadTrackerComponent } = await import('../lead-tracker/lead-tracker.component');
      const containerFactory = this.cfr.resolveComponentFactory(LeadTrackerComponent);
      const { instance } = this.vcContainer2.createComponent(containerFactory, null, this.injector);
      instance.crmLeadDetail = this.crmLeadDetail;
      instance.showEditForm = true;
      break;
    }
    case 4: {
      this.vcContainer.clear();
      const { CrmLeadDetailComponent } = await import('../crm-lead-detail/crm-lead-detail.component');
      const containerFactory = this.cfr.resolveComponentFactory(CrmLeadDetailComponent);
      const { instance } = this.vcContainer.createComponent(containerFactory, null, this.injector);
      instance.crmLeadDetail = this.crmLeadDetail;
      break;
      }
      case 5: {
        this.vcContainer2.clear();
        const { LeadInfoComponent } = await import('../lead-info/lead-info.component');
        const containerFactory = this.cfr.resolveComponentFactory(LeadInfoComponent);
        const { instance } = this.vcContainer2.createComponent(containerFactory, null, this.injector);
        instance.crmLeadDetail = this.crmLeadDetail;
        break;
      }
    }
  }

  onMaterialFormClose() {
    this.displayBasicDoc = false;
    this.displayBasic = false;
    this.displayBasicDoc1 = false;
  }

  async showDialogPopupById(id: number, leadDetail: any, addOrUpdate: boolean) {
    this.addOrUpdate = addOrUpdate;
    switch (id) {
      case 1: {
        this.displayBasicDoc = true;
        this.headerTitle = `Lead Document ${leadDetail['FirstName']} ${leadDetail['LastName']}`;
        this.crmLeadDetail = leadDetail;
        await this.loadChildComponentById(1);
        break;
      }
      case 2: {
        this.displayBasicDoc = true;
        this.headerTitle = 'Lead Reminders';
        this.crmLeadDetail = leadDetail;
        await this.loadChildComponentById(2);
        break;
      }
      case 3: {
        this.displayBasicDoc = true;
        this.headerTitle = 'Lead Tracker';
        this.crmLeadDetail = leadDetail;
        await this.loadChildComponentById(3);
        break;
      }
      case 4: {
        this.headerTitle = 'Edit Lead Details';
        this.displayBasic = true;
        this.crmLeadDetail = leadDetail;
        await this.loadChildComponentById(4);
        break;
      }
      case 5: {
        this.headerTitle = 'Lead Info';
        this.displayBasicDoc = true;
        this.crmLeadDetail = leadDetail;
        await this.loadChildComponentById(5);
        break;
      }
    }
  }

  onLeadDetailUpdate() {
    this.loaderService.show();
    this.crmDetailService.crmLeadDetail.subscribe(data => {
      if (data.value.leadGuid) {
        this.crmDetailService.updateLeadData({
        RoleId: 3,
          FirstName: data.value.firstName,
          LastName: data.value.lastName,
          SIC: data.value.sic,
          CompanyID: data.value.companyId,
          CompanyEmail: data.value.companyEmail,
          CountryCode: data.value.countryCode.value,
          PhoneNumber: data.value.phoneNumber,
          Fax: data.value.fax,
          LeadType: data.value.leadType?.value,
          LeadOf: data.value.leadOf?.value,
          PrimaryAddress: data.value.primaryAddress,
          MailingAddress: data.value.mailingAddress,
          CompanyName: data.value.companyName,
          BrandClassification: data.value.brandClassification,
          BrandName: data.value.brandName,
          BrandDescription: data.value.brandDescription,
          Employee: data.value.employee,
          SquareFootage:  data.value.squareFootage,
          Ownership:  data.value.ownership,
          AnnualSales:  data.value.annualSales,
          YearEstablished:  data.value.yearEstablished?.value,
          DistributionArea:  data.value.distributionArea?.value,
          Headquarters:  data.value.headquarters,
          IsoRating:  data.value.isoRating,
          Code:  data.value.code,
          Website:  data.value.website,
          LeadGuid: data.value.leadGuid,
          LeadStatus: '',
          GeneratorType: '',
          GeneratorGuid: '',
          GeneratorFirstName: '',
          GeneratorLastName: '',
          GeneratorEmail: '',
          GeneratorCountryCode: null,
          GeneratorPhoneNumber: null,
          GeneratorAddress: null,
          DocImageList: data.value.docList || [],
          ExpiryDate: data.value.expiryDate,
          Iban: data.value.Iban,
          BankAddress: data.value.bankAddress,
          BankName: data.value.bankName,
          RoutingNumber: data.value.routingNumber,
          SwiftCode: data.value.swiftCode,
          SortCode: data.value.sortCode,
          Country: data.value.country,
          AccountNumber: data.value.accountNumber,
          BeneficiaryName: data.value.beneficiaryName,
          IsActive: data.value.isActive,
          RowNumber: data.value.RowNumber,
          CreatedAt: new Date().toString(),
      }).subscribe(result => {
        if (result) {
          this.toastService.addSingle(result['data']['status'] , '', result['data']['message']);
          this.loaderService.hide();
          this.displayBasic = false;
        }
      },
      (error) => {
        console.log(error);
        this.loaderService.hide();
      },
      () => {
        this.loadData();
      });
    }  
  });
    // this.crmDetailService.leadData({
    //   leadId: null,
    //   pageSize: 10,
    //   status: 2,
    //   searchText: this.searchValue,
    //   fromDate: new Date(this.datePipe.transform(this.fromDate, 'MM/dd/yyyy')),
    //   toDate: new Date(this.datePipe.transform(this.toDate, 'MM/dd/yyyy'))
    // }).subscribe(data => {
    //   // this.loadingSpinner = false;
    //   this.crmData = data['data'];
    //   this.totalCount = this.crmData?.[0]?.TotalCount;
    // });
  }

  filterCrmDataChange() {
    this.loading = true;
    this.filters = { ...this.filters, searchValue: this.searchValue };
    this.crmDetailService.leadData(this.filters).subscribe(data => {
      this.crmData = data['data'];
      this.totalCount = this.crmData?.[0]?.TotalCount;
      this.loading = false;
    });
  }

  filterCrmData1() {
    this.filters = { ...this.filters, searchValue: this.searchValue,
      fromDate: new Date(this.datePipe.transform(this.fromDate, 'MM/dd/yyyy')),
      toDate: new Date(this.datePipe.transform(this.toDate, 'MM/dd/yyyy'))};
    if (this.fromDate && this.toDate) {
      this.loading = true;
      this.crmDetailService.leadData(this.filters).subscribe(data => {
        this.crmData = data['data'];
        this.totalCount = this.crmData?.[0]?.TotalCount;
        this.loading = false;
      });
    }
  }

  disableCrmData(leadDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to disable it?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
      },
      reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  deleteCrmData(leadDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete it?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.crmDetailService.deleteLeadData(leadDetail);
          // this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
      },
      reject: () => {
          // this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  async showUploadDialog() {
    this.displayBasicDoc1 = true;
    if (this.vcContainer3) {
    this.vcContainer3.clear();
    }
      const { UploadProductDataComponent } = await import('../upload-prod-data/upload-prod-data.component');
      const containerFactory = this.cfr.resolveComponentFactory(UploadProductDataComponent);
      const { instance } = this.vcContainer3.createComponent(containerFactory, null, this.injector);
  }

  ngOnDestroy() {
    if (this.vcContainer3 || this.vcContainer || this.vcContainer2) {
      this.vcContainer3.clear();
      this.vcContainer2.clear();
      this.vcContainer.clear();
    }
    this.loaderService.hide();
  }

  loadPageData(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    const currentPageNumber = this.getCurrentPage(this.first, this.pageSize);
    this.leadId = currentPageNumber === 1 ? null : this.crmData[this.pageSize - 1].LeadGuid;
  }

  onPage(event) {
    
    this.first = event.first;
    this.pageSize = event.rows;
    const currentPageNumber = this.getCurrentPage(this.first, this.pageSize);
    this.leadId = currentPageNumber === 1 ? null : this.crmData[this.pageSize - 1].LeadGuid;
    this.loadData(); 
    return;
  }
  getCurrentPage(currentRecords: number, recordsPerPage: number): number {
    return currentRecords === 0 ? 1 : Math.ceil(currentRecords / recordsPerPage) + 1;
  }

  onLeadDetailSave() {
    this.loaderService.show();
    this.crmDetailService.crmLeadDetail.subscribe(data => {
      // if (data && (data.value.leadGuid != null || data.value.LeadGuid != '')) {
        this.crmDetailService.addLeadData({
        RoleId: 3,
          FirstName: data.value.firstName,
          LastName: data.value.lastName,
          SIC: data.value.sic,
          CompanyID: data.value.companyId,
          CompanyEmail: data.value.companyEmail,
          CountryCode: data.value.countryCode.value,
          PhoneNumber: data.value.phoneNumber,
          Fax: data.value.fax,
          LeadType: data.value.leadType?.value,
          LeadOf: data.value.leadOf?.value,
          PrimaryAddress: data.value.primaryAddress,
          MailingAddress: data.value.mailingAddress,
          CompanyName: data.value.companyName,
          BrandClassification: data.value.brandClassification,
          BrandName: data.value.brandName,
          BrandDescription: data.value.brandDescription,
          Employee: data.value.employee,
          SquareFootage:  data.value.squareFootage,
          Ownership:  data.value.ownership,
          AnnualSales:  data.value.annualSales,
          YearEstablished:  data.value.yearEstablished.value,
          DistributionArea:  data.value.distributionArea.value,
          Headquarters:  data.value.headquarters,
          IsoRating:  data.value.isoRating,
          Code:  data.value.code,
          Website:  data.value.website,
          LeadGuid: '',
          LeadStatus: '',
          GeneratorType: '',
          GeneratorGuid: '',
          GeneratorFirstName: '',
          GeneratorLastName: '',
          GeneratorEmail: '',
          GeneratorCountryCode: null,
          GeneratorPhoneNumber: null,
          GeneratorAddress: null,
          DocImageList: data.value.docList,
          ExpiryDate: data.value.expiryDate,
          Iban: data.value.Iban,
          BankAddress: data.value.bankAddress,
          BankName: data.value.bankName,
          RoutingNumber: data.value.routingNumber,
          SwiftCode: data.value.swiftCode,
          SortCode: data.value.sortCode,
          Country: data.value.country,
          AccountNumber: data.value.accountNumber,
          BeneficiaryName: data.value.beneficiaryName,
          IsActive: data.value.isActive,
          RowNumber: '',
          CreatedAt: new Date().toString(),
      }).subscribe(result => {
        if (result) {
          this.toastService.addSingle(result['data']['status'] , '', result['data']['message']);
          this.loaderService.hide();
          this.displayBasic = false;
          this.loadData();
        }
      },
      (error) => {
        console.log(error);
        this.loaderService.hide();
      });
      // }
    });
  }

}
