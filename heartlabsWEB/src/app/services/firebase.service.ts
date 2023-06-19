import { Injectable } from '@angular/core';
import { collectionData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { Observable, retry } from 'rxjs';
import User from '../interfaces/user.interface';
import Doc from '../interfaces/doc.interface';
import Cita from '../interfaces/cita.interface';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider,RecaptchaVerifier} from '@angular/fire/auth'; //Servicio que permite integrar todos los metodos de Authentication
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore:Firestore ,private auth: Auth,private http: HttpClient) { }
  
  setCita(idUser,id_est_doc,fecha,resultado): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = JSON.stringify({
        "idUser": idUser,
        "id_est_doc": id_est_doc,
        "fecha": fecha,
        "resultado": resultado,
      });
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }
  
  setUser(user): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(user);
    const params = JSON.stringify({
        "email": user['email'],
        "password": user['password'],
        "firstLastName": user['firstLastName'],
        "secondLastName": user['secondLastName'],
        "name": user['name'],
        "phone": user['phone'],
        "sex": user['sex'],
        "birthday": user['birthday'],
      });
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }

  setDoctor(doctor): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(doctor);
    const params = JSON.stringify({
        "email": doctor['email'],
        "password": doctor['password'],
        "firstLastName": doctor['firstLastName'],
        "secondLastName": doctor['secondLastName'],
        "name": doctor['name'],
        "phone": doctor['phone'],
        "cedule": doctor['cedule'],
      });
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }

  setEst_Doc(id_doc,id_estudio): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = JSON.stringify({
        "id_doc": id_doc,
        "id_estudio": id_estudio
      });
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }
  updateUser(user): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(user);
    const params = JSON.stringify({
        "name": user['name'],
        "primape": user['primape'],
        "segape": user['segape'],
        "email": user['email'],
        "phone": user['phone'],
        "sex": user['sex'],
        "birthday": user['birthday'],
        "id": user['id']
      });
    console.log(params);
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }
  updateDoc(user): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = JSON.stringify({
        "name": user['name'],
        "primape": user['primape'],
        "segape": user['segape'],
        "email": user['email'],
        "phone": user['phone'],
        "cedule": user['cedule'],
        "id": user['id']
      });
    console.log(params);
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }
  deleteUser(id): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = JSON.stringify({
        "id": id
      });
    console.log(params);
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }
  updateResultadoCita(id,resultado): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = JSON.stringify({
        "id": id,
        "resultado":resultado
      });
    console.log(params);
    return this.http.post('http://192.168.211.107/api.php', params, {
      headers: httpHeaders,
    });
  }
  getUserByEmailAndPass(email: string, password: string): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=getUserByEmailAndPass&email='+email+'&pass='+password);
  }
  getDoctorByEmailAndPass(email: string, password: string): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=getDoctorByEmailAndPass&email='+email+'&pass='+password);
  }
  getAllDoctor(): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=getAllDoctor');
  } 
  getAllUsers(): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=getAllUsers');
  }
  getEst_Doc(): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=getEst_Doc');
  }
  getCitasUsuario(idUser): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=getCitasUsuario&id='+idUser);
  }
  getCitasDoc(idUser): Observable <any>{
    return this.http.get('http://192.168.211.107/api.php?general=GetCitasDoctor&id='+idUser);
  }
  getSumaCitas(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getSumaCitas');
  }
  getTotalUsuarios(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getTotalUsuarios');
  }
  getTotalSexos(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getTotalSexos');
  }
  getAccesos(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getAccesos');
  }
  getPrecios(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getPrecios');
  }
  getPreciosCaros(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getPreciosCaros');
  }
  
  getLogs(): Observable <any>{
    return this.http.get('http://localhost:6007/api/general' + '/getLogs');
  }

  addUserDB(user:User){
    const placeRef = collection(this.firestore, 'users'); //Creamos una colleccion. Funciona para hacer referencia a nuestra tabla
    return addDoc(placeRef,user);  //Retornamos el 'Doc', el cual contiene la insercion de datos. Hace la insercion a firestore
  }
  addDocDB(doctor:Doc){
    const placeRef = collection(this.firestore, 'doctors'); //Creamos una colleccion. Funciona para hacer referencia a nuestra tabla
    return addDoc(placeRef,doctor);  //Retornamos el 'Doc', el cual contiene la insercion de datos. Hace la insercion a firestore
  }
  addCitaDB(cita:Cita){
    const placeRef = collection(this.firestore, 'citas'); 
    return addDoc(placeRef,cita);  
  }
  addRegister(email:any,password:any){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }
  getUser(email:any){
    const placeRef = collection(this.firestore, 'users');
    const q = query(placeRef, where("email","==",email));
    return getDocs(q);
  }
  getCitas(email:any, tipo:string){
    const placeRef = collection(this.firestore, 'citas');
    const q = query(placeRef, where(tipo,"==",email));
    return getDocs(q);
  }
  getDoc(email:any){
    const placeRef = collection(this.firestore, 'doctors');
    const q = query(placeRef, where("email","==",email));
    return getDocs(q);
  }

  getRoot(email:any){
    const placeRef = collection(this.firestore, 'root');
    const q = query(placeRef, where("email","==",email));
    return getDocs(q);
  }
  getUserPhone(phone:any){
    const placeRef = collection(this.firestore, 'users');
    const q = query(placeRef, where("phone","==",phone));
    return getDocs(q);
  }
  getDocPhone(phone:any){
    const placeRef = collection(this.firestore, 'doctors');
    const q = query(placeRef, where("phone","==",phone));
    return getDocs(q);
  }
  getDocByEstudio(idEstudio:any){
    const placeRef = collection(this.firestore, 'doctors');
    const q = query(placeRef, where("plaza","==",idEstudio));
    return getDocs(q);
  }
  getPlazas(plaza:any){
    const placeRef = collection(this.firestore, 'estudios');
    const q = query(placeRef, where("plaza","==",plaza));
    return getDocs(q);
  }
  getPlazasByID(idEstudio:any){
    const placeRef = collection(this.firestore, 'estudios');
    const q = query(placeRef, where("idEstudio","==",idEstudio));
    return getDocs(q);
  }
 
  getAllDoctors(tipo: string): Observable<Doc[]>{
    const placeRef = collection(this.firestore, tipo);
    return collectionData (placeRef, {idField: 'id'}) as Observable<Doc[]>;
  }

  updateUsuario(id:string, datos:any, tipo:string): Promise<any>{
    const placeRef = doc(this.firestore, `${tipo}/${id}`);
    return updateDoc(placeRef,datos);
  }

  updateResultado(id:string, datos:any): Promise<any>{
    const placeRef = doc(this.firestore, `citas/${id}`);
    return updateDoc(placeRef,datos);
  }

  deleteUsuario(id:any, tipo:string){
    const placeRef = doc(this.firestore, `${tipo}/${id}`);
    return deleteDoc(placeRef);
  }

  updatePlaza(nuevaPlaza:Plaza){
    const placeDocRef = doc(this.firestore, `estudios/${nuevaPlaza.id}`); 
    return setDoc(placeDocRef,nuevaPlaza);
  }
  logout() {
    return signOut(this.auth);
  }

}

export interface Plaza {
  id?:string
  idEstudio:string,
  plaza:string
}

