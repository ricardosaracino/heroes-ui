import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Hero} from '../models/hero';
import {MessageService} from './message.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:8080/heroes';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /**
   * GET
   * @returns {Observable<Hero[]>}
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  /**
   * GET
   * @param {string} id
   * @returns {Observable<Hero>}
   */
  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
    );
  }

  /**
   * GET hero by id. Return `undefined` when id not found
   *
   * @param {string} id
   * @returns {Observable<Hero>}
   */
  getHero404<Data>(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched gg` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  /**
   * POST
   * @param {Hero} hero
   * @returns {Observable<Hero>}
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * PUT
   * @param {Hero} hero
   * @returns {Observable<Hero>}
   */
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`updated hero w/ id=${hero.name}`)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

  /**
   * DELETE
   * @param {Hero} hero
   * @returns {Observable<Hero>}
   */
  deleteHero(hero: Hero): Observable<Hero> {
    return this.http.request<Hero>('delete', this.heroesUrl, {body: hero}).pipe(
      tap(_ => this.log(`deleted hero id=${hero.name}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.addError(`HeroService ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
