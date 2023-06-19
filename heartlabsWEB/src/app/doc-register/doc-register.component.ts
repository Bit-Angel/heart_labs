import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import Doc from '../interfaces/doc.interface';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';
import { EstudiosService } from '../services/estudios.service';
import Estudio from '../interfaces/estudios.interface';

@Component({
  selector: 'app-doc-register',
  templateUrl: './doc-register.component.html',
  styleUrls: ['./doc-register.component.css']
})
export class DocRegisterComponent implements OnInit {
  formulario: UntypedFormGroup;
  formulario2: UntypedFormGroup;
  doctor:Doc;
  estudios:Estudio[] = [];
  doctores: [] = [];
  plazasDisponibles:any[]=[];
  nuevaPlaza:Plaza|any;
  pattern = /[0-9\+\-\ ]/;
  fname = false;
  flastname = false;
  femail=false;
  fpass=false;
  fphone=false;
  fcedula=false;
  fplaza=false;
  constructor(private regiserDoc: FirebaseService, private router: Router, private estudiosService: EstudiosService) { 
    this.formulario = new UntypedFormGroup ({
      name: new UntypedFormControl('', Validators.required),
      firstLastName: new UntypedFormControl('', Validators.required),
      secondLastName: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required,Validators.minLength(8)]),
      phone: new UntypedFormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]),
      cedule: new UntypedFormControl('', Validators.required),
      }) ;
      this.formulario2 = new UntypedFormGroup ({
        cedula: new UntypedFormControl('', Validators.required),
        plaza: new UntypedFormControl('', Validators.required)
        }) ;
  }

  ngOnInit(): void {
    this.estudios = this.estudiosService.getEstudio();
    console.log(this.estudios);
  }
  onSubmit(){
     //verificamos formulario
     if (this.formulario.valid){
      //Añadimos usuario a la base de datos
      console.log(this.formulario.value);
      this.doctor = this.formulario.value;
      console.log(this.doctor);
      
      this.regiserDoc.setDoctor(this.doctor).subscribe((response:any) =>{
        if(response.intResponse == 200){
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'doctor añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algunos Datos son incorrectos!'
          })
        }
        
      })  
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algunos Datos son incorrectos!'
        })
      }
  }
  onSubmit2(){
    if (this.formulario2.valid){
      //Añadimos usuario a la base de datos
      console.log(this.formulario2.value);
      
      this.regiserDoc.setEst_Doc(this.formulario2.value.cedula,this.formulario2.value.plaza).subscribe((response:any) =>{
        if(response.intResponse == 200){
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algunos Datos son incorrectos!'
          })
        }
        
      })  
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algunos Datos son incorrectos!'
        })
      }
  }

  getDoctors(){
    this.regiserDoc.getAllDoctor().subscribe((response:any) =>{
      if(response.intResponse == 200){
        console.log(response)
        this.doctores = response['Doctors'];
      }
    })
  }

  actualizarPlaza(){
    console.log(this.nuevaPlaza)
    this.regiserDoc.updatePlaza(this.nuevaPlaza)
    .then(sus =>{
      this.AgregarDocAuth();
    })
     .catch(error => console.log(error));

  }

  AgregarDocAuth(){
    //Registramos el usuario en Firebase auth para que pueda hacer login
    this.regiserDoc.addRegister(this.doctor.email,this.doctor.password)
    .then(response => {
      console.log(response);
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));
  }

  focusname(){
    this.fname = true;
  }
  focuslastname(){
    this.flastname = true;
  }
  focusemail(){
    this.femail=true;
  }
  focuspass(){
    this.fpass=true;
  }
  focusphone(){
    this.fphone=true;
  }
  focuscedula(){
    this.fcedula=true;
  }
  focusplaza(){
    this.fplaza=true;
  }

  todo(){
    this.fname = true;
    this.flastname = true;
    this.femail=true;
    this.fpass=true;
    this.fphone=true;
    this.fcedula=true;
    this.fplaza=true;
  }

}

export interface Plaza {
  id?:string
  idEstudio:string,
  plaza:string
}
