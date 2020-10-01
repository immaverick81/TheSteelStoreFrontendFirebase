import { CrmLeadDetailService } from 'src/app/core/services/crm-detail.service';
import { ToastService } from './../../../core/services/toast.service';
import { LoaderService } from './../../../core/services/loader.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrmListComponent } from '../crm-list/crm-list.component';
@Component({
  selector: 'app-upload-prod-data',
  templateUrl: './upload-prod-data.component.html',
  styleUrls: ['./upload-prod-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadProductDataComponent implements OnInit {
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet1: any;
  worksheet2: any;
  details: any;
  workbook: any;
  loading = true;
  @ViewChild('file') file;
  public files: Set<File> = new Set();
  leadDetails: any;
  crmListComponent: CrmListComponent;
  items: any[] = [{label: 'File should be in .csv/ xlsx format', value: ''},
  {label: 'File must contains header column in below same order: ', value: 'FirstName, LastName, Company Name,	Brand Classification,	SIC,	Primary Address,	Mail Address,	Phone,	Website,	Fax,	Company Email,	Company ID,	Employee,	Annual Sales ($) mil,	Square Footage,	Year Established,	Distribution Area,	Ownership,	Headquarters,	ISO Ratings,	Brand Description,	Code,	Brand Names,	Lead Type'},
  {label: 'LeadOf coloumn should be: ', value: 'Supplier, Purchaser'},
  {label: 'LeadType coloumn should be: ', value: 'Primary, Secondary, Closed, Opportunity, Converted'}
];
  constructor(private toastService: ToastService, private crmService: CrmLeadDetailService,
  private loaderService: LoaderService) {}

  ngOnInit() {}

  addFiles() {
    this.file.nativeElement.click();
  }

  uploadFile(event: any) {
    this.fileUploaded = event.target.files[0];
    this.readExcel();
  }

  readExcel() {
    const readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i < data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      this.workbook = XLSX.read(bstr, { type: 'binary' });
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  onFilesAdded() {
    this.jsonData = [];
    for (let i = 0; i < this.workbook.SheetNames.length; i++) {
      const sheetName = this.workbook.SheetNames[i];
      const item = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheetName], { raw: false });
      if (item && item.length > 0) {
        this.jsonData.push(...item);
      }
    }
    this.createMappingForGrid(this.jsonData);
    // this.leadDetails = JSON.stringify(this.leadDetails);
    // const data: Blob = new Blob([this.jsonData], { type: 'application/json' });
    // FileSaver.saveAs(data, 'JsonFile' + new Date().getTime() + '.json');
    const res = this.crmService.loadAllLeadData(this.leadDetails);
    this.loaderService.show();
    res.subscribe(data1 => {
      this.loaderService.hide();
      // console.log(data1['data']);
      this.toastService.addSingle(data1['data']['status'].toString() , '', data1['data']['message']);
    },
    (error) => {
      this.loaderService.hide();
    },
    () => {
      this.crmListComponent.loadData();
    });
  }

  createMappingForGrid(item: any) {
    this.leadDetails = [];
    item.map((data: any, index: number) => {
        const region = this.crmService.getSelectedArea(data['Distribution Area']);
        this.leadDetails.push({
          RoleId: 3,
          FirstName: null,
          LastName: null,
          SIC: data['SIC'],
          CompanyID: data['Company ID'] || null,
          CompanyEmail: data['Company Email'] || null,
          CountryCode: null,
          PhoneNumber: data['Phone'] || null,
          Fax: data['Fax'] || null,
          LeadType: 1,
          LeadOf: null,
          PrimaryAddress: data['Primary Address'] || null,
          MailingAddress: data['Mail Address'] || null,
          CompanyName: data['Company Name'] || null,
          BrandClassification: data['Brand Classification'] || null,
          BrandName: data['Brand Names'] || null,
          BrandDescription: data['Brand Description'] || null,
          Employee: data['Employee'] || null,
          SquareFootage:  data['Square Footage'] || null,
          Ownership:  data['Ownership'] || null,
          AnnualSales:  data['Annual Sales'] || null,
          YearEstablished:  data['Year Established']  || null,
          DistributionArea:  region['value'] || null,
          Headquarters:  data['Headquarters'] || null,
          IsoRating:  data['ISO Ratings']  || null,
          Code:  data['Code']  || null,
          Website:  data['Website'] || null,
          LeadGuid: null,
          LeadStatus: 11,
          GeneratorType: 1,
          GeneratorGuid: '',
          GeneratorFirstName: '',
          GeneratorLastName: '',
          GeneratorEmail: '',
          GeneratorCountryCode: null,
          GeneratorPhoneNumber: null,
          GeneratorAddress: null,
          DocImageList: [],
          ExpiryDate: null,
          Iban: null,
          BankAddress: null,
          BankName: null,
          RoutingNumber: null,
          SwiftCode: null,
          SortCode: null,
          Country: null,
          AccountNumber: null,
          BeneficiaryName: null,
          IsActive: 1,
          RowNumber: index + 1,
          CreatedAt: new Date().toString(),
        });
    });
    return this.leadDetails;
  }
}
