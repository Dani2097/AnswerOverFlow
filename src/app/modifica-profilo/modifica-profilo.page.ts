import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';

import { ApiService } from 'src/app/providers/api.service';

import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-modifica-profilo',
  templateUrl: './modifica-profilo.page.html',
  styleUrls: ['./modifica-profilo.page.scss'],
})
export class ModificaProfiloPage implements OnInit {
  email: string;
  
  /*username: string;
  password: string;
  nome: string;
  cognome: string;
  bio: string;
  */
  password: string;
  usernameToPass: string;
  nomeToPass: string;
  cognomeToPass: string;
  bioToPass: string;

  usernameView: string;
  nomeView: string;
  cognomeView: string;
  bioView: string;

  profilo = {};

  timerSettings: string[] = ["5 min", "15 min", "30 min", "1 ora", "3 ore", "6 ore", "12 ore", "1 giorno", "3 giorni"];
  constructor(public alertController: AlertController,public apiService: ApiService, private pickerController: PickerController) { }
 
  ngOnInit() {
    this.email = 'gmailverificata';
    //this.username = 'prova modifica';
    this.password = 'prova modifica'
    //this.nome = 'prova modifica';
    //this.cognome = 'prova modifica';
    //this.bio = 'prova modifica';
    this.showSurvey();
  }

  async modify() {

    if( this.usernameToPass == null) {
      this.usernameToPass = this.usernameView;
    }
    if (this.nomeToPass == null) {
      this.nomeToPass = this.nomeView;
    }

    if (this.cognomeToPass == null) {
      this.cognomeToPass = this.cognomeView;
    }
    
    if (this.bioToPass == null) {
      this.bioToPass = this.bioView;
    }

    this.apiService.modificaProfilo(this.usernameToPass, this.password, this.nomeToPass, this.cognomeToPass, this.bioToPass, this.email).then(
      (result) => { 
        console.log('Modifica avvenuta con successo');
      },
      (rej) => {
        console.log('Modifica non effetutata');
  
      }
    );

  }

  async showSurvey() {
    this.apiService.getProfilo(this.email).then(
      (profilo) => {
        console.log('Visualizzato con successo');

        this.profilo = profilo['data']; //assegno alla variabile locale il risultato della chiamata. la variabile sarà utilizzata nella stampa in HTML
        
        this.usernameView = this.profilo['0'].username;
        this.nomeView = this.profilo['0'].nome;
        this.cognomeView = this.profilo['0'].cognome;
        this.bioView = this.profilo['0'].bio;
        console.log('Profilo: ', this.profilo['0']);
        
      },
      (rej) => {
        console.log("C'è stato un errore durante la visualizzazione");
      }
    );
  }

  async popupModificaUsername() {
    const alert = await this.alertController.create({
      header: 'Modifica username',
      inputs: [
        {
          name: 'usernamePopUp',
          type: 'text',
          placeholder: this.usernameView //risposta del servizio visualizzaProfilo
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.usernameView = this.profilo['0'].username; //annullo modifiche
            console.log('Confirm cancel');
          }
        }, {
          text: 'Ok',
          handler: insertedData => {
            console.log(JSON.stringify(insertedData)); //per vedere l'oggetto dell'handler
            this.usernameView = insertedData.usernamePopUp; 
            this.usernameToPass = insertedData.usernamePopUp;

            if (insertedData.usernamePopUp == "") { //CHECK CAMPO VUOTO
              this.usernameView = this.profilo['0'].username;
              this.usernameToPass = this.profilo['0'].username;
            }
          }
        }
      ]
    });

