import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaComponent } from './personal-area.component';

describe('PersonalAreaComponent', () => {
  let component: PersonalAreaComponent;
  let fixture: ComponentFixture<PersonalAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
