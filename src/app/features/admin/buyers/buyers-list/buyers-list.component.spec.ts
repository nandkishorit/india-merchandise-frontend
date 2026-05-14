import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersListComponent } from './buyers-list.component';

describe('BuyersListComponent', () => {
  let component: BuyersListComponent;
  let fixture: ComponentFixture<BuyersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
