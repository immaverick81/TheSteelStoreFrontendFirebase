import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { User } from 'src/app/core/models/user.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  version: string;
  msgs: any[];
  loading = false;

  constructor(
    private userService: UserDataService,
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    public translate: TranslateService,
    private userContextService: UserContextService
  ) {}

  ngOnInit() {
    this.userName = 'admin123@gmail.com';
    this.password = 'admin@123';
    this.version = environment.version;
  }

  onClickLogin() {
    this.loading = true;
    this.userService.login(this.userName, this.password).subscribe(data => {
      if (data?.data?.email) {
        this.loading = false;
        this.routeStateService.add(
          'Dashboard',
          '/main/dashboard',
          null,
          true
        );
        this.userContextService.setUser({
          userName: data.data.username,
          emailId: data.data.email,
          token: data.data.token,
        });
      } else {
        this.toastService.addSingle('error', '', data.message);
      }
    });
    return;
  }
}
