import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FirebaseService, Plaza } from '../services/firebase.service';
import Swal from 'sweetalert2';
import Doc from '../interfaces/doc.interface';


@Component({
  selector: 'app-root-docs',
  templateUrl: './root-docs.component.html',
  styleUrls: ['./root-docs.component.css']
})
export class RootDocsComponent implements OnInit {
  id: any;
  nuevaPlaza:Plaza|any;
  ListaDeUsuarios: Doc[];
  

  form: UntypedFormGroup;
  loading = false;

  constructor(private firebaseService: FirebaseService) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(),
      primape: new UntypedFormControl(),
      segape: new UntypedFormControl(),
      email: new UntypedFormControl(),
      phone: new UntypedFormControl(),
      cedule: new UntypedFormControl()
    });
  }//constructor

  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseService.getAllDoctor().subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios.Doctors;
        console.log(this.ListaDeUsuarios);
      });
      


      this.loading = true;
    }, 400);
  } //ng

  editarUsuario(unUsuario: Doc) {
    this.id = unUsuario['id_doc'];
    console.log(this.id)
    this.form.patchValue({
      name: unUsuario.name,
      lastName: unUsuario.lastName,
      email: unUsuario.email,
      phone: unUsuario.phone,
      cedule: unUsuario.cedule
    });

    
  } //editar



  eliminarUsuario(unUsuario: Doc) {
    var idAux = unUsuario.id;
    this.ObtenerPlaza(unUsuario.plaza);

    
    Swal.fire({
      title: 'Estas seguro de eliminar este registro?',
      text: "No podras recuperarlo de nuevo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--c1)',
      cancelButtonColor: 'var(--c6)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ObtenerPlaza(unUsuario.plaza);
        this.firebaseService.deleteUsuario(idAux, 'doctors').then(() =>{
          //si se elimina, tambien actualizamos la plaza para que quede disponible para otro
          this.nuevaPlaza.plaza = '0';
          this.firebaseService.updatePlaza(this.nuevaPlaza)
          .then(sus =>{
          })
          .catch(error => console.log(error));
  
        }, error =>{
          console.log(error);
        });

        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })

  } //borrar

 
  ObtenerPlaza(idPlaza:any){
    this.firebaseService.getPlazasByID(idPlaza)
    .then(response =>{
      response.forEach((plaza)=>{
        this.nuevaPlaza = plaza.data();
      });
    }, e =>{
      console.log(e);
    });
  }

  onSubmit(ID:any) {

    const UsuarioActualizado: any = {
      id: this.id,
      name: this.form.value.name,
      primape: this.form.value.primape,
      segape: this.form.value.segape,
      email: this.form.value.email,
      phone: this.form.value.phone,
      cedule: this.form.value.cedule
    };

    console.log(UsuarioActualizado);

    this.firebaseService.updateDoc(UsuarioActualizado).subscribe((response:any) => {
      if(response.intResponse == 200){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'usuario actualizado correctamente',
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
    });
    setTimeout(() => {
      this.firebaseService.getAllDoctor().subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios.Doctors;
        console.log(this.ListaDeUsuarios);
      });
      


      this.loading = true;
    }, 500);
  }//onsubmit

  generateFake(count: number): Array<number> {
    const indexes : any[] = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
