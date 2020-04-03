import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map, filter, distinctUntilChanged} from 'rxjs/operators';

import { BreadCrumb } from './breadcrumbs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {

  visible = true;
  breadcrumbs: BreadCrumb[];
  // Build breadcrumb starting with the root route of your current activated route

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ?
                  route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : ''
                  : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';

    // Hide breadcrumbs if no label
    // this.visible = !(label === '');

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };

    const newBreadcrumbs = label === '' ? breadcrumbs : [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        // If we are not on our current path yet,
        // there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    if (newBreadcrumbs.length > 1) {
      const lastpath = newBreadcrumbs[newBreadcrumbs.length - 1];
      if (lastpath.url.includes('results')) {
        const dashboardUrl = lastpath.url.slice(0, lastpath.url.lastIndexOf('/result')) + '/dashboard/';
        newBreadcrumbs.splice(newBreadcrumbs.length - 1, 1, ...[{
          'url': dashboardUrl,
          'label': 'Dashboard'
        }, lastpath]);
      }
    }
    return newBreadcrumbs;
  }

}
