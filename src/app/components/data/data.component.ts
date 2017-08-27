import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

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
      ]),
      'username': new FormControl('',Validators.required,this.existeUsuario),
      'password1': new FormControl('',Validators.required),
      'password2': new FormControl(''),


    });
  
    // this.forma.setValue( this.usuario );

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual
    ])

    this.forma.controls['password1'].setValidators([
      this.noIgual2
    ])


    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log(data);
    })

    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log(data);
    })

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

   noIgual = (control:FormControl) => {
    if(control.value !== this.forma.controls["password1"].value) {
      return {
        differentpass: true
      }
    }
    return null;
  }

  noIgual2 = (control:FormControl) => {
    if(control.value !== this.forma.controls["password2"].value) {
      return {
        differentpass: true
      }
    }
    return null;
  }

  existeUsuario( control:FormControl ): Promise<any> | Observable<any> {
    let promise = new Promise(
      ( resolve, reject ) => {
          setTimeout(() => {
              if(control.value === "branast"){
                resolve ( { existe:  true } )
              }
              else{
                resolve ( null )
              }
            }, 3000 )
      }
    );

    return promise;
  }
    
}
