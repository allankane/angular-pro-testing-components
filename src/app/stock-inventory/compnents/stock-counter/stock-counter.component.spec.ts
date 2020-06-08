import { TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

import { StockCounterComponent } from "./stock-counter.component";

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe("StockCounterComponent", () => {
  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [StockCounterComponent]
    });
  });

  const setUp = () => {
    const fixture = TestBed.createComponent(StockCounterComponent);
    fixture.componentInstance.value = 0;
    return { component: fixture.componentInstance };
  };

  it("should increment correctly", () => {
    const { component } = setUp();
    component.increment();
    expect(component.value).toBe(1);
  });

  it("should decrement correctly", () => {
    const { component } = setUp();
    component.increment();
    expect(component.value).toBe(1);
    component.decrement();
    expect(component.value).toBe(0);
  });

  it("should not decrement below the minimum value", () => {
    const { component } = setUp();
    component.increment();
    expect(component.value).toBe(1);
    component.decrement();
    expect(component.value).toBe(0);
    component.decrement();
    expect(component.value).toBe(0);
  });

  it("should not increment below the maximum value", () => {
    const { component } = setUp();
    for (let i = 0; i < 200; i++) {
      component.increment();
    }
    expect(component.value).toBe(100);
  });

  it("should not increment over the maximum value", () => {
    const { component } = setUp();
    component.step = 20;
    component.max = 20;
    component.increment();
    component.increment();
    expect(component.value).toBe(20);
  });

  it("should call the output on a value change", () => {
    const { component } = setUp();
    jest
      .spyOn(component.changed, "emit")
      .mockImplementation(() => Promise.resolve());
    component.step = 100;
    component.increment();
    expect(component.changed.emit).toHaveBeenCalledWith(100);
  });
});
