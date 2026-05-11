import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../../shared/services/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';

@Component({
  selector: 'app-product',
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
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getProducts();
  }

  displayColumns: string[] = ['id', 'name', 'account', 'price', 'picture', 'category', 'actions'];

  dataSource = new MatTableDataSource<ProductElement>();

  getProducts(): void {

    this.productService.getProducts()
      .subscribe((data:any) => {
        console.log("respuesta products:", data);
        this.processProductsResponse(data);
      }, (error:any) => {
        console.log("Error:", error);

      });

  }

  processProductsResponse(resp:any){
    if(resp.metadata[0].code === "00"){
      this.dataSource.data = resp.productResponse.product;

    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  openProductDialog() {

  const dialogRef = this.dialog.open(ProductForm,{
    width:'400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.productService.saveProduct(result)
        .subscribe((data:any) => {
          console.log("Producto guardado:", data);
          this.getProducts();
        }, (error:any) => {
          console.log("Error al guardar:", error);
        });

    }

  });

}

    deleteProduct(id:number){

      if(confirm("¿Deseas eliminar este producto?")){

        this.productService.deleteProduct(id)
          .subscribe((data:any) => {

            console.log("Producto eliminado", data);

            this.getProducts();

          }, (error:any) => {

            console.log("Error al eliminar", error);

          });

      }

    }

  editProduct(product:any){

      const dialogRef = this.dialog.open(ProductForm,{
        width:'400px',
        data: product
      });

      dialogRef.afterClosed().subscribe(result => {

        if(result){

          this.productService.updateProduct(result, product.id)
            .subscribe((data:any) => {

              console.log("Producto actualizado:", data);

              this.getProducts();

            }, (error:any) => {

              console.log("Error al actualizar:", error);

            });

        }

      });

    }
}

export interface ProductElement {

  id:number;
  name:string;
  account:number;
  price:number;
  picture:string;
  category:any;

}