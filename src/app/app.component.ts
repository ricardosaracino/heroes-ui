import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Tour of Heroes' });
    this.meta.addTag({ name: 'author', content: 'Ricardo Saracino' });
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' });
  }
}
