import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductForm>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {

    this.productForm = this.fb.group({
      account: ['', Validators.required],
      name: ['', Validators.required],
      picture: ['', Validators.required],
      price: ['', Validators.required],
      category: this.fb.group({
        id: ['', Validators.required]
      })
    });

    if(this.data){

      this.productForm.patchValue({
        account: this.data.account,
        name: this.data.name,
        picture: this.data.picture,
        price: this.data.price,
        category: {
          id: this.data.category?.id
        }
      });

    }

  }

  save() {

    if(this.productForm.valid){
      this.dialogRef.close(this.productForm.value);
    }

  }

  close(){
    this.dialogRef.close();
  }

}