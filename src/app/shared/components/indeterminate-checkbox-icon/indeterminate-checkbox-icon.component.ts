import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-indeterminate-checkbox-icon',
  standalone: true,
  imports: [],
  templateUrl: './indeterminate-checkbox-icon.component.html',
  styleUrl: './indeterminate-checkbox-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndeterminateCheckboxIconComponent {
  public selected = input.required<boolean>();
  public indeterminate = input<boolean>(false);
}
