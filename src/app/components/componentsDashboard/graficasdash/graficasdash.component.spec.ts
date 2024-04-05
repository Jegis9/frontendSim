import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasdashComponent } from './graficasdash.component';

describe('GraficasdashComponent', () => {
  let component: GraficasdashComponent;
  let fixture: ComponentFixture<GraficasdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficasdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
