import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarPaDashComponent } from './verificar-pa-dash.component';

describe('VerificarPaDashComponent', () => {
  let component: VerificarPaDashComponent;
  let fixture: ComponentFixture<VerificarPaDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarPaDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificarPaDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
