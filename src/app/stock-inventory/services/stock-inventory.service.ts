import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Product, Item } from "../models/product.interface";

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>("/api/cart");
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("/api/products");
  }
}
