import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterDataService {
  routerData: any;
  constructor() { }

  get getRoutedData(): any {
    return this.routerData;
  }

  setRouterData(data) {
    this.routerData = data;
  }
}
