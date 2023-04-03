import { Component } from "@angular/core";
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dinamicos",
  templateUrl: "./dinamicos.component.html",
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class DinamicosComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear',Validators.required],
      ['Death Stranding',Validators.required],
    ], Validators.required)
  });

nuevoFavorito: FormControl = this.fb.control('',Validators.required);

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors && //evalue errores
      this.miFormulario.controls[campo].touched
    ); //evalua si fue tocado el campo
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){return;}

    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset()
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); //muestra los errores al guardar si el campo esta vacio
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset(); //resetea el formulario una vez que se guardo
  }

  borrar(i: number){
    this.favoritosArr.removeAt(i); //borra los favoritos
  }
}
