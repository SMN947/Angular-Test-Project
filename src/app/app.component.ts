import { Component, VERSION } from '@angular/core';
import { RequestsService } from './services/requests.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private request: RequestsService) {
    this.loadUsers();
  }
  name = 'Angular ' + VERSION.major;

  public listUsers: any[] = [];
  public listUsersFiltered: any[] = [];
  public nameFilter: String = '';
  public lastNameFilter: String = '';
  public cityFilter: String = '';
  public listCities: any = {};
  public sliders: any[any] = [true, false, false, true, false];
  public hasAccess: boolean = false;

  loadUsers() {
    this.request.getListUsers().subscribe((data: any) => {
      console.log(data);
      this.listUsers = data;
      this.listUsersFiltered = data;
      this.updateListCities();
    });
  }
  updateListCities() {
    this.listUsers.map((el) => {
      if (this.listCities[el.address.city.toLowerCase()] == undefined) {
        this.listCities[el.address.city] = true;
      }
    });
  }
  filtrar(ev, tipo) {
    this.nameFilter =
      tipo == 'N' ? ev.target.value.toLowerCase() : this.nameFilter;
    this.lastNameFilter =
      tipo == 'A' ? ev.target.value.toLowerCase() : this.lastNameFilter;
    this.cityFilter =
      tipo == 'C' ? ev.target.value.toLowerCase() : this.cityFilter;

    this.listUsersFiltered = this.listUsers.filter((el) => {
      let userName = el.name.firstname.toLowerCase();
      let userLastName = el.name.lastname.toLowerCase();
      let userCity = el.address.city.toLowerCase();
      if (
        userName.includes(this.nameFilter) &&
        userLastName.includes(this.lastNameFilter) &&
        userCity.includes(this.cityFilter)
      ) {
        return el;
      }
    });
  }
}
