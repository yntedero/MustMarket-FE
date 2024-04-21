import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersFilterComponent } from './offers-filter.component';

describe('OffersFilterComponent', () => {
  let component: OffersFilterComponent;
  let fixture: ComponentFixture<OffersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
