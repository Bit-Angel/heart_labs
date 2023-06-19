import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  arrLogs: any [] = [];
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getLogs().subscribe((response:any) =>{
      if(response.intResponse == 200){
        this.arrLogs = response.strResponse;
      }
    })
  }

}
