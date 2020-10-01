import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MaterialsFormService } from 'src/app/shared/services/materials-form.service';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialDetailsComponent implements OnInit {
  @Input() materialDetails: any;
  @Input() specifications: FormGroup;

  constructor(private materialFormService: MaterialsFormService) {}

  ngOnInit(): void {
    const {
      AL,
      B,
      C,
      CA,
      COILNUMBER,
      CR,
      CU,
      LENGTH_IN,
      LENGTH_MM,
      LOCATION,
      MILL,
      MN,
      N,
      NB,
      NI,
      P,
      PIW,
      PRODUCT,
      QUALITY,
      QUALITYNOTE,
      S,
      SI,
      THICKNESSSPEC,
      THICKNESS_IN,
      THICKNESS_MM,
      TI,
      V,
      VENDOR,
      WEIGHT_KG,
      WEIGHT_LB,
      WIDTH_IN,
      WIDTH_MM,
      objectID,
      YIELD,
      GRADE,
      FINISH,
      ROCKWELL,
      TEMPER,
      COATING,
      PASS_OIL,
      INACTIVE,
    } = this.materialDetails;
    // chemical composition
    this.specifications.controls['aluminium'].setValue(AL);
    this.specifications.controls['boron'].setValue(B);
    this.specifications.controls['carbon'].setValue(C);
    this.specifications.controls['magnesium'].setValue(MN);
    this.specifications.controls['phosphorous'].setValue(P);
    this.specifications.controls['suplhur'].setValue(S);
    this.specifications.controls['silicon'].setValue(SI);
    this.specifications.controls['chromium'].setValue(CR);
    this.specifications.controls['niobium'].setValue(NB);
    this.specifications.controls['calcium'].setValue(CA);
    this.specifications.controls['copper'].setValue(CU);
    this.specifications.controls['vanadium'].setValue(V);
    this.specifications.controls['titanium'].setValue(TI);
    this.specifications.controls['nickel'].setValue(NI);
    this.specifications.controls['nitrogen'].setValue(N);
    this.specifications.controls['inactive'].setValue(INACTIVE);

    // // material details specs
    this.specifications.controls['thickness'].setValue(THICKNESS_IN);
    this.specifications.controls['width'].setValue(WIDTH_IN);
    this.specifications.controls['length'].setValue(LENGTH_IN);
    this.specifications.controls['diameter'].setValue(THICKNESS_MM);
    this.specifications.controls['weight'].setValue(WEIGHT_LB);
    this.specifications.controls['piw'].setValue(PIW);
    this.specifications.controls['product'].setValue(PRODUCT);
    // // additional informations
    this.specifications.controls['grade'].setValue(GRADE);
    this.specifications.controls['rockwell'].setValue(ROCKWELL);
    this.specifications.controls['yield'].setValue(YIELD);
    this.specifications.controls['elongation'].setValue(MN);
    this.specifications.controls['tensile'].setValue(P);
    this.specifications.controls['passoil'].setValue(PASS_OIL);
    this.specifications.controls['finish'].setValue(FINISH);
    this.specifications.controls['temper'].setValue(TEMPER);
    this.specifications.controls['coating'].setValue(COATING);
  }
}
