import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-bindings',
  imports: [
    FormsModule,
  ],
  templateUrl: './data-bindings.component.html',
  styleUrl: './data-bindings.component.css',
})
export class DataBindingsComponent {
  firstname = "Mike";

  imageSrc = "oeil.jpg";

  githubLabel = "GitHub PhiSyX";
  githubUrl = "https://github.com/PhiSyX";

  isChecked = true;

  isDisabled = false
  toggleBtn = "Désactiver";
  toggleDisable() {
    this.isDisabled = ! this.isDisabled;
    if (this.isDisabled) {
      this.toggleBtn = "Activer";
    } else {
      this.toggleBtn = "Désactiver";
    }
  }

  inputModel = "Mon message";

  showMessage() {
    alert(this.inputModel);
  }
}
