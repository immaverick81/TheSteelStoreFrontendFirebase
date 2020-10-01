import { TableModule } from 'primeng/table';
import { CountryCodeListService } from './../../../core/services/country-code-list.service';
import { LeadTrackerComponent } from './../lead-tracker/lead-tracker.component';
import { LeadDocumentComponent } from './../lead-document/lead-document.component';
import { CrmLeadDetailComponent } from './../crm-lead-detail/crm-lead-detail.component';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { CrmListComponent } from './crm-list.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { CrmListRoutingModule } from './crm-list.routing';
import { LeadReminderComponent } from '../lead-reminder/lead-reminder.component';
import { LeadInfoComponent } from '../lead-info/lead-info.component';
import { UploadProductDataComponent } from '../upload-prod-data/upload-prod-data.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
	imports: [ CommonModule, CrmListRoutingModule, DialogModule, AppCommonModule, HeaderBreadCrumbModule, TableModule ],
	providers: [ DatePipe, CountryCodeListService ],
	declarations: [
		CrmListComponent,
		CrmLeadDetailComponent,
		LeadDocumentComponent,
		LeadTrackerComponent,
		LeadReminderComponent,
		LeadInfoComponent,
		UploadProductDataComponent,
		LoaderComponent
	]
})
export class CrmListModule {}
