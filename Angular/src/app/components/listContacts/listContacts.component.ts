import { Person } from './../../interfaces/person';
import { ApiService } from './../../services/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listContacts',
  templateUrl: './listContacts.component.html',
  styleUrls: ['./listContacts.component.css']
})

export class ListContactsComponent implements OnInit {
  ContactData: any = [];
  dataSource: MatTableDataSource<Person>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'name', 'surnames', 'favouriteColour', 'action'];

  constructor(private contactApi: ApiService) {
    this.contactApi.GetContacts().subscribe(data => {
      this.ContactData = data;
      this.dataSource = new MatTableDataSource<Person>(this.ContactData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteContact(index: number, e){
    if(window.confirm('¿ Seguro que quieres borrarlo')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.contactApi.DeleteContact(e._id).subscribe()
    }
  }

}