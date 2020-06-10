import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "stock-branch",
  styleUrls: ["stock-branch.component.scss"],
  templateUrl: "stock-branch.component.html"
})
export class StockBranchComponent {
  @Input() parent: FormGroup;

  required(name: string) {
    return (
      this.parent.get(`store.${name}`).hasError("required") &&
      this.parent.get(`store.${name}`).touched
    );
  }

  get invalid() {
    return (
      !this.required("branch") &&
      this.parent.get("store.branch").hasError("invalidBranch") &&
      this.parent.get("store.branch").dirty
    );
  }

  get unknown() {
    return (
      this.parent.get("store.branch").hasError("unknownBranch") &&
      this.parent.get("store.branch").dirty
    );
  }
}
