import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MaterialsFormService } from 'src/app/shared/services/materials-form.service';
import { SteelDataModel } from 'src/app/core/models/steel-data.model';

@Component({
  selector: 'app-steel-list',
  templateUrl: './steel-list.component.html',
  styleUrls: ['./steel-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SteelListComponent implements OnInit {
  @Input() materialDetails: any;
  steelInfo = `Galvanizing is the process of applying a protective zinc coating to steel or iron, to prevent rusting. The most common method is hot-dip galvanizing, in which the parts are submerged in a bath of molten hot zinc.`;
  materialDetailsForm = this.fb.group({
    imageDetails: new FormGroup({
      tagNumber: new FormControl(''),
      location: new FormControl(''),
      quality: new FormControl(''),
    }),
    specifications: new FormGroup({
      thickness: new FormControl(''),
      width: new FormControl(''),
      length: new FormControl(''),
      diameter: new FormControl(''),
      weight: new FormControl(''),
      grade: new FormControl(''),
      rockwell: new FormControl(''),
      yield: new FormControl(''),
      elongation: new FormControl(''),
      tensile: new FormControl(''),
      passoil: new FormControl(''),
      finish: new FormControl(''),
      product: new FormControl(''),
      piw: new FormControl(''),
      temper: new FormControl(''),
      coating: new FormControl(''),
      carbon: new FormControl(''),
      magnesium: new FormControl(''),
      phosphorous: new FormControl(''),
      suplhur: new FormControl(''),
      silicon: new FormControl(''),
      aluminium: new FormControl(''),
      chromium: new FormControl(''),
      niobium: new FormControl(''),
      titanium: new FormControl(''),
      calcium: new FormControl(''),
      nitrogen: new FormControl(''),
      nickel: new FormControl(''),
      copper: new FormControl(''),
      vanadium: new FormControl(''),
      boron: new FormControl(''),
      inactive: new FormControl(''),
    })
  });
  constructor(private fb: FormBuilder, private materialFormService: MaterialsFormService) {}

  ngOnInit(): void {
    this.materialFormService.emitMaterialDetails(this.materialDetailsForm);
  }
}
