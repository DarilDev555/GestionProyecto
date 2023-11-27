import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorAgregarComponent } from './proveedor-agregar.component';

describe('ProveedorAgregarComponent', () => {
  let component: ProveedorAgregarComponent;
  let fixture: ComponentFixture<ProveedorAgregarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedorAgregarComponent]
    });
    fixture = TestBed.createComponent(ProveedorAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
