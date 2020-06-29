import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean;
  currentLanguage: string;
  constructor(
    private loginService: LoginService,
    public userService: UserService,
    private router: Router,
    private translateService: TranslateService) {
  }
  
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });

      if(this.translateService.defaultLang === 'hr'){
        this.currentLanguage = "Hrvatski"
      }
      else if(this.translateService.defaultLang === 'en'){
        this.currentLanguage = "English"
      }
      else if(this.translateService.defaultLang === 'ru'){
        this.currentLanguage = "Română"
      };  
      
  }

  onLanguageChange(lang: string): void{
    this.translateService.use(lang);
    if(lang === 'hr'){
      this.currentLanguage = "Hrvatski"
      }
    else if(lang === 'en'){
      this.currentLanguage = "English"
      }
    else if(lang === 'ru'){
      this.currentLanguage = "Română"
        }
        
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }
}
