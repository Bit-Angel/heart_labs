import { Component, OnInit, Input  } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { EstudiosService } from '../services/estudios.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
import User from '../interfaces/user.interface';
import Doc from '../interfaces/doc.interface';
import Cita from '../interfaces/cita.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-un-estudio',
  templateUrl: './un-estudio.component.html',
  styleUrls: ['./un-estudio.component.css']
})
export class UnEstudioComponent implements OnInit {
  @Input() estudio!: any;
  idUser:any | null;
  fechaCita:string;
  formulario:boolean;
  email:any="";
  phone:any="";
  cita:any={
    nombreEstudio:"",
    nombreDoc:"",
    idEstudio:"",
    id_doc:"",
    precio:0,
    tel:"",
    img:"",
    descripcion:"",
    id_est_doc:""
  };      
  constructor(public estudiosService:EstudiosService, public activatedRoute:ActivatedRoute,public auth:Auth,private firebaseService:FirebaseService, private router: Router) {
    this.activatedRoute.params.subscribe ( params => {
      console.log(params);
      this.cita.nombreEstudio = params['nombreEst']
      this.cita.img = params['img']
      this.cita.idEstudio = params['id_est']
      this.cita.precio = params['precio']
      this.cita.descripcion = params['desc']
      this.cita.nombreDoc = params['nombreDoc']
      this.cita.tel = params['tel']
      this.cita.id_est_doc = params['id_est_doc']
      this.cita.id_doc = params['id_doc']
      this.cita.nombreLab = params['nombreLab']
      this.cita.tipoEstudio = params['tipoEstudio']

  })

   }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario');
    console.log(this.idUser);
  }

  agendarCita(){
    this.cita.fecha = this.fechaCita;  
    this.cita.resultado = 'En espera';
    console.log(this.cita);
    // this.firebaseService.addCitaDB(this.cita)
    // .then(response =>{
    //   Swal.fire('Su cita ha sido agendada correctamente');
    //   this.router.navigate(['/citas']); 
    // })
    // .catch(error => console.log(error));
    this.firebaseService.setCita(this.idUser,this.cita.id_est_doc,this.cita.fecha,this.cita.resultado).subscribe((response:any) =>{
      if(response.intResponse == 200){
        if(response.intResponse == 200){
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'cita añadida correctamente',
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
      }
    })
      
  }

}
