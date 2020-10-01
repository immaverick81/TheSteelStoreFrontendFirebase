import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { SteelRoutingModule } from 'src/app/components/steel/steel.routing';
import { SteelComponent } from 'src/app/components/steel/steel.component';
import { SteelListComponent } from './steel-list/steel-list.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { MaterialImageDetailsComponent } from './material-image-details/material-image-details.component';
import { MaterialsFormService } from 'src/app/shared/services/materials-form.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    SteelRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule
  ],
  providers: [MaterialsFormService, UtilityService ],
  declarations: [SteelComponent, SteelListComponent, MaterialDetailsComponent, MaterialImageDetailsComponent],
})
export class SteelModule {}
