import {ChangeDetectionStrategy, Component, DestroyRef,} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {Package, PackageApiService} from './services/package-api.service';
import {debounceTime, map, Observable, startWith, switchMap, take} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PackageService} from '../package.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
  ]
})

export class DashboardComponent {
  filter: FormControl = new FormControl('');
  packages: Observable<Package[]>;

  constructor(private packageApiService: PackageApiService, private packagesService: PackageService, private destroyRef: DestroyRef) {
    this.packages = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((search: string) => {
        return this.packageApiService.getPackages().pipe(
          map((value) => {
            if (search) {
              return value.filter((item) => {
                return item.id.includes(search)
              })
            }
            return value
          })
        )
      })
    )
  }

  // Если хотим уменьшить количество запросов на бэкенд при быстром перемещении по карточкам,
  // можно использовать этот вариант.

  // ngOnInit() {
  //   this.dependenciesSubject.pipe(
  //     debounceTime(200),
  //     switchMap((id: string) => {
  //       return this.packageApiService.getDependenciesPackages(id)
  //     }),
  //     takeUntilDestroyed(this.destroyRef),
  //   ).subscribe((value) => {
  //     this.packagesService.dependencies.next(value)
  //   })
  // }

  triggerDependencies(id?: string): void {
    if (id) {
      this.packageApiService.getDependenciesPackages(id).pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((deps) => {
        this.packagesService.dependencies.next(deps)
      })
    } else {
      this.packagesService.dependencies.next([])
    }
  }

  reload(): void {
    this.filter.setValue('')
  }
}




