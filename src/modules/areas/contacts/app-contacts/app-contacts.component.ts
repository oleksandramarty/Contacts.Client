import { Component, OnDestroy, OnInit } from '@angular/core';
import { GraphQLService } from '../../../../kernel/graph-ql/graph-ql.service';
import { IPaginatorModel } from '../../../../kernel/models/common/paginator.model';
import { IBaseSortableModel } from '../../../../kernel/models/common/base-sortable.model';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { IListWithIncludeModel } from '../../../../kernel/models/common/list-with-include.model';
import { IContactModel } from '../../../../kernel/models/contacts/contact.model';
import { handleApiError } from '../../../../kernel/helpers/rxjs.helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppContactDialogComponent } from '../app-contact-dialog/app-contact-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './app-contacts.component.html',
  styleUrl: './app-contacts.component.scss'
})
export class AppContactsComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public paginator: IPaginatorModel = { pageNumber: 1, pageSize: 5, isFull: false };
  public sort: IBaseSortableModel = { column: 'Id', direction: 'asc' };
  public filteredContacts: IListWithIncludeModel<IContactModel> | undefined;
  public filteredSub: any = null;
  public searchForm: FormGroup = new FormGroup({
    searchLabel: new FormControl('')
  });
  public displayedColumns: string[] = [
    'Open',
    'Delete',
    'Id',
    'FirstName',
    'LastName',
    'Email',
    'Phone',
    'Title',
    'MiddleInitial'
  ];
  public dataSource = new MatTableDataSource<IContactModel>([]);

  constructor(
      private graphQLService: GraphQLService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
  ) {}

  get fv(): any {
    return this.searchForm?.value;
  }

  ngOnInit(): void {
    this.setDefaultState();
    this.onSearchInit();
    this.getFiltered();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSearchInit(): void {
    this.searchForm.get('searchLabel')?.valueChanges
        .pipe(
            takeUntil(this.ngUnsubscribe),
            debounceTime(500),
            tap(() => {
              this.getFiltered();
            }),
            handleApiError(this.snackBar)
        ).subscribe();
  }

  public resetFilter(): void {
    this.setDefaultState();
    this.getFiltered();
  }

  public getFiltered(): void {
    if (this.filteredSub) {
      this.filteredSub.unsubscribe();
    }

    this.filteredSub = this.graphQLService.getFilteredContacts(this.fv.searchLabel, this.paginator, this.sort)
        .pipe(
            takeUntil(this.ngUnsubscribe),
            tap((result) => {
              this.filteredContacts = result?.data.contacts;
              this.dataSource!.data = this.filteredContacts?.entities as IContactModel[];
            }),
            handleApiError(this.snackBar)
        ).subscribe();
  }

  public pageChanged(event: any): void {
    this.paginator.pageNumber = (event?.pageIndex ?? 0) + 1;
    this.paginator.pageSize = event?.pageSize ?? 5;
    this.getFiltered();
  }

  public sortChanged(sortState: Sort): void {
    this.sort.column = sortState.active;
    this.sort.direction = sortState.direction;
    this.getFiltered();
  }

  public confirmDelete(id: number): void {
    const result = confirm('Do you want to delete this contact?');
    if (result) {
      this.graphQLService.deleteContact(id)
          .pipe(
              takeUntil(this.ngUnsubscribe),
              tap(() => {
                this.snackBar.open('Contact has been deleted', 'Close', { duration: 3000 });
                this.getFiltered();
              }),
              handleApiError(this.snackBar)
          ).subscribe();
    }
  }

  public openContactInfo(id?: number): void {
    const dialogRef = this.dialog.open(AppContactDialogComponent, {
      width: '600px',
      maxWidth: '80vw',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFiltered();
      }
    });
  }

  private setDefaultState(): void {
    this.paginator = {
      pageNumber: 1,
      pageSize: 5,
      isFull: false
    };

    this.sort = {
      column: 'Id',
      direction: 'asc'
    };

    if (!!this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = 0;
      this.dataSource.paginator.pageSize = 5;
    }

    if (this.searchForm) {
      this.searchForm.get('searchLabel')?.setValue(null);
    }
  }
}
