import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosReaDashComponent } from './pagos-rea-dash.component';

describe('PagosReaDashComponent', () => {
  let component: PagosReaDashComponent;
  let fixture: ComponentFixture<PagosReaDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosReaDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagosReaDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
