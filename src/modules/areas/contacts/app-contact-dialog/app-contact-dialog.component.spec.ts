import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppContactDialogComponent } from './app-contact-dialog.component';
import { GraphQLService } from '../../../../kernel/graph-ql/graph-ql.service';
import { Apollo } from 'apollo-angular';
import { ApolloMock } from '../../../../kernel/mock/apollo.mock';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('AppContactDialogComponent', () => {
  let component: AppContactDialogComponent;
  let fixture: ComponentFixture<AppContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [ AppContactDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        GraphQLService,
        { provide: Apollo, useClass: ApolloMock }
      ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(AppContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty form initially', () => {
    expect(component.contactForm!.valid).toBeFalse();
  });
});
