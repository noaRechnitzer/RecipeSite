import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeFormComponent } from './add-recipe-form.component';

describe('AddRecipeFormComponent', () => {
  let component: AddRecipeFormComponent;
  let fixture: ComponentFixture<AddRecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
