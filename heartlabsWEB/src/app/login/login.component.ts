import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from '@firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  x: any;
  formulario: UntypedFormGroup;

  constructor(
    private loginService: FirebaseService,
    private router: Router,
    private db: Firestore,
    private regiserService:FirebaseService
  ) {
    this.formulario = new UntypedFormGroup({
      email: new UntypedFormControl(),
      password: new UntypedFormControl(),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.regiserService.getUserByEmailAndPass(this.formulario.value.email,this.formulario.value.password).subscribe((response:any) =>{
      if(response.intResponse == 200){
        console.log(response.strResponse)
        localStorage.setItem('idUsuario', response.strResponse['nf_getUsuarioFuction(_Correo,_Contra)']);
        this.loginUser();
      }
    })
    this.regiserService.getDoctorByEmailAndPass(this.formulario.value.email,this.formulario.value.password).subscribe((response:any) =>{
      if(response.intResponse == 200){
        console.log(response.strResponse)
        localStorage.setItem('idDoc', response.strResponse['nf_getDoctorFuction(_Correo,_Contra)']);
        this.loginDoc();
      }
    })
    if(this.formulario.value.email == "root" && this.formulario.value.password == "root"){
      this.router.navigate(['/mainRoot']);
    }else{

    }
  }

  async loginUser() {
      localStorage.setItem('TipoUsuario', 'Usuario');
      this.router.navigate(['/mainUser']);  
  }
  async loginDoc() {
      localStorage.setItem('TipoUsuario', 'Doctor');
      this.router.navigate(['/mainDoc']);
  }
}
