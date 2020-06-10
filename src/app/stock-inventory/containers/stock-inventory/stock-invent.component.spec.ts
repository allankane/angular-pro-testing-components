import { TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable, of } from "rxjs";

import { StockInventoryComponent } from "./stock-inventory.component";
import { StockBranchComponent } from "../../compnents/stock-branch/stock-branch.component";
import { StockCounterComponent } from "../../compnents/stock-counter/stock-counter.component";
import { StockProductsComponent } from "../../compnents/stock-products/stock-products.component";
import { StockSelectorComponent } from "../../compnents/stock-selector/stock-selector.component";
import { StockInventoryService } from "../../services/stock-inventory.service";

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

class MockStockInventoryService {
  getProducts() {
    return of([
      { id: 1, price: 10, name: "Test" },
      { id: 2, price: 100, name: "Another test" }
    ]);
  }
  getCartItems() {
    return of([
      { product_id: 1, quantity: 10 },
      { product_id: 2, quantity: 5 }
    ]);
  }
}

describe("StockInventoryComponent", () => {
  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        StockInventoryComponent,
        StockBranchComponent,
        StockCounterComponent,
        StockProductsComponent,
        StockSelectorComponent
      ],
      providers: [
        { provide: StockInventoryService, useClass: MockStockInventoryService }
      ]
    });
  });

  const setUp = () => {
    const fixture = TestBed.createComponent(StockInventoryComponent);
    const component = fixture.componentInstance;
    const el = fixture.debugElement;
    const service = el.injector.get(StockInventoryService);
    return { fixture, component, el, service };
  };

  it("should get cart items and products on init", () => {
    const { component, service } = setUp();
    jest.spyOn(service, "getProducts");
    jest.spyOn(service, "getCartItems");
    component.ngOnInit();
    expect(service.getProducts).toHaveBeenCalled();
    expect(service.getCartItems).toHaveBeenCalled();
  });

  it("should create a product map from the service response", () => {
    const { component } = setUp();
    component.ngOnInit();
    expect(component.productsMap.get(1)).toEqual({
      id: 1,
      price: 10,
      name: "Test"
    });
    expect(component.productsMap.get(2)).toEqual({
      id: 2,
      price: 100,
      name: "Another test"
    });
  });

  it("should store the products response", () => {
    const { component } = setUp();
    component.ngOnInit();
    expect(component.products).toEqual([
      { id: 1, price: 10, name: "Test" },
      { id: 2, price: 100, name: "Another test" }
    ]);
  });

  it("should create a stock item for each cart item", () => {
    const { component } = setUp();
    jest.spyOn(component, "addStock");
    component.ngOnInit();
    expect(component.addStock).toHaveBeenCalledWith({
      product_id: 1,
      quantity: 10
    });
    expect(component.addStock).toHaveBeenCalledWith({
      product_id: 2,
      quantity: 5
    });
  });
});
