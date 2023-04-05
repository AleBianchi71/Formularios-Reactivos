import { Component, OnInit } from "@angular/core";
import { ValidatorService } from "../../../shared/validator/validator.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailValidatorService } from "src/app/shared/validator/email-validator.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        "",
        [
          Validators.required,
          Validators.pattern(this.ValidatorService.nombreApellidoPattern),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(this.ValidatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        "",
        [Validators.required, this.ValidatorService.noPuedeSerIgual],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmar: ["", [Validators.required]],
    },
    {
      Validators: [
        this.ValidatorService.camposIguales("password", "confirmar"),
      ],
    }
  );

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get("email")?.errors;
    if (errors?.required) {
      return "El correo es obligatorio";
    } else if (errors?.pattern) {
      return "Debe ingresar un correo valido";
    } else if (errors?.emailTomado) {
      return "Este correo ya existe";
    }
    return "";
  }

  constructor(
    private fb: FormBuilder,
    private ValidatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "Alejandro Bianchi",
      email: "test1@test.com",
      username: "AleBianchi71",
      password: "123456",
      confirmar: "123456",
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }
}
