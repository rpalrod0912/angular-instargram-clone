import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersDialogComponent } from './followers-dialog.component';

describe('FollowersDialogComponent', () => {
  let component: FollowersDialogComponent;
  let fixture: ComponentFixture<FollowersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowersDialogComponent]
    });
    fixture = TestBed.createComponent(FollowersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
