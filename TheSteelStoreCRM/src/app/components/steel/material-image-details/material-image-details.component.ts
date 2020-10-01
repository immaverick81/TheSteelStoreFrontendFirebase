import { Component, OnInit, Input, AfterViewChecked, Output, EventEmitter, ViewChild, ViewContainerRef, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MaterialsFormService } from 'src/app/shared/services/materials-form.service';
import { ImageCroppedEvent, CropperPosition, ImageTransform, base64ToFile, Dimensions } from 'ngx-image-cropper';
import { BehaviorSubject, of } from 'rxjs';
import { SteelDataService } from 'src/app/core/services/steel-data.service';

@Component({
  selector: 'app-material-image-details',
  templateUrl: './material-image-details.component.html',
  styleUrls: ['./material-image-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialImageDetailsComponent implements OnInit, AfterViewInit {
  @Input() materialDetails: any;
  @Input() imageDetails: FormGroup;
  @ViewChild('vcContainer', { static: true })
  vcContainer: ViewContainerRef;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  prodImageUrl: any;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  constructor(private materialFormService: MaterialsFormService, public steelService: SteelDataService,
    private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(sessionStorage.getItem('currentUser'));
    const { COILNUMBER, LOCATION, QUALITY, PRODUCT_IMAGE_URL } = this.materialDetails;
    this.imageDetails.controls['tagNumber'].setValue(COILNUMBER);
    this.imageDetails.controls['location'].setValue(LOCATION);
    this.imageDetails.controls['quality'].setValue(QUALITY);
    this.prodImageUrl = `${PRODUCT_IMAGE_URL}`;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(event, base64ToFile(event.base64));
    const data = {
      imageName: `${this.materialDetails.COILNUMBER}.jpg`,
      imageBinary: this.croppedImage
    };
    this.steelService.getSteelData(data);
  }

  imageLoaded() {
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    // console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    // console.log('Load failed');
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  ngAfterViewInit(): void {
    this.showCropper = true;
    this.prodImageUrl = this.materialDetails?.PRODUCT_IMAGE_URL;
    this.cd.markForCheck();
  }
}
