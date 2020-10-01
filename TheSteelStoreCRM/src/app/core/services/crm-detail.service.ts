import { ToastService } from 'src/app/core/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, defer, BehaviorSubject, of } from 'rxjs';
import { BASE_URL, AWS_S3_BASE_URL } from '../../constants/app.constants';
import { FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MessageService } from 'primeng/api';
import { CrmListComponent } from 'src/app/components/crm/crm-list/crm-list.component';
@Injectable({
  providedIn: 'root',
})
export class CrmLeadDetailService {
  public crmListComponent: CrmListComponent;
  public crmLeadDetail = new BehaviorSubject(null);
  constructor(private http: HttpClient, private toastService: ToastService,
  private loaderService: LoaderService, private messageService: MessageService) {}

  public emitCrmLeadDetail(formDetails: FormGroup) {
    this.crmLeadDetail.next(formDetails);
  }

  leadData(reqBody: any): Observable<any> {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}leads/`,
    {
      username: userName,
      leadId: reqBody.leadId,
      pageSize: reqBody.pageSize,
      status: reqBody.status,
      searchText: reqBody.searchValue,
      fromDate: reqBody.fromDate ? reqBody.fromDate : '',
      toDate: reqBody.toDate ? reqBody.toDate : '',
    });
  }

  updateLeadData(data: any) {
    if (data.LeadGuid) {
      const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
      return this.http.put(`${BASE_URL}updateLead`, {
        data: data, username: userName
      });
    }
  }

  updateLeadDataImages(data: any) {
     const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
      return this.http.put(`${BASE_URL}updateLead`, {
        data: data, username: userName
    }); 
  }


  addLeadData(data: any) {
      const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
      return this.http.post(`${BASE_URL}addLead`, {
        data: data, username: userName
    });
  }

  deleteLeadData(data: any) {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.put(`${BASE_URL}deleteLead`, {
      data: data, username: userName
    }).subscribe(result => {
      if (result) {
        this.toastService.addSingle(result['data']['status'] , '', result['data']['message']);
      }
    });
  }

  addTracker(data: any) {
    const trackerData = {
      LeadGuid: data.leadGuid,
      Status: data.status,
      LeadComments: data.leadComments,
      CreatedAt: data.createdAt
    }
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}addTracker`, {
      data: trackerData, username: userName
    }).subscribe(result => {
      if (result) {
        this.toastService.addSingle(result['data']['status'] , '', result['data']['message']);
      }
    });
  }

  allTrackerById(data: any): Observable<any> | any {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}trackers`, {
      data: data, username: userName
    });
  }

  getRoleName(roleId: number): any {
    let opvalue = {};
    switch (roleId) {
      case 1: {
        opvalue = {label: 'Supplier', value: 1};
        break;
      }
      case 2: {
        opvalue = {label: 'Purchaser', value: 2};
        break;
      }
    }
    return opvalue;
  }

  getLeadTypeName(leadTypeId: number): any {
    let opvalue = {};
    switch (leadTypeId) {
      case 1: {
        opvalue = {label: 'Primary', value: 1};
        break;
      }
      case 2: {
        opvalue = {label: 'Secondary', value: 2};
        break;
      }
      case 3: {
        opvalue = {label: 'Opportunity', value: 3};
        break;
      }
      case 4: {
        opvalue = {label: 'Closed', value: 4};
        break;
      }
      case 5: {
        opvalue = {label: 'Converted', value: 5}
        break;
      }
    }
    return opvalue;
  }

  getSelectedArea(areaId: number | string): any {
    let opvalue = {};
    switch (areaId) {
      case 1:
      case 'Local': {
        opvalue = {label: 'Local', value: 1};
        break;
      }
      case 2:
      case 'Regional': {
        opvalue = {label: 'Regional', value: 2};
        break;
      }
      case 3:
      case 'National': {
        opvalue = {label: 'National', value: 3};
        break;
      }
      case 4:
      case 'International': {
        opvalue = {label: 'International', value: 4};
        break;
      }
    }
    return opvalue;
  }

  getSelectedCountyCode(areaId: any): any {
    let opvalue = {};
    switch (areaId) {
      case 1: {
        opvalue = {label: '+1 Canada/ USA', value: 1 };
        break;
      }
      case 91: {
        opvalue = {label: '+91 India', value: 91 };
        break;
      }
    }
    return opvalue;
  }

  loadAllLeadData(data: any): Observable<any> {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}loadAllLeads`, {
      data: data, username: userName
    });
  }
 }
