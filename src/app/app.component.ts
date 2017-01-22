import { Component, ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import { MdSidenav, MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Model, Message } from './model';
import { ModelsService } from './models.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav : MdSidenav;
  models:Model[];
  selectedModel = {};
  isDarkTheme: boolean = false;

  constructor(public dialog:MdDialog, public vcr: ViewContainerRef, private modelsService: ModelsService){ }

  ngOnInit(){
    this.models = this.modelsService.getModels();
  }

  openDialog(){
    // dialog config
    const config = new MdDialogConfig();
    config.viewContainerRef = this.vcr;
    // open dialog
    const dialog = this.dialog.open(SettingsDialogComponent, config);
  }

  addMessage(){
    // dialog config
    const config = new MdDialogConfig();
    config.viewContainerRef = this.vcr;
    // open dialog
    const dialog:any = this.dialog.open(MessageDialogComponent, config);
    // pass data to dialog
    dialog.selectedModel = this.selectedModel;
    console.log(dialog);
  }

  showModelDetails(model:Model) {
    this.selectedModel = model;
    this.sidenav.open();
  }
}



@Component({
  selector: 'settings-dialog',
  template: `
  <label>Would you like to receive notifications?</label>
  <md-slide-toggle></md-slide-toggle>
  `
})
export class SettingsDialogComponent{

}

@Component({
  selector: 'message-dialog',
  template:`
  <form (submit)="addMessage()">
    <md-input-container>
      <input md-input placeholder="Message" name="content" [(ngModel)]="content">
    </md-input-container>
    <button md-raised-button color="primary">Add Message</button>
  </form>
  `
})
export class MessageDialogComponent{
  content:string = "";

  constructor(private dialogRef: MdDialogRef<MessageDialogComponent>) {
  }

  addMessage(){
    const selectedModel = (<MdDialogRef<MessageDialogComponent> & ISelectedModel> this.dialogRef).selectedModel;
    selectedModel.messages.push({
        who: 'Jaime',
        message: this.content
      });
    this.dialogRef.close();
  }
}

interface ISelectedModel{
  selectedModel: Model;
}