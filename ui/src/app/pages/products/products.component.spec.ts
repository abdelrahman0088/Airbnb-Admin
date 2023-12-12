import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductsComponent } from './products.component';

describe('PoductsComponent', () => {
  let component: PoductsComponent;
  let fixture: ComponentFixture<PoductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoductsComponent]
    });
    fixture = TestBed.createComponent(PoductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
