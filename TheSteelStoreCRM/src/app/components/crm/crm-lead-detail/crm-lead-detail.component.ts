import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators, FormArray } from '@angular/forms';

import { map } from 'rxjs/operators';

import { SelectItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

import { AWS_S3_BASE_URL } from './../../../constants/app.constants';
import { CountryCodeListService } from './../../../core/services/country-code-list.service';
import { CrmLeadDetailService } from './../../../core/services/crm-detail.service';
import { SteelDataService } from './../../../core/services/steel-data.service';

interface Status {
  name: string;
  code: string;
}

@Component({
  selector: 'app-crm-lead-detail',
  templateUrl: './crm-lead-detail.component.html',
  styleUrls: ['./crm-lead-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CrmLeadDetailComponent implements OnInit {
  @Input() crmLeadDetail: any;
  leadOfOptions: SelectItem[];
  leadTypeOptions: SelectItem[];
  distributionArea: SelectItem[];
  yearEstablished: SelectItem[];
  allCountryCodes: SelectItem[];
  uploadedFiles: any[] = [];
  remoteUrl: string = AWS_S3_BASE_URL;
  imageDetailsArr: any[] = [];
  currFileName: string;
  selectedLeadOf: any;
  selectedLeadType: any;
  selectedArea: any;
  selectedYear: any;
  selectCountryCode: any;
  @ViewChild('fileInput') fileInput: FileUpload;
  imageList: any[] = [];
  leadDetailsForm = this.fb.group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sic: new FormControl(''),
    companyId: new FormControl(''),
    companyName: new FormControl(''),
    companyEmail: new FormControl(''),
    leadOf: new FormControl(''),
    leadType: new FormControl(''),
    primaryAddress: new FormControl(''),
    mailingAddress: new FormControl(''),
    phoneNumber: new FormControl(''),
    fax: new FormControl(''),
    brandClassification: new FormControl(''),
    brandName: new FormControl(''),
    brandDescription: new FormControl(''),
    employee: new FormControl(''),
    squareFootage: new FormControl(''),
    ownership: new FormControl(''),
    annualSales: new FormControl(''),
    yearEstablished: new FormControl(''),
    distributionArea: new FormControl(''),
    headquarters: new FormControl(''),
    isoRating: new FormControl(''),
    code: new FormControl(''),
    website: new FormControl(''),
    teamMember: new FormControl(''),
    countryCode: new FormControl(''),
    generatorLeadOf: new FormControl(''),
    expiryDate: new FormControl(''),
    Iban: new FormControl(''),
    docList: new FormControl(''),
    bankAddress: new FormControl(''),
    swiftCode: new FormControl(''),
    bankName: new FormControl(''),
    sortCode: new FormControl(''),
    country: new FormControl(''),
    routingNumber: new FormControl(''),
    accountNumber: new FormControl(''),
    beneficiaryName: new FormControl(''),
    leadGuid: new FormControl(''),
  });
  constructor(private fb: FormBuilder, private countryCodeListService: CountryCodeListService, private datePipe: DatePipe,
    private crmDetailService: CrmLeadDetailService, private utilityService: SteelDataService,
    private http: HttpClient) {
    this.leadOfOptions = [
      {label: 'Supplier', value: 1},
      {label: 'Purchaser', value: 2}
    ];

    this.allCountryCodes = [
      { label: '+1 Canada/ USA', value: 1 },
      { label: '+91 India', value: 91 },
    ];

    this.leadTypeOptions = [
      {label: 'Primary', value: 1},
      {label: 'Secondary', value: 2},
      {label: 'Opportunity', value: 3},
      {label: 'Closed', value: 4},
      {label: 'Converted', value: 5}
    ];

    this.distributionArea = [
      {label: 'Local', value: 1},
      {label: 'Regional', value: 2},
      {label: 'National', value: 3},
      {label: 'International', value: 4}
    ];

    // tslint:disable-next-line: max-line-length
    this.yearEstablished = [{label: '1901', value: 1901},{label: '1902', value: 1902},{label: '1903', value: 1903},{label: '1904', value: 1904},{label: '1905', value: 1905},{label: '1906', value: 1906},{label: '1907', value: 1907},{label: '1908', value: 1908},{label: '1909', value: 1909},{label: '1910', value: 1910},{label: '1911', value: 1911},{label: '1912', value: 1912},{label: '1913', value: 1913},{label: '1914', value: 1914},{label: '1915', value: 1915},{label: '1916', value: 1916},{label: '1917', value: 1917},{label: '1918', value: 1918},{label: '1919', value: 1919},{label: '1920', value: 1920},{label: '1921', value: 1921},{label: '1922', value: 1922},{label: '1923', value: 1923},{label: '1924', value: 1924},{label: '1925', value: 1925},{label: '1926', value: 1926},{label: '1927', value: 1927},{label: '1928', value: 1928},{label: '1929', value: 1929},{label: '1930', value: 1930},{label: '1931', value: 1931},{label: '1932', value: 1932},{label: '1933', value: 1933},{label: '1934', value: 1934},{label: '1935', value: 1935},{label: '1936', value: 1936},{label: '1937', value: 1937},{label: '1938', value: 1938},{label: '1939', value: 1939},{label: '1940', value: 1940},{label: '1941', value: 1941},{label: '1942', value: 1942},{label: '1943', value: 1943},{label: '1944', value: 1944},{label: '1945', value: 1945},{label: '1946', value: 1946},{label: '1947', value: 1947},{label: '1948', value: 1948},{label: '1949', value: 1949},{label: '1950', value: 1950},{label: '1951', value: 1951},{label: '1952', value: 1952},{label: '1953', value: 1953},{label: '1954', value: 1954},{label: '1955', value: 1955},{label: '1956', value: 1956},{label: '1957', value: 1957},{label: '1958', value: 1958},{label: '1959', value: 1959},{label: '1960', value: 1960},{label: '1961', value: 1961},{label: '1962', value: 1962},{label: '1963', value: 1963},{label: '1964', value: 1964},{label: '1965', value: 1965},{label: '1966', value: 1966},{label: '1967', value: 1967},{label: '1968', value: 1968},{label: '1969', value: 1969},{label: '1970', value: 1970},{label: '1971', value: 1971},{label: '1972', value: 1972},{label: '1973', value: 1973},{label: '1974', value: 1974},{label: '1975', value: 1975},{label: '1976', value: 1976},{label: '1977', value: 1977},{label: '1978', value: 1978},{label: '1979', value: 1979},{label: '1980', value: 1980},{label: '1981', value: 1981},{label: '1982', value: 1982},{label: '1983', value: 1983},{label: '1984', value: 1984},{label: '1985', value: 1985},{label: '1986', value: 1986},{label: '1987', value: 1987},{label: '1988', value: 1988},{label: '1989', value: 1989},{label: '1990', value: 1990},{label: '1991', value: 1991},{label: '1992', value: 1992},{label: '1993', value: 1993},{label: '1994', value: 1994},{label: '1995', value: 1995},{label: '1996', value: 1996},{label: '1997', value: 1997},{label: '1998', value: 1998},{label: '1999', value: 1999},{label: '2000', value: 2000},{label: '2001', value: 2001},{label: '2002', value: 2002},{label: '2003', value: 2003},{label: '2004', value: 2004},{label: '2005', value: 2005},{label: '2006', value: 2006},{label: '2007', value: 2007},{label: '2008', value: 2008},{label: '2009', value: 2009},{label: '2010', value: 2010},{label: '2011', value: 2011},{label: '2012', value: 2012},{label: '2013', value: 2013},{label: '2014', value: 2014},{label: '2015', value: 2015},{label: '2016', value: 2016},{label: '2017', value: 2017},{label: '2018', value: 2018},{label: '2019', value: 2019},{label: '2020', value: 2020},{label: '2021', value: 2021},{label: '2022', value: 2022},{label: '2023', value: 2023},{label: '2024', value: 2024},{label: '2025', value: 2025},{label: '2026', value: 2026},{label: '2027', value: 2027},{label: '2028', value: 2028},{label: '2029', value: 2029},{label: '2030', value: 2030},{label: '2031', value: 2031},{label: '2032', value: 2032},{label: '2033', value: 2033},{label: '2034', value: 2034},{label: '2035', value: 2035},{label: '2036', value: 2036},{label: '2037', value: 2037},{label: '2038', value: 2038},{label: '2039', value: 2039},{label: '2040', value: 2040},{label: '2041', value: 2041},{label: '2042', value: 2042},{label: '2043', value: 2043},{label: '2044', value: 2044},{label: '2045', value: 2045},{label: '2046', value: 2046},{label: '2047', value: 2047},{label: '2048', value: 2048},{label: '2049', value: 2049},{label: '2050', value: 2050},{label: '2051', value: 2051},{label: '2052', value: 2052},{label: '2053', value: 2053},{label: '2054', value: 2054},{label: '2055', value: 2055},{label: '2056', value: 2056},{label: '2057', value: 2057},{label: '2058', value: 2058},{label: '2059', value: 2059},{label: '2060', value: 2060},{label: '2061', value: 2061},{label: '2062', value: 2062},{label: '2063', value: 2063},{label: '2064', value: 2064},{label: '2065', value: 2065},{label: '2066', value: 2066},{label: '2067', value: 2067},{label: '2068', value: 2068},{label: '2069', value: 2069},{label: '2070', value: 2070},{label: '2071', value: 2071},{label: '2072', value: 2072},{label: '2073', value: 2073},{label: '2074', value: 2074},{label: '2075', value: 2075},{label: '2076', value: 2076},{label: '2077', value: 2077},{label: '2078', value: 2078},{label: '2079', value: 2079},{label: '2080', value: 2080},{label: '2081', value: 2081},{label: '2082', value: 2082},{label: '2083', value: 2083},{label: '2084', value: 2084},{label: '2085', value: 2085},{label: '2086', value: 2086},{label: '2087', value: 2087},{label: '2088', value: 2088},{label: '2089', value: 2089},{label: '2090', value: 2090},{label: '2091', value: 2091},{label: '2092', value: 2092},{label: '2093', value: 2093},{label: '2094', value: 2094},{label: '2095', value: 2095},{label: '2096', value: 2096},{label: '2097', value: 2097},{label: '2098', value: 2098},{label: '2099', value: 2099}]
   }

  ngOnInit() {
    this.selectedLeadType = this.crmDetailService.getLeadTypeName(this.crmLeadDetail.LeadType);
    this.selectedLeadOf = this.crmDetailService.getRoleName(this.crmLeadDetail?.LeadOf || 1);
    this.selectedArea = this.crmDetailService.getSelectedArea(this.crmLeadDetail.DistributionArea);
    this.selectedYear = { label: this.crmLeadDetail.YearEstablished, value: +this.crmLeadDetail.YearEstablished };
    this.selectCountryCode = this.crmDetailService.getSelectedCountyCode(+this.crmLeadDetail.CountryCode);
    this.leadDetailsForm.controls['firstName'].setValue(this.crmLeadDetail.FirstName),
    this.leadDetailsForm.controls['lastName'].setValue(this.crmLeadDetail.LastName),
    this.leadDetailsForm.controls['sic'].setValue(this.crmLeadDetail.SIC),
    this.leadDetailsForm.controls['companyId'].setValue(this.crmLeadDetail.CompanyID),
    this.leadDetailsForm.controls['companyName'].setValue(this.crmLeadDetail.CompanyName),
    this.leadDetailsForm.controls['companyEmail'].setValue(this.crmLeadDetail.CompanyEmail),
    this.leadDetailsForm.controls['leadOf'].setValue(this.selectedLeadOf),
    this.leadDetailsForm.controls['leadType'].setValue(this.selectedLeadType),
    this.leadDetailsForm.controls['primaryAddress'].setValue(this.crmLeadDetail.PrimaryAddress),
    this.leadDetailsForm.controls['mailingAddress'].setValue(this.crmLeadDetail.MailingAddress),
    this.leadDetailsForm.controls['phoneNumber'].setValue(this.crmLeadDetail.PhoneNumber),
    this.leadDetailsForm.controls['fax'].setValue(this.crmLeadDetail.Fax),
    this.leadDetailsForm.controls['brandClassification'].setValue(this.crmLeadDetail.BrandClassification),
    this.leadDetailsForm.controls['brandName'].setValue(this.crmLeadDetail.BrandName),
    this.leadDetailsForm.controls['brandDescription'].setValue(this.crmLeadDetail.BrandDescription),
    this.leadDetailsForm.controls['employee'].setValue(this.crmLeadDetail.Employee),
    this.leadDetailsForm.controls['squareFootage'].setValue(this.crmLeadDetail.SquareFootage),
    this.leadDetailsForm.controls['ownership'].setValue(this.crmLeadDetail.Ownership),
    this.leadDetailsForm.controls['annualSales'].setValue(this.crmLeadDetail.AnnualSales),
    this.leadDetailsForm.controls['yearEstablished'].setValue(this.selectedYear),
    this.leadDetailsForm.controls['distributionArea'].setValue(this.selectedArea),
    this.leadDetailsForm.controls['headquarters'].setValue(this.crmLeadDetail.Headquarters),
    this.leadDetailsForm.controls['isoRating'].setValue(this.crmLeadDetail.IsoRating),
    this.leadDetailsForm.controls['code'].setValue(this.crmLeadDetail.Code),
    this.leadDetailsForm.controls['website'].setValue(this.crmLeadDetail.Website),
    this.leadDetailsForm.controls['Iban'].setValue(this.crmLeadDetail.Iban);
    this.leadDetailsForm.controls['expiryDate'].setValue(this.datePipe.transform(this.crmLeadDetail.ExpiryDate, 'MM/dd/yyyy'));
    this.leadDetailsForm.controls['bankAddress'].setValue(this.crmLeadDetail.BankAddress);
    this.leadDetailsForm.controls['bankName'].setValue(this.crmLeadDetail.BankName);
    this.leadDetailsForm.controls['routingNumber'].setValue(this.crmLeadDetail.RoutingNumber);
    this.leadDetailsForm.controls['swiftCode'].setValue(this.crmLeadDetail.SwiftCode);
    this.leadDetailsForm.controls['sortCode'].setValue(this.crmLeadDetail.SortCode);
    this.leadDetailsForm.controls['country'].setValue(this.crmLeadDetail.Country);
    this.leadDetailsForm.controls['beneficiaryName'].setValue(this.crmLeadDetail.BeneficiaryName);
    this.leadDetailsForm.controls['accountNumber'].setValue(this.crmLeadDetail.AccountNumber);
    this.leadDetailsForm.controls['leadGuid'].setValue(this.crmLeadDetail.LeadGuid);
    this.leadDetailsForm.controls['countryCode'].setValue(this.selectCountryCode);
    // this.allCountryCodes = [];
    // this.countryCodeListService.getCountryCodes().map(item => {
    //   this.allCountryCodes.push({label: `${item.dial_code} - ${item.name}`, value: {id: item.code, name: item.name, code: item.dial_code}})
    // });
    if (this.crmLeadDetail?.DocImageList?.length) {
      this.crmLeadDetail.DocImageList.map(item => {
        this.imageList.push({
          imgSrc: `${AWS_S3_BASE_URL}${item.imageName}`
        });
      });
      this.crmLeadDetail.DocImageList.map(item => {
        this.imageDetailsArr.push({
          imageName: item.imageName,
          imageBinary: item.imageBinary
        });
      });
    }
    this.crmDetailService.emitCrmLeadDetail(this.leadDetailsForm);
  }


  validateInput(control) {
    // [ngClass]='validateInput(leadDetailsForm.controls.firstName)'
    if (control.invalid) {
      return 'red-border';
    }
    return '';
  }

  saveFileDetails() {
    this.fileInput.files.forEach(file => {
      this.handleInputChange(file);
    });
    this.leadDetailsForm.controls['docList'].setValue(this.imageDetailsArr);
  }

   handleInputChange = (file: any) => {
    const pattern = /image-*/;
    const pdfpattern = '/application/pdf';
    const reader = new FileReader();
      if (!file.type.match(pattern) || !file.type.match(pdfpattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = (e: any) => {
        this.imageDetailsArr.push({
          imageName: `${file.lastModified}_${file.name}`,
          imageBinary: e.target.result.substr(e.target.result.indexOf(',') + 1)
        });
        this.crmLeadDetail = {...this.crmLeadDetail, DocImageList: this.imageDetailsArr};
        this.crmDetailService.updateLeadDataImages(this.crmLeadDetail);
        
      };
      reader.readAsDataURL(file);
  }

  onUpload(event: any) {
    for (const filei of event.files) {
        this.uploadedFiles.push(filei);
    }
  }
}
