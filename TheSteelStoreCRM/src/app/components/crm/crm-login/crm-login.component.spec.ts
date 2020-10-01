import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmLoginComponent } from './crm-login.component';

describe('CrmLoginComponent', () => {
  let component: CrmLoginComponent;
  let fixture: ComponentFixture<CrmLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
