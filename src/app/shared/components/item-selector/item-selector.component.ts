import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-selector',
  standalone: true,
  imports: [],
  templateUrl: './item-selector.component.html',
  styleUrl: './item-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemSelectorComponent {

}
