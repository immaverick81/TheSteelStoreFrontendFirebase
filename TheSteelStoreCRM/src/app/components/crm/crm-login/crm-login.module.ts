import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { CrmLoginRoutingModule } from './crm-login.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmLoginComponent } from './crm-login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppCommonModule } from 'src/app/app.common.module';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../login/login.module';


@NgModule({
  declarations: [CrmLoginComponent],
  imports: [
    CommonModule,
    CrmLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [TranslateModule]
})
export class CrmLoginModule { }
