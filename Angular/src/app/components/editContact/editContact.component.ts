import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-editContact',
  templateUrl: './editContact.component.html',
  styleUrls: ['./editContact.component.css']
})

export class EditContactComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetContactForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  contactForm: FormGroup;
  favouriteColours: any = ['Rojo', 'Azul', 'Amarillo', 'Verde'];

  ngOnInit() {
    this.updateInputForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private contactApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.contactApi.GetContact(id).subscribe(data => {
      this.contactForm = this.fb.group({
        name: [data.name, [Validators.required]],
        surnames: [data.surnames, [Validators.required]],
        age: [data.age, [Validators.required]],
        dni: [data.dni, [Validators.required]],
        birthday: [data.birthday, [Validators.required]],
        favouriteColour: [data.favouriteColour, [Validators.required]],
        sex: [data.sex],
        notes: [data.notes]
      })      
    })    
  }

  // Formulario Reactivo
  updateInputForm() {
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

  // Modificar
  updateContactForm() {
    console.log(this.contactForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('¿Seguro que quieres modificarlo?')) {
      this.contactApi.UpdateContact(id, this.contactForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/listContacts'))
      });
    }
  }
  
}
