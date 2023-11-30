import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponentComponent } from './productos-component.component';

describe('ProductosComponentComponent', () => {
  let component: ProductosComponentComponent;
  let fixture: ComponentFixture<ProductosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosComponentComponent]
    });
    fixture = TestBed.createComponent(ProductosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
