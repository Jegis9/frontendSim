import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTemaComponent } from './card-tema.component';

describe('CardTemaComponent', () => {
  let component: CardTemaComponent;
  let fixture: ComponentFixture<CardTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
