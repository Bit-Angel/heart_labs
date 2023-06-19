import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Cita from '../interfaces/cita.interface';
import User from '../interfaces/user.interface';
import { EstudiosService } from '../services/estudios.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css'],
})
export class ListaCitasComponent implements OnInit {
  email: any = '';
  phone: any = '';
  usuarioActual: any = {
    //Esta variable guarda todos los datos que estan en la base de datos del usuario que se conecta
  };
  boolTipo: boolean = true; //true: user, false: doc;
  idsCitas:string[] = [];
  citas: any[] = [];
  //QR
  title = 'Qr';
  url = '';
  value = this.url;
  level = 'H';
  form: UntypedFormGroup;
  idCitaEditar: any;
  //termino de Qr

  constructor(
    public miServicio: EstudiosService,
    private firebaseService: FirebaseService,
    private router: Router,
    public auth: Auth
  ) {
    this.form = new UntypedFormGroup({
      resultado: new UntypedFormControl(),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('TipoUsuario') == 'Doctor') {
      this.boolTipo = false;
      let idDoc = localStorage.getItem('idDoc');
      console.log(idDoc);
      this.firebaseService.getCitasDoc(idDoc).subscribe((response:any) =>{
          if(response.intResponse == 200){
            this.citas = response.strResponse
            console.log(this.citas)
          }
        })
    } else {
      let idUser = localStorage.getItem('idUsuario');
      console.log(idUser);
      this.firebaseService.getCitasUsuario(idUser).subscribe((response:any) =>{
          if(response.intResponse == 200){
            this.citas = response.strResponse
            console.log(this.citas)
          }
        })

    }
  }

  guardarResults(res: string) {
    Swal.fire({
      icon: 'info',
      title: 'Resultados de su estudio',
      text: res,
    });
  }

  editarResultados(citaModificar: Cita, i:string) {
    console.log(citaModificar)
    this.idCitaEditar = citaModificar['id_cita'];
    this.form.patchValue({
      resultado: citaModificar.resultado,
    });
  }

  onSubmit(ID: any) {
    console.log(ID)
    const resultadoActualizado: any = this.form.value.resultado;

    this.firebaseService.updateResultadoCita(ID,resultadoActualizado).subscribe((response:any) =>{
      if(response.intResponse == 200){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'resultado actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algunos Datos son incorrectos!'
        })
      }
    })
  } //onsubmit

  obtenerCitas() {
    console.log(this.usuarioActual.email);

    if (localStorage.getItem('TipoUsuario') == 'Doctor') {
      this.firebaseService
        .getCitas(this.usuarioActual.email, 'emailDoc')
        .then((response) => {
          response.forEach((cita) => {
            this.idsCitas.push(cita.id);
            this.citas.push(cita.data());
            console.log(this.citas);
            console.log(this.citas[0].id);
          });
        })
        .catch((error) => console.log(error));
    } else {
      this.firebaseService
        .getCitas(this.usuarioActual.email, 'emailUser')
        .then((response) => {
          response.forEach((cita) => {
            this.idsCitas.push(cita.id);
            this.citas.push(cita.data());
            console.log(this.citas);
            console.log(this.citas[0].id);
          });
        })
        .catch((error) => console.log(error));
    }
  }

  agregar_URL(nombre: any, id: any, precio: any, fecha: any) {
    this.url ='https://heartlabs.azurewebsites.net'+id+'/'+nombre+'/'+precio+'/'+fecha+'/'+this.usuarioActual.name+'/'+this.usuarioActual.lastName;
    this.value = this.url;
  }

  abriracceso(nombre: any, id: any, precio: any, fecha: any) {
    window.open('https://heartlabs.azurewebsites.net'+id+'/'+nombre+'/'+precio+'/'+fecha+'/'+this.usuarioActual.name+'/'+this.usuarioActual.lastName,'_blank');
  }
}
