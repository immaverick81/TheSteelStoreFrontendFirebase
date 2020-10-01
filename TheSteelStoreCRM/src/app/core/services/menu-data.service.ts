import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {
  public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  getCrmMenuList(): CustomMenuItem[] {
    return [
      {
        Label: 'Home',
        Icon: 'fa-home',
        RouterLink: '/crm/dashboard',
        Childs: null,
        IsChildVisible: false,
      },
      {
        Label: 'CRM',
        Icon: 'fa-users',
        RouterLink: '/crm/crm-list',
        Childs: null,
        IsChildVisible: false,
      },
    ];
  }

  getMenuList(): CustomMenuItem[] {
    return [
      {
        Label: 'Home',
        Icon: 'fa-home',
        RouterLink: '/main/dashboard',
        Childs: null,
        IsChildVisible: false,
      },
      {
        Label: 'Steel Store List',
        Icon: 'fa-users',
        RouterLink: '/main/steel',
        Childs: [
          {
            Label: 'Galvanized',
            Icon: '',
            RouterLink: '/main/steel',
            Childs: null,
            IsChildVisible: false,
          },
          {
            Label: 'Galvalume',
            Icon: '',
            RouterLink: '/main/steel',
            Childs: null,
            IsChildVisible: false,
          },
          {
            Label: 'Galvaneal',
            Icon: '',
            RouterLink: '/main/steel',
            Childs: null,
            IsChildVisible: false,
          },
          {
            Label: 'Hot Rolled',
            Icon: '',
            RouterLink: '/main/steel',
            Childs: null,
            IsChildVisible: false,
          },
          {
            Label: 'Cold Rolled',
            Icon: '',
            RouterLink: '/main/steel',
            Childs: null,
            IsChildVisible: false,
          },
          {
            Label: 'Electro Galvanized',
            Icon: '',
            RouterLink: '/main/steel',
            Childs: null,
            IsChildVisible: false,
          },
        ],
        IsChildVisible: false,
      },
      // {
      //   Label: 'AboutUs',
      //   Icon: 'fa-info-circle',
      //   RouterLink: '/main/aboutus',
      //   Childs: null,
      //   IsChildVisible: false,
      // },
      // {
      //   Label: 'ContactUs',
      //   Icon: 'fa-envelope',
      //   RouterLink: '/main/contactus',
      //   Childs: null,
      //   IsChildVisible: false,
      // },
      // {
      //     Label: 'Error 404', Icon: 'fa-exclamation-triangle', RouterLink: '/error', Childs: null, IsChildVisible: false
      // },
      // {
      //     Label: 'Menu Level 1', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
      //         { Label: 'Menu Level 1.1', RouterLink: null, Childs: null, IsChildVisible: false },
      //         {
      //             Label: 'Menu Level 1.2', RouterLink: null, IsChildVisible: false, Childs: [
      //                 { Label: 'Menu Level 1.2.1', RouterLink: null, Childs: null, IsChildVisible: false },
      //                 { Label: 'Menu Level 1.2.2', RouterLink: null, Childs: null, IsChildVisible: false }
      //             ]
      //         }
      //     ], IsChildVisible: false
      // }
    ];
  }
}
