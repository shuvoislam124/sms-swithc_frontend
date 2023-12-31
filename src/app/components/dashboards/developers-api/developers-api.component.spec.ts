import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersApiComponent } from './developers-api.component';

describe('DevelopersApiComponent', () => {
  let component: DevelopersApiComponent;
  let fixture: ComponentFixture<DevelopersApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevelopersApiComponent]
    });
    fixture = TestBed.createComponent(DevelopersApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
