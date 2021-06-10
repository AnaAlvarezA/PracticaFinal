import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-addContact',
  templateUrl: './addContact.component.html',
  styleUrls: ['./addContact.component.css']
})

export class AddContactComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  
  @ViewChild('resetContactForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  contactForm: FormGroup;
  favouriteColours: any = ['Rojo', 'Azul', 'Amarillo', 'Verde'
   ];

  ngOnInit() {
    this.submitInputForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private contactApi: ApiService
  ) { }

  // Formulario Reactivo
  submitInputForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      age: ['', [Validators.required]],
      dni: ['', Validators.pattern(/^[0-9]{8}[A-Za-z]{1}$/)],
      birthday: ['', [Validators.required]],
      favouriteColour: ['Azul'],
      sex: ['No Especificado'],
      notes: ['']
    })
  }

  
  // Fecha
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.contactForm.get('birthday').setValue(convertDate, {
      onlyself: true
    })
  }  

  // Errores 
  public handleError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }  

  // Añadir
  submitContactForm() {
    if (this.contactForm.valid) {
      this.contactApi.AddContact(this.contactForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/listContacts'))
      });
    }
  }

}