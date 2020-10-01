import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';


@Component({
    selector: 'app-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent {
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    isLoading: Subject<boolean> = this.loaderService.status;
    constructor(private loaderService: LoaderService) {
        this.isLoading.subscribe();
    }
}
