import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsDashComponent } from './buttons-dash.component';

describe('ButtonsDashComponent', () => {
  let component: ButtonsDashComponent;
  let fixture: ComponentFixture<ButtonsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
