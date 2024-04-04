import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasReDashComponent } from './personas-re-dash.component';

describe('PersonasReDashComponent', () => {
  let component: PersonasReDashComponent;
  let fixture: ComponentFixture<PersonasReDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasReDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonasReDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
