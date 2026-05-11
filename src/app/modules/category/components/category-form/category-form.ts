import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {

  categoryForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<CategoryForm>,
  @Inject(MAT_DIALOG_DATA) public data:any
  ) {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if(this.data){

  this.categoryForm.patchValue({
    name: this.data.name,
    description: this.data.description
  });
    }

  }

  save() {

    if(this.categoryForm.valid){
      this.dialogRef.close(this.categoryForm.value);
    }

  }

  close(){
    this.dialogRef.close();
  }

}