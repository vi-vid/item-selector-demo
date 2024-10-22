import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemSelectorComponent } from '../../shared/components/item-selector/item-selector.component';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [ItemSelectorComponent],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainScreenComponent {

}
