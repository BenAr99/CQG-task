import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface Package {
  id: string,
  weeklyDownloads: number,
  dependencyCount: number,
}

@Injectable({
  providedIn: 'root'
})

export class PackageApiService {

  constructor(private http: HttpClient) {}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>("http://localhost:3000/packages");
  }

  getID(): Observable<string> {
    return this.http.get<string>('http://localhost:3000/packages/${id}')
  }

  getDependenciesPackages(id: string) :Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/packages/${encodeURIComponent(id)}/dependencies`);
  }
}