    await alert.present();
    //View Dati inseriti dopo click sul popup di modifica username. Dal console log ho visto come accedere ai dati ricevuti.
    //this.titoloView = await (await alert.onDidDismiss()).data.values.titolo;
  }

  async popupModificaNome() {
    const alert = await this.alertController.create({
      header: 'Modifica nome',
      inputs: [
        {
          name: 'nomePopUp',
          type: 'text',
          placeholder: this.nomeView //risposta del servizio visualizzaProfilo
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.usernameView = this.profilo['0'].nome; //annullo modifiche
            console.log('Confirm cancel');
          }
        }, {
          text: 'Ok',
          handler: insertedData => {
            console.log(JSON.stringify(insertedData)); //per vedere l'oggetto dell'handler
            this.nomeView = insertedData.nomePopUp; 
            this.nomeToPass = insertedData.nomePopUp;

            if (insertedData.nomePopUp == "") { //CHECK CAMPO VUOTO
              this.nomeView = this.profilo['0'].nome;
              this.nomeToPass = this.profilo['0'].nome;
            }
          }
        }
      ]
    });

    await alert.present();
    //View Dati inseriti dopo click sul popup di modifica username. Dal console log ho visto come accedere ai dati ricevuti.
    //this.titoloView = await (await alert.onDidDismiss()).data.values.titolo;
  }

  async popupModificaCognome() {
    const alert = await this.alertController.create({
      header: 'Modifica cognome',
      inputs: [
        {
          name: 'cognomePopUp',
          type: 'text',
          placeholder: this.cognomeView //risposta del servizio visualizzaProfilo
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.usernameView = this.profilo['0'].cognome; //annullo modifiche
            console.log('Confirm cancel');
          }
        }, {
          text: 'Ok',
          handler: insertedData => {
            console.log(JSON.stringify(insertedData)); //per vedere l'oggetto dell'handler
            this.cognomeView = insertedData.cognomePopUp; 
            this.cognomeToPass = insertedData.cognomePopUp;

            if (insertedData.cognomePopUp == "") { //CHECK CAMPO VUOTO
              this.cognomeView = this.profilo['0'].cognome;
              this.cognomeToPass = this.profilo['0'].cognome;
            }
          }
        }
      ]
    });

    await alert.present();
    //View Dati inseriti dopo click sul popup di modifica username. Dal console log ho visto come accedere ai dati ricevuti.
    //this.titoloView = await (await alert.onDidDismiss()).data.values.titolo;
  }

  async popupModificaBio() {
    const alert = await this.alertController.create({
      header: 'Modifica bio',
      inputs: [
        {
          name: 'bioPopUp',
          type: 'text',
          placeholder: this.bioView //risposta del servizio visualizzaProfilo
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.bioView = this.profilo['0'].bio; //annullo modifiche
            console.log('Confirm cancel');
          }
        }, {
          text: 'Ok',
          handler: insertedData => {
            console.log(JSON.stringify(insertedData)); //per vedere l'oggetto dell'handler
            this.bioView = insertedData.bioPopUp; 
            this.bioToPass = insertedData.bioPopUp;

            if (insertedData.bioPopUp == "") { //CHECK CAMPO VUOTO
              this.bioView = this.profilo['0'].bio;
              this.bioToPass = this.profilo['0'].bio;
            }
          }
        }
      ]
    });

    await alert.present();
    //View Dati inseriti dopo click sul popup di modifica username. Dal console log ho visto come accedere ai dati ricevuti.
    //this.titoloView = await (await alert.onDidDismiss()).data.values.titolo;
  }

  async popupConfermaModificaProfilo() {
    const alert = await this.alertController.create({
      header: 'Conferma modifiche',
      message: 'Vuoi confermare le modifiche effettuate?',
      buttons: [
        {
          text: "Annulla",
          role: 'cancel'
        },
        {
          text: 'Conferma',
          handler: (value: any) => {

            //LANCIO SERVIZIO MODIFICA UNA VOLTA CLICCATO "CONFERMA"
            this.modify();

          //TODO mostrare messaggio di avvenuta modifica e riportare alla home

            this.presentAlert();

          }
        }
      ],
    });
   
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  async presentAlert() { // Funzione per mostrare a video finestrina che specifica "l'errore"
    const alert = await this.alertController.create({
      header: 'Modifica effettuaTa',
      message: 'Il profilo è stato modificato con successo',
      buttons: [

        {
          text: 'Ok',
          handler: (value: any) => {

          }
        }
      ],
    });

    await alert.present();
  }

}
