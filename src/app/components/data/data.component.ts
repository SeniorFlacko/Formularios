import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma:FormGroup;

  usuario:Object = {
    
    nombrecompleto: {
      nombre:"Cristian",
      apellido:"Aleman"
    },
    correo:"joker_psy@hotmail.es",
    pasatiempos:["Comer","Dormir","Musica"]
  }


  constructor() { 
    this.forma =  new FormGroup({

      nombrecompleto: new FormGroup({
        'nombre': new FormControl('',[
                                      Validators.required,
                                      Validators.minLength(3)
                                   ]
                               ),
        'apellido': new FormControl('',[Validators.required,this.noGodinez]),
      }),

      
      'correo': new FormControl('',[
                                      Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                   ]
                               ),
      'pasatiempos': new FormArray([
        new FormControl('correr',Validators.required)
      ])

    });
  
    // this.forma.setValue( this.usuario );
  }

  ngOnInit() {
  }

  guardarCambios(){
    console.log(this.forma);

    // this.forma.reset({
    //   nombrecompleto:{
    //     nombre:"",
    //     apellido:""
    //   },
    //   correo:""
    // })
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('',Validators.required)
    ) 
  }

   noGodinez( control: FormControl ): { [s:string] : boolean }{
    if(control.value === "Godinez"){
      return { nogodinez: true }
    }

    return null
   }
}
