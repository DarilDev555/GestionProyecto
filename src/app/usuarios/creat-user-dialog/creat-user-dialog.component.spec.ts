import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatUserDialogComponent } from './creat-user-dialog.component';

describe('CreatUserDialogComponent', () => {
  let component: CreatUserDialogComponent;
  let fixture: ComponentFixture<CreatUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatUserDialogComponent]
    });
    fixture = TestBed.createComponent(CreatUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
