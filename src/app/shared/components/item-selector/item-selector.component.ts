import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import collapseAnimation from '../../animations/collapse-animation';
import { ItemSelectorFolder, ItemSelectorItem } from './item-selector.vm';
import { IndeterminateCheckboxIconComponent } from '../indeterminate-checkbox-icon/indeterminate-checkbox-icon.component';
import { flattenFolderItems, flattenFolders, isFolderFullySelected, isFolderPartiallySelected, sortByTitleRecursively } from './item-selector.helpers';

@Component({
  selector: 'app-item-selector',
  standalone: true,
  imports: [CommonModule, IndeterminateCheckboxIconComponent],
  templateUrl: './item-selector.component.html',
  styleUrl: './item-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapseAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectorComponent),
      multi: true,
    }
  ]
})
export class ItemSelectorComponent implements ControlValueAccessor {
  private onChange: (value: Set<number>) => void = (value: Set<number>) => {};
  private onTouched: () => void = () => {};

  public folders = input.required<ItemSelectorFolder[]>();
  private listElement = viewChild.required<ElementRef>('list');

  public selectedIds: WritableSignal<Set<number>> = signal(new Set([]));
  public collapsedFolders: WritableSignal<Set<number>> = signal(new Set([]));

  public options = computed(() => {
    return sortByTitleRecursively(this.folders());
  });

  public fullySelectedFolders: Signal<Set<number | null>> = computed(() => {
    return new Set(
      flattenFolders(this.options())
        .map((item) => isFolderFullySelected(item, this.selectedIds()) ? item.id : null)
    );    
  });

  public partiallySelectedFolders: Signal<Set<number | null>> = computed(() => {
    return new Set(
      flattenFolders(this.options())
        .map((item) => isFolderPartiallySelected(item, this.selectedIds()) ? item.id : null)
    );    
  });

  public writeValue(value: Set<number> | null): void {
    this.selectedIds.set(value || new Set([]));
  }

  public registerOnChange(fn: (value: Set<number>) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public toggleSelectedItem(id: number): void {    
    this.selectItems([id]);
  }

  public selectFolder(id: number) {
    const folder = flattenFolders(this.options()).find((item) => item.id === id);

    if (folder ) {
      this.selectItems(flattenFolderItems([folder]).map((item) => item.id), !this.fullySelectedFolders().has(folder.id));
    }
  }

  public toggleFolder(id: number, event: Event): void {
    event.stopImmediatePropagation();

    this.collapsedFolders.update((collapsedFolders) => {
      const newState = !collapsedFolders.has(id);

      if (newState) {
        collapsedFolders.add(id);
      } else {
        collapsedFolders.delete(id);
      }

      return collapsedFolders;
    })
  }

  public touchControl(event: FocusEvent): void {
    if(!(this.listElement().nativeElement as HTMLElement).contains(event.relatedTarget as HTMLElement)) {
      this.onTouched();
    }
  }

  private selectItems(ids: number[], value?: boolean): void {
    const selectedIds = this.selectedIds();

    ids.forEach((id) => {
      const newState = value ?? !selectedIds.has(id);
    
      if (newState) {
        selectedIds.add(id);
      } else {
        selectedIds.delete(id);
      }
    });

    this.onChange(selectedIds);
    this.selectedIds.set(new Set(selectedIds));
  }
}
