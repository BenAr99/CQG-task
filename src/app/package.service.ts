import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  dependencies = new BehaviorSubject<string[]>([]);
}
