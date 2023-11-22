import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionVDialogComponent } from './confirmacion-v-dialog.component';

describe('ConfirmacionVDialogComponent', () => {
  let component: ConfirmacionVDialogComponent;
  let fixture: ComponentFixture<ConfirmacionVDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionVDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionVDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
