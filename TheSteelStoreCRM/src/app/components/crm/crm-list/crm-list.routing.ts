import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmListComponent } from './crm-list.component';

const routes: Routes = [
    {
        path: '',
        component: CrmListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrmListRoutingModule { }
