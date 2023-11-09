import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiservice.service';
import { JsonconfigService } from '../services/jsonconfig.service';
import { DataItemLogin } from '../structures/login';
import { Observable } from 'rxjs';
import { DatasharingService } from '../services/datasharing.service';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css']
})
export class PopupsComponent implements OnInit {

  //username: string = ''
  //password: string = ''

  constructor(private apiService: ApiService, public datash: DatasharingService, private jsonConfigService: JsonconfigService) { }

  ngOnInit(): void {
  }

  //gestisco il click del pulsante di login
  onLoginClick() {

    let url = this.jsonConfigService.baseUrl + this.jsonConfigService.logincheckUrl;

    try {
      this.apiService.loginCheck(url, this.datash.username, this.datash.password).subscribe((responce) => {
        if (responce !== null) {
          //variabile che viene letta da menu-box-left.component.ts tramite il servizio di sharing
          //LOGIN OK
          this.datash.dataitemlogin = responce;

          //se la webapi risponde che l'utente è abilitato : LOGIN OK
          if (this.datash.dataitemlogin.enabled == "true") {
            this.datash.btnlogin_disable = true;
            this.datash.btnlogout_disable = false;
            //clicco il pulsante di chiusura modale
            let btn = document.getElementById('btnlogin_close');
            if (btn)
              btn.click();
          }

          //INSERIRE LA VARIABILE DI SESSIONE (LOGIN = ON , LOGIN = OFF)
        } else {
          console.error('Dati del login non validi o vuoti');
        }
      });
    } catch (error) {
      console.error('Si è verificato un errore sulla richiesta loginCheck(url, username, password):', error);
    }

  }


}
