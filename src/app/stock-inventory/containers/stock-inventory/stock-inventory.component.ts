import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";

import { Observable, forkJoin } from "rxjs";

import { Product, Item } from "../../models/product.interface";

import { StockInventoryService } from "../../services/stock-inventory.service";

@Component({
  selector: "stock-inventory",
  styleUrls: ["stock-inventory.component.scss"],
  template: "stock-inventory.component.html"
})
export class StockInventoryComponent implements OnInit {
  products: Product[];

  productsMap: Map<number, Product>;

  form = this.fb.group({
    store: this.fb.group({
      branch: "",
      code: ""
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    forkJoin(cart, products).subscribe(
      ([cart, products]: [Item[], Product[]]) => {
        const mapInfo = products.map<[number, Product]>(product => [
          product.id,
          product
        ]);
        this.products = products;
        this.productsMap = new Map<number, Product>(mapInfo);
        console.log({ products: mapInfo });

        cart.forEach(item => this.addStock(item));
      }
    );
  }

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || "",
      quantity: stock.quantity || 10
    });
  }

  addStock(stock) {
    const control = this.form.get("stock") as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup; index: number }) {
    const control = this.form.get("stock") as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log("Submit:", this.form.value);
  }
}
