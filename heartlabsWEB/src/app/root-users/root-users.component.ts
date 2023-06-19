import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root-users',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css'],
})
export class RootUsersComponent implements OnInit {
  id: any;
  ListaDeUsuarios ;
  form: UntypedFormGroup;
  loading = false;

  searchText = ''

  constructor(private firebaseService: FirebaseService) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(),
      primape: new UntypedFormControl(),
      segape: new UntypedFormControl(),
      email: new UntypedFormControl(),
      password: new UntypedFormControl(),
      phone: new UntypedFormControl(),
      birthday: new UntypedFormControl(),
      sex: new UntypedFormControl(),
    });
  }//constructor

  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseService.getAllUsers().subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios.Usuarios;
        console.log(this.ListaDeUsuarios)
      });
      this.loading = true;
    }, 400);
  } //ng

  editarUsuario(unUsuario: User) {
    this.id = unUsuario['id_usuario'];
    console.log(this.id)
    this.form.patchValue({
      name: unUsuario.name,
      lastName: unUsuario.lastName,
      email: unUsuario.email,
      phone: unUsuario.phone,
      birthday: unUsuario.birthday,
      sex: unUsuario.sex,
    });

    
  } //editar

  eliminarUsuario(unUsuario: User) {
    var idAux =  unUsuario['id_usuario'];
    console.log(idAux)
    this.firebaseService.deleteUser(idAux).subscribe((response:any) => {
      if(response.intResponse == 200){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'usuario eliminado correctamente',
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
      this.firebaseService.getAllUsers().subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios.Usuarios;
        console.log(this.ListaDeUsuarios)
      });
      this.loading = true;
    }, 400);

  } //editar

 


  onSubmit(ID:any) {

    const UsuarioActualizado: any = {
      id: this.id,
      name: this.form.value.name,
      primape: this.form.value.primape,
      segape: this.form.value.segape,
      email: this.form.value.email,
      phone: this.form.value.phone,
      birthday: this.form.value.birthday,
      sex: this.form.value.sex
    };
    console.log(UsuarioActualizado);
    
    this.firebaseService.updateUser(UsuarioActualizado).subscribe((response:any) => {
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
      this.firebaseService.getAllUsers().subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios.Usuarios;
        console.log(this.ListaDeUsuarios)
      });
      this.loading = true;
    }, 400);
  }//onsubmit

  generateFake(count: number): Array<number> {
    const indexes : any[] = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

} //class
