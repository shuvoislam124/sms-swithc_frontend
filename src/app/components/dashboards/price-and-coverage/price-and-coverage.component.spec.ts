import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAndCoverageComponent } from './price-and-coverage.component';

describe('PriceAndCoverageComponent', () => {
  let component: PriceAndCoverageComponent;
  let fixture: ComponentFixture<PriceAndCoverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PriceAndCoverageComponent]
    });
    fixture = TestBed.createComponent(PriceAndCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
