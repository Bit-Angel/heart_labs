import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EstudiosService } from '../services/estudios.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import Estudio from '../interfaces/estudios.interface';
import Doc from '../interfaces/doc.interface';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  estudiosCon: any = "";
  estudiosSin: any = "";
  misEstudios:Estudio[] = [];
  misEstudiosS:Estudio[] = [];
  estudiosDisponibles:any[]=[];
  estudiosNoDisponibles:any[]=[];
  aux:Estudio;


  sumacitas: Doc[];
  sexos:any="";
  todosusuarios: any="";

  masculino:any="";
  femenino:any="";

  accesos: any="";
  precios: any="";
  precioscaros: any="";

  /* Variables para Chart  */
  barChartData: ChartDataset[] = [
    { data: [this.misEstudios.length], label: 'Estudios con Doctor.' },
    { data: [this.estudiosSin], label: 'Estudios sin Doctor' },
  ];

  barChartData2: ChartDataset[] = [
    { data: [this.misEstudios.length], label: 'Mujeres' },
    { data: [this.estudiosSin], label: 'Hombres' },
  ];

  barChartLabels: BaseChartDirective["labels"] = ['Estudios'];
  barChartLabels2: BaseChartDirective["labels"] = ['Personas'];

  barChartOptions = { responsive: true};
  barChartColors: Color[] = [];
  barChartLegend = true;
  barChartPluggins = [];
  barChartType: ChartType = 'bar';

  constructor(
    public miServicio:EstudiosService,
    private firebaseService:FirebaseService, 
    private router:Router, 
    public auth:Auth) { }

  ngOnInit(): void {
    this.firebaseService.getPlazas("1").then(response => { response.forEach((plaza) => {
      this.estudiosDisponibles.push(plaza.data());
    });
  }).catch(error => console.log(error));
    
    this.firebaseService.getPlazas("0").then(response => { response.forEach((plaza) => {
    this.estudiosNoDisponibles.push(plaza.data());
  });
  }).catch(error => console.log(error));

  this.firebaseService.getSumaCitas().subscribe((citas) => {
    this.sumacitas = citas.strResponse.total;
    console.log(this.sumacitas);
  });

  this.firebaseService.getTotalSexos().subscribe((sexo) => {
    this.sexos = sexo.strResponse;
    console.log("------")
    console.log(this.sexos);
    this.femenino=this.sexos[0].conteo;
    this.masculino=this.sexos[1].conteo;
  });

  this.firebaseService.getTotalUsuarios().subscribe((todos) => {
    this.todosusuarios = todos.strResponse;
    console.log(this.todosusuarios);
  });

  this.firebaseService.getAccesos().subscribe((accesos) => {
    this.accesos = accesos.strResponse;
    console.log("accesos")
    console.log(this.accesos);
  });

  this.firebaseService.getPrecios().subscribe((precios) => {
    this.precios = precios.strResponse;
    console.log("precios")
    console.log(this.precios);
  });

  this.firebaseService.getPreciosCaros().subscribe((precioscaros) => {
    this.precioscaros = precioscaros.strResponse;
    console.log("precioscaros")
    console.log(this.precioscaros);
  });

  /* this.getData(); */
}
    
/* window.onLoad = function{
  getData();
} */

  getData(){

    /* Disponibles */
    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      this.estudiosDisponibles[index]=this.estudiosDisponibles[index].idEstudio;
    }
    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      this.aux = this.miServicio.getEstudios(this.estudiosDisponibles[index]);
      this.misEstudios.push(this.aux);
      this.estudiosCon++;
    }
    console.log(this.misEstudios)
    console.log("tam: "+this.misEstudios.length)

    /* No disponibles */
    for (let index = 0; index < this.estudiosNoDisponibles.length; index++) {
      this.estudiosNoDisponibles[index]=this.estudiosNoDisponibles[index].idEstudio;
    }
    for (let index = 0; index < this.estudiosNoDisponibles.length; index++) {
      this.aux = this.miServicio.getEstudios(this.estudiosNoDisponibles[index]);
      this.misEstudiosS.push(this.aux);
      this.estudiosSin++;
    }
    console.log(this.misEstudiosS)

    //Grafica
    this.barChartData = [
      { data: [this.misEstudios.length
      ], label: 'Estudios con Doctor' },
      { data: [this.misEstudiosS.length
      ], label: 'Estudios sin Doctor' },
    ];

  } //getData

  getData2(){

    //Grafica
    this.barChartData2 = [
      { data: [this.femenino
      ], label: 'Mujeres' },
      { data: [this.masculino
      ], label: 'Hombres' },
    ];

  } //getData2

}
