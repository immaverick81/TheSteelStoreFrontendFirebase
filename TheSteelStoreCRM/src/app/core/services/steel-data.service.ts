import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, filter, tap, debounce, throttleTime, distinctUntilChanged, distinctUntilKeyChanged, publishReplay } from 'rxjs/operators';
import { Observable, pipe, defer, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from './toast.service';
import { BASE_URL, AWS_S3_BASE_URL } from '../../constants/app.constants';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root',
})
export class SteelDataService {
  steelStoreRef: AngularFireList<any> = null;
  public responseRes = new BehaviorSubject<any>(null);
  public imageUploadDetails = new BehaviorSubject<any>(null);
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {
    this.steelStoreRef = db.list('/steelstoredetails');
  }

  readSteelData(): Observable<any> {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    // let params = new HttpParams();
    // params = params.append('username', userName);
    return this.http.post(`${BASE_URL}products/`, { username: userName });
  }

  productData(reqBody: any): Observable<any> {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}products/`,
    {
      username: userName,
      coilNumber: reqBody.coilNumber,
      pageSize: reqBody.pageSize,
      status: reqBody.status,
      searchText: reqBody.searchValue,
      fromDate: reqBody.fromDate ? reqBody.fromDate : '',
      toDate: reqBody.toDate ? reqBody.toDate : '',
    });
  }

  loadAllProducts(data: any): Observable<any> {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}loadAllProducts`, {
      data: data, username: userName
    });
  }

  getSteelData(data: any): any {
    this.imageUploadDetails.next({
      imageName: data.imageName,
      imageBinary: data.imageBinary
    });
  }

  retrieveImageDetails() {
    return this.imageUploadDetails as Observable<any>;
  }

  uploadProductImage(data: any) {
    return this.http.post(`${BASE_URL}saveImageBase64`, {
      imageName: data.imageName,
      imageBinary: data.imageBinary
    }).subscribe(res => console.log(res));
  }

  updateProduct(data: any) {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.put(`${BASE_URL}updateProduct`, {
      data: data, username: userName
    })
      .subscribe(result => {
      if (result) {
        this.loaderService.hide();
        this.toastService.addSingle(result['data']['status'] , '', result['data']['message']);
      }
    },
      (error) => {
        this.loaderService.hide();
    });
  }

  updateProductAndImage(image$: any, product$: any) {
    image$.subscribe((res: any) => {
      if (res?.imageName) {
        this.uploadProductImage(res);
      }
    });
    product$.subscribe((res: any) => {
      const mapData = this.mapFormData(res);
      if (mapData.COILNUMBER !== '') {
        this.updateProduct(mapData);
      }
    });
  }

  syncDataToAlgolia() {
    const { userName } = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post(`${BASE_URL}upload`, { username : userName });
  }

  mapFormData(data: any) {
    const { imageDetails, specifications } = data.controls;
      return {
        COILNUMBER: imageDetails['controls']['tagNumber'].value || '',
        LOCATION: imageDetails['controls']['location'].value || '' ,
        QUALITY: imageDetails['controls']['quality'].value || '',
        THICKNESS_IN: +specifications['controls']['thickness'].value || '',
        WIDTH_IN: +specifications['controls']['width'].value  || '',
        LENGTH_IN: +specifications['controls']['length'].value  || '',
        THICKNESS_MM: +specifications['controls']['diameter'].value  || '',
        WEIGHT_LB: +specifications['controls']['weight'].value  || '',
        GRADE: specifications['controls']['grade'].value  || '',
        ROCKWELL: +specifications['controls']['rockwell'].value  || '',
        YIELD: +specifications['controls']['yield'].value  || '',
        ELONGATION: +specifications['controls']['elongation'].value  || '',
        TENSILE: +specifications['controls']['tensile'].value  || '',
        PASS_OIL: specifications['controls']['passoil'].value  || '',
        FINISH: specifications['controls']['finish'].value  || '',
        TEMPER: specifications['controls']['temper'].value  || '',
        COATING: specifications['controls']['coating'].value  || '',
        PRODUCT: specifications['controls']['product'].value  || '',
        PIW: +specifications['controls']['piw'].value  || '',
        C: +specifications['controls']['carbon'].value  || '',
        MN: +specifications['controls']['magnesium'].value  || '',
        P: +specifications['controls']['phosphorous'].value  || '',
        S: +specifications['controls']['suplhur'].value  || '',
        SI: +specifications['controls']['silicon'].value  || '',
        AL: +specifications['controls']['aluminium'].value  || '',
        CR: +specifications['controls']['chromium'].value  || '',
        NB: +specifications['controls']['niobium'].value  || '',
        TI: +specifications['controls']['titanium'].value  || '',
        CA: +specifications['controls']['calcium'].value  || '',
        N: +specifications['controls']['nitrogen'].value  || '',
        NI: +specifications['controls']['nickel'].value  || '',
        CU: +specifications['controls']['copper'].value  || '',
        V: +specifications['controls']['vanadium'].value  || '',
        B: +specifications['controls']['boron'].value  || '',
        INACTIVE: specifications['controls']['inactive'].value ? 1 : 0,
        PRODUCT_IMAGE_URL: `${AWS_S3_BASE_URL}${imageDetails['controls']['tagNumber'].value}.jpg` || ''
      };
  }
 }
