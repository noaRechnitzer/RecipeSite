import { NgIf, NgFor } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { UsersService } from '../../shared/services/users.service';
import { Role, User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { RecipesService } from '../../shared/services/recipes.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriesService } from '../../shared/services/categories.service';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-recipe-form',
  standalone: true,
  imports: [MatRadioModule, FormsModule, NgIf, ReactiveFormsModule, JsonPipe, MatGridListModule, NgFor, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './add-recipe-form.component.html',
  styleUrl: './add-recipe-form.component.scss'
})
export class AddRecipeFormComponent {
  checked = false;
  disabled = false;
  selectedOption: boolean;
  categoryService = inject(CategoriesService)
  toppings = new FormControl('');
  // toppingList: any[] = ['כככ כבגכהקגב', 'גקכהרהרה', 'רררררררררר', 'Pepperoni', 'Sausage', 'Tomato'];
  toppingList: any[] = [];
  private router = inject(Router);
  recipeForm: FormGroup
  notValidC: string = '';
  constructor(private recipeService: RecipesService, private fb: FormBuilder) {
    this.selectedOption = false;
    this.categoryService.categoriesName.subscribe(data => this.toppingList = data, err => console.log(err));
    this.recipeForm = fb.group({
      name: fb.control('', [Validators.required, Validators.minLength(1)]),
      description: fb.control('', [Validators.required, Validators.minLength(1)]),
      categoryName: fb.control('', Validators.required),
      prepareMinute: fb.control('', [Validators.required, Validators.min(1)]),
      level: fb.control('', [Validators.required, Validators.min(1), Validators.max(5)]),
      publishDate: new Date(),
      steps: fb.array([this.createStep()], [Validators.required, Validators.min(1)]),
      instructions: fb.array([this.createInstruction()], [Validators.required, Validators.min(1)]),
      image: fb.control('', [Validators.required, Validators.min(1)]),
      private: fb.control(false),
      userCreated_name: ''
    })
  }

  createStep(): FormGroup {
    return this.fb.group({
      name: '',
      ingredients: this.fb.array([this.createIngredients()])
    })
  }
  createIngredients(): FormGroup {
    return this.fb.group({
      name: ''
    });
  }
  createInstruction(): FormGroup {
    return this.fb.group({
      name: '',
    });
  }
  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }
  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }
  ingredients(index: number): FormArray {
    return this.steps.at(index).get('ingredients') as FormArray;
  }
  addInstruction() {
    console.log(this.recipeForm.get('categoryName') as FormArray);
    this.instructions.push(this.createInstruction());
  }
  addStep() {
    this.steps.push(this.createStep());
  }
  addIngredients(index: number) {
    this.ingredients(index).push(this.createIngredients())
  }

  onSubmit() {
    // console.log(this.fb);
    console.log(this.selectedOption);

    // if (this.selectedOption == 'private')
    //   this.recipeForm.patchValue({ private: true });
    console.log(this.recipeForm);


    if (this.instructions.length > 0) {
      if (this.recipeForm.valid) {
        this.recipeService.addRecipe(this.recipeForm.value).subscribe(
          (response) => {
            console.log('Recipe added successfully', response);
            // Navigate to another page if needed
            this.router.navigate(['/recipes/category/all']);
          },
          (error) => {
            console.error('Error adding recipe', error);
          }
        );
      } else {
        console.log('Form is invalid');
      }
    }
  }
  addNewCategory(i: any) {
    this.notValidC = ''
    console.log(i.value);
    if (i.value != '') {
      this.toppingList.forEach(c => {
        if (c.name == i.value) {
          this.notValidC = 'קטגןריה זו קיימת כבר.'
        }
      });
      if (this.notValidC != 'קטגןריה זו קיימת כבר.') {
        this.toppingList.push({ name: i.value })
        i.value = ''
      }
    }
  }
}