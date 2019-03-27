import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { tick } from '@angular/core/testing';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  typeOfTab: string;
  typeOfUser: Boolean = true;
  roles: any;
  role: string;
  superAdmin: boolean;
  caption: string = '';
  constructor(private router: Router, private ss: SharedService) {
    const res = JSON.parse(sessionStorage.getItem('firstLogin'));
    console.log(res);
    if  (res != null) {
      this.roles = res['roles'];
      // this.roles.forEach(element => {
      //   if (element === 'USER_ADMIN') {
      //     this.role = 'superUser';
      //   } else if (element === 'ADMIN_VERIFIER' || element === 'ADMIN_CHECKER' || element === 'ADMIN_APPROVER') {
      //     this.role = 'Admin';
      //   }  else if (element === 'USER') {
      //     this.role = 'Customer';
      //   } else if (element === 'USER_SIGNER' || element === 'USER_VIEWER') {
      //     this.role = 'User';
      //   }
      // });
      // tslint:disable-next-line:max-line-length
      if ((this.roles.includes('USER_ADMIN') )) {
        this.role = 'superUser';
      // tslint:disable-next-line:max-line-length
      } else if ((this.roles.includes('USER')) ) {
        this.role = 'User';
      // tslint:disable-next-line:max-line-length
      } else if (this.roles.includes('ADMIN_VERIFIER') || this.roles.includes('ADMIN_CHECKER') || this.roles.includes('ADMIN_APPROVER')  ) {
        this.role = 'Admin';
      // tslint:disable-next-line:max-line-length
      } else {
        this.role = 'Fusang User';
      }

      if ((this.roles.includes('SUPER_ADMIN') )) {
          this.superAdmin = true;
      }
      console.log(this.role);
    if (res['typeOfUser'] === 'User') {
      this.typeOfUser = false;
    }
  }
  }
  ngOnInit() {
    this.ss.SharedTypeInfo$.subscribe(res => {
      this.typeOfTab = res;
    });
    this.ss.currentMessage.subscribe(val => this.caption = val);
  }
  userProfile() {
    this.router.navigate(['/fusang/ticket']);
  }
}
