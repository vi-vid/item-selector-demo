import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ItemSelectorComponent } from '../../shared/components/item-selector/item-selector.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MainScreenService } from './main-screen.service';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [ItemSelectorComponent, ReactiveFormsModule],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MainScreenService]
})
export class MainScreenComponent {
  public mainScreenService = inject(MainScreenService);
  public vm = this.mainScreenService.vm;

  public formControl = new FormControl<Set<number>>(new Set([]));

  constructor() {
    this.mainScreenService.loadItems();
  }


  public get formControlValue(): string {
    return [...this.formControl.value?.values() ?? []].join(', ')
  }
}
