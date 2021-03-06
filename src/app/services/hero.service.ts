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
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`Fetched Heroes ${heroes.length}`)),
      catchError(this.handleError(`Fetch Heroes`, []))
    );
  }

  /**
   * GET
   * @param {string} id
   * @returns {Observable<Hero>}
   */
  public getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(hero => this.log(`Fetched Hero ${hero.name}`)),
      catchError(this.handleError<Hero>(`Fetch Hero`)),
    );
  }

  /**
   * GET hero by id. Return `undefined` when id not found
   *
   * @param {string} id
   * @returns {Observable<Hero>}
   */
  public getHero404<Data>(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
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
  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((_hero: Hero) => this.log(`Added Hero ${_hero.name}`)),
      catchError(this.handleError<Hero>(`Add Hero ${hero.name}`))
    );
  }

  /**
   * PUT
   * @param {Hero} hero
   * @returns {Observable<Hero>}
   */
  public updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((_hero: Hero) => this.log(`Updated Hero ${_hero.name}`)),
      catchError(this.handleError<Hero>(`Update Hero ${hero.name}`))
    );
  }

  /**
   * DELETE
   * @param {Hero} hero
   * @returns {Observable<Hero>}
   */
  public deleteHero(hero: Hero): Observable<Hero> {
    return this.http.request<Hero>('delete', this.heroesUrl, {body: hero}).pipe(
      tap(_hero => this.log(`Deleted Hero ${_hero.name}`)),
      catchError(this.handleError<Hero>(`Delete Hero ${hero.name}`))
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

      // TODO: this is a fucking mess
      const message = error.error.error ? error.error.error : (error.error ? error.error : error.message);

      // TODO: better job of transforming error for user consumption
      this.messageService.addError(`${operation} failed: ${message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`${message}`);
  }
}
