import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AccessibilityService } from '../services/accessibility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  bandera: boolean = true;
  nmbre: any;
  tipenmbre: any;
  banderaUsuario = false;
  banderaDoc = false;
  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth, private accessibility:AccessibilityService) {
    this.getInfoUser();
  }

  ngOnInit(): void {
    this.llamadaBandera();
    this.auth.onAuthStateChanged(user => {
      this.llamadaBandera();
     })
  }
  // andres@correo.com

  getInfoUser(){
    this.tipenmbre = localStorage.getItem('TipoUsuario');
    this.nmbre = localStorage.getItem('NombreUsuario');
  }

  deleteInfoUser(){
    localStorage.setItem('TipoUsuario', '');
    localStorage.setItem('NombreUsuario', '');
  }

  llamadaBandera(){
    //muestra u oculta la opcion de iniciar/cerrar sesion y opciones extra
    console.log("Revisar tipo");
    if(localStorage.getItem('TipoUsuario') == 'Usuario'){
      this.banderaUsuario = true;
    }
    if(localStorage.getItem('TipoUsuario') == 'Doctor'){
      this.banderaDoc = true;
    }
  }

  onClick() {
    this.deleteInfoUser();
    this.accessibility.resetValues() 
    this.llamadaBandera();
    this.banderaUsuario = false;
    this.banderaDoc = false;
    this.router.navigate(['/home']);
    
  }

  RevisarTipo(){
    
    if(localStorage.getItem('TipoUsuario') == 'Usuario'){ //tipo usuario
      this.router.navigate(['/mainUser']);
    }
    if(localStorage.getItem('TipoUsuario') == 'Doctor'){ //tipo doctor
      this.router.navigate(['/mainDoc']);
    }
    if(localStorage.getItem('TipoUsuario') == 'Root'){ //tipo root
      this.router.navigate(['/mainRoot']);
    }

  }
}
