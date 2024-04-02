import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepComponent } from './detallep.component';

describe('DetallepComponent', () => {
  let component: DetallepComponent;
  let fixture: ComponentFixture<DetallepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
