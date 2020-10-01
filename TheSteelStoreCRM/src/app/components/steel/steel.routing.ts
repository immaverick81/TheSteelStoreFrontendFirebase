import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteelComponent } from 'src/app/components/steel/steel.component';

const routes: Routes = [
    {
        path: '',
        component: SteelComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SteelRoutingModule { }
