import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input()
  searchRoute = '/search/';

  @Input()
  defaultRoute = '/';

  @Input()
  placeholder = 'Search Food Mine!';

  searchTerm = '';

  constructor(activatedRoute: ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      {
        this.searchTerm = params.searchTerm;
      }
    })
  }

  search(term: string): void {
    if(term)
    {
      // this.router.navigateByUrl('/search/' + term);
      this.router.navigateByUrl(this.searchRoute + term);
    }
    else
    {
      // this.router.navigateByUrl('/');
      this.router.navigateByUrl(this.defaultRoute);
    }
  }

}
