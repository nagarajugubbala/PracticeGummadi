import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id!: number;
  UserProfile!: User;
  constructor(public userService: UserService,) {
    this.userService.find(this.id).subscribe((data: User) => {
      this.UserProfile = data;
    });
  }

  ngOnInit(): void {
  }

  //image upload
  url: any;
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }

    this.userService.update(this.id, this.url).subscribe((data: User) => {
      this.UserProfile = data;
    });
  }

  public delete() {
    this.url = null;
  }

}
