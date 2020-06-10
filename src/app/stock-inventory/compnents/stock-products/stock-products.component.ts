import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormArray } from "@angular/forms";

import { Product } from "../../models/product.interface";

@Component({
  selector: "stock-products",
  styleUrls: ["stock-products.component.scss"],
  template: "stock-products.component.html"
})
export class StockProductsComponent {
  @Input() parent: FormArray;

  @Input() map: Map<number, Product>;

  @Output() remove = new EventEmitter<any>();

  getProduct(id: number) {
    return this.map.get(id);
  }

  removeProduct(group: any, index: number) {
    this.remove.emit({ group, index });
  }

  get stocks() {
    return (this.parent.get("stock") as FormArray).controls;
  }
}
