import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../shared/services/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryForm } from '../category-form/category-form';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
CommonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule
  ],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getCategories();
  }

  displayColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource=new MatTableDataSource<CategoryElement>();

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data:any) => {
        console.log("respuesta categories:", data);
        this.processCategoriesResponse(data);
      }, (error:any) => {
        console.log("Error:", error);
      });
  }

processCategoriesResponse(resp:any){
  if(resp.metadata[0].code === "00"){
    this.dataSource.data = resp.categoryResponse.category;
  }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openCategoryDialog() {

  const dialogRef = this.dialog.open(CategoryForm,{
    width:'400px'
  });

  dialogRef.afterClosed().subscribe(result => {

    if(result){

  this.categoryService.saveCategory(result)
    .subscribe((data:any) => {
      console.log("Categoría guardada:", data);
      this.getCategories();
    }, (error:any) => {
      console.log("Error al guardar:", error);
    });

}

  });

}

deleteCategory(id:number){

  if(confirm("¿Deseas eliminar esta categoría?")){

    this.categoryService.deleteCategory(id)
      .subscribe((data:any) => {

        console.log("Categoría eliminada", data);

        this.getCategories();

      }, (error:any) => {

        console.log("Error al eliminar", error);

      });
    }
  }

  editCategory(category:any){

  const dialogRef = this.dialog.open(CategoryForm,{
    width:'400px',
    data: category
  });

  dialogRef.afterClosed().subscribe(result => {

    if(result){

  this.categoryService.updateCategory(result, category.id)
    .subscribe((data:any) => {

      console.log("Categoría actualizada:", data);

      this.getCategories();

    }, (error:any) => {

      console.log("Error al actualizar:", error);

    });

}

  });

}

}
export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}