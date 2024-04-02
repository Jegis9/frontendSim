import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistropagoComponent } from './registropago.component';

describe('RegistropagoComponent', () => {
  let component: RegistropagoComponent;
  let fixture: ComponentFixture<RegistropagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistropagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistropagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
