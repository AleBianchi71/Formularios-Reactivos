import { Component, ElementRef } from "@angular/core";

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}
interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: "app-dinamicos",
  templateUrl: "./dinamicos.component.html",
})
export class DinamicosComponent {
  @ViewChild('juego') juego!: ElementRef;

  persona: Persona = {
    nombre: "Alejandro",
    favoritos: [
      { id: 1, nombre: "Metal Gear" },
      { id: 2, nombre: "DeathStrandig" },
    ],
  };

  agregarJuego( juego: string ) {
    this.persona.favoritos.push({
      id: this.persona.favoritos.length + 1,
      nombre: juego
    });
    
    this.juego.nativeElement.value = '';
  }
  guardar() {
    console.log("formulario posteado");
  }
  public isClicked: boolean = false;

  public bloquear(): void {
    this.isClicked = true;
  }

  public desbloquear(): void {
    this.isClicked = false;
  }
}
function ViewChild(arg0: string): (target: DinamicosComponent, propertyKey: "juego") => void {
  throw new Error("Function not implemented.");
}

