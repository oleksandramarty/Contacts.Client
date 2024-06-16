import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppContactsComponent } from './app-contacts.component';
import { GraphQLService } from '../../../../kernel/graph-ql/graph-ql.service';
import { Apollo } from 'apollo-angular';
import { ApolloMock } from '../../../../kernel/mock/apollo.mock';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('AppContactsComponent', () => {
  let component: AppContactsComponent;
  let fixture: ComponentFixture<AppContactsComponent>;
  let graphQLService: GraphQLService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [AppContactsComponent],
      providers: [
        GraphQLService,
        { provide: Apollo, useClass: ApolloMock }
      ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContactsComponent);
    component = fixture.componentInstance;

    component.paginator = { pageSize: 5, pageNumber: 1, isFull: false };

    graphQLService = TestBed.inject(GraphQLService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearchInit on ngOnInit', () => {
    spyOn(component, 'onSearchInit').and.callThrough();
    component.ngOnInit();
    expect(component.onSearchInit).toHaveBeenCalled();
  });

  it('should initialize searchForm', () => {
    component.onSearchInit();
    expect(component.searchForm).toBeTruthy();
    expect(component.searchForm.get('searchLabel')).toBeTruthy();
  });
});
