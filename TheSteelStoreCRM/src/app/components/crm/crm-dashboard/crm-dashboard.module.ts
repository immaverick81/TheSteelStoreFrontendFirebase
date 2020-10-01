import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { CrmDashboardComponent } from './crm-dashboard.component';
import { CrmDashboardRoutingModule } from './crm-dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    CrmDashboardRoutingModule,
    AppCommonModule
  ],
  declarations: [CrmDashboardComponent]
})
export class CrmDashboardModule { }
