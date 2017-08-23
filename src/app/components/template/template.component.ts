import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  usuario:Object = {
    nombre : '',
    apellido : '',
    correo : ''
  };

  constructor() { }

  ngOnInit() {
  }


  guardar(forma: NgForm){
    console.log('Formulario Posteado');
    console.log(forma);
    console.log(forma.value);
    console.log(this.usuario);
  }
}
