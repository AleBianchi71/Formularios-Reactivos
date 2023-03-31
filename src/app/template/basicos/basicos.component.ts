import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormArray } from "@angular/forms";

@Component({
  selector: "app-basicos",
  templateUrl: "./basicos.component.html",
})
export class BasicosComponent implements OnInit {
  @ViewChild("form") form!: NgForm;

  initForm = {
    producto: 'RTX 4080ti',
    precio:10,
    existencias: 0
  }

  ngOnInit(): void {}

  nombreValido(): boolean {
    return (
      this.form.controls["producto"]?.invalid &&
      this.form.controls["producto"]?.touched
    );
  }

  precioValido(): boolean {
    return (
      this.form.controls["precio"]?.touched &&
      this.form.controls["precio"]?.value < 0
    );
  }
  guardar() {
    console.log("posteo correcto");
    this.form.resetForm({
      producto: 'Algo',
      precio: 0,
      existencias: 0
    });
  }
}
