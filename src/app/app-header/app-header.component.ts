import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  isAuthenticated: boolean
  name: string

  constructor() { }


  ngOnInit() {
  }

  logIn() {
    this.isAuthenticated = true
    this.name = 'John Doe'
  }

  logOut() {
    this.isAuthenticated = false
  }

}
