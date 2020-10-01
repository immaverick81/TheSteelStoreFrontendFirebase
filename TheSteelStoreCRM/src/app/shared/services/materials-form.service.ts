import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MaterialsFormService {
  public materialSpecDetails = new BehaviorSubject(null);

  public emitMaterialDetails(formDetails: FormGroup) {
    this.materialSpecDetails.next(formDetails);
    }
}
