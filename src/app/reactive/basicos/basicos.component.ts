import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-basicos",
  templateUrl: "./basicos.component.html",
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class BasicosComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.miFormulario.reset({
      nombre : 'RTX 4080ti',
      precio : 1500
    })
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors && //evalue errores
      this.miFormulario.controls[campo].touched
    ); //evalua si fue tocado el campo
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); //muestra los errores al guardar si el campo esta vacio
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset(); //resetea el formulario una vez que se guardo
  }
}
