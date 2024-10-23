import { computed, inject, Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { FolderActions } from "../../stores/folder/folder.actions";
import { MainScreenVM } from "./main-screen.vm";
import { fromFolder } from "../../stores/folder/folder.selector";

@Injectable()
export class MainScreenService {
    private readonly store = inject(Store);

    public vm: Signal<MainScreenVM> = computed(() => {
        const isLoading = this.store.selectSignal(fromFolder.selectIsLoading$)();
        const folders = this.store.selectSignal(fromFolder.selectFolders$)() ?? [];
        const error = this.store.selectSignal(fromFolder.selectError$)();

        return {
            folders,
            isLoading,
            error
        };
    });

    public loadItems(): void {
        this.store.dispatch(FolderActions.getFolders());
    }
}