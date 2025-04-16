import {ChangeDetectionStrategy, Component, Input,} from '@angular/core';
import {Package} from '../dashboard/services/package-api.service';
import {SplitPathPipe} from '../dashboard/pipes/split-path.pipe';
import {FormatNumberWithSuffixPipe} from '../dashboard/pipes/format-number-with-suffix.pipe';
import {PackageService} from '../package.service';
import {AsyncPipe} from '@angular/common';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [
    SplitPathPipe,
    FormatNumberWithSuffixPipe,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  isDependence: Observable<boolean>;
  @Input() data?: Package

  constructor(
    private packageService: PackageService,
  ) {
    this.isDependence = this.packageService.dependencies.pipe(
      map(value => {
        if (this.data) {
          return value.includes(this.data?.id);
        }
        return false
      })
    )
  }

}
