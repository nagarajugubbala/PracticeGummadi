import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { TokenService } from '../shared/token.service';

export class User {
  id!: number;
  name!: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  links = ['home', 'about-us', 'service', 'projects', 'core-values', 'contact-us'];
  titles = ['Home', 'About Us', 'Service', 'Projects', 'Core Values', 'Contact Us'];
  activeLink = this.links[0];
  id!: number;
  userProfile!: User;
  isSignedIn!: boolean;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public userService: UserService,
    private http: HttpClient
  ) {
    this.userService.find(this.id).subscribe((data: any) => {
      this.userProfile = data;
      console.log(this.userProfile);
    });
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

  //image upload
  url: any;
  onSelectFile(event: any, id: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

  public delete() {
    this.url = null;
  }
}
