import { CrmLeadDetailService } from 'src/app/core/services/crm-detail.service';
import { AWS_S3_BASE_URL } from './../../../constants/app.constants';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { CrmListComponent } from '../crm-list/crm-list.component';
import { LoaderService } from './../../../core/services/loader.service';
@Component({
  selector: 'app-lead-document',
  templateUrl: './lead-document.component.html',
  styleUrls: ['./lead-document.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CrmListComponent]
})
export class LeadDocumentComponent implements OnInit {
  @Input() crmLeadDetail: any;
  currFileName: string;
  @ViewChild('fileInput') fileInput: FileUpload;
  columns: any;
  loading = false;
  pageSize = 10;
  imageList: any[] = [];
  uploadedFiles: any[] = [];
  imageDetailsArr: any[] = [];
  // crmListComponent: CrmListComponent;
  constructor(private crmService: CrmLeadDetailService, private loaderService: LoaderService,
  private crmListComponent: CrmListComponent) {
    this.columns = [
      { field: '', header: '#' },
      { field: '', header: 'Status' },
      { field: '', header: 'Date' },
      { field: '', header: 'Time' },
    ];
  }
  ngOnInit() {
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

  onUpload(event: any) {
    for (const filei of event.files) {
        this.uploadedFiles.push(filei);
    }
  }

  saveFileDetails() {
    this.fileInput.files.forEach(file => {
      this.handleInputChange(file);
    });
  }

  handleInputChange = (file: any) => {
    const pattern = /image-*/;
    const pdfpattern = /application*/;
    const reader = new FileReader();
      if (!file.type.match(pattern) && !file.type.match(pdfpattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = (e: any) => {
        this.loaderService.show();
        this.imageDetailsArr.push({
          imageName: `${file.lastModified}_${file.name}`,
          imageBinary: e.target.result.substr(e.target.result.indexOf(',') + 1)
        });
        this.crmLeadDetail = {...this.crmLeadDetail, DocImageList: this.imageDetailsArr};
        this.crmService.updateLeadDataImages(this.crmLeadDetail).subscribe(response => {
          console.log(response);
        },
        (error) => {
          this.loaderService.hide();
        },
        () => {
          this.crmListComponent.ngOnInit();
          this.loaderService.hide();
          this.crmListComponent.displayBasicDoc = false;
        });
      }
      reader.readAsDataURL(file);
  }
}
