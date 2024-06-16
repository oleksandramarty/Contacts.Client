import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GraphQLService} from "../../../../kernel/graph-ql/graph-ql.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IContactModel} from "../../../../kernel/models/contacts/contact.model";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './app-contact-dialog.component.html',
  styleUrl: './app-contact-dialog.component.scss'
})
export class AppContactDialogComponent implements OnInit, OnDestroy{
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public contactForm: FormGroup | undefined;
  public id: number | undefined;
  public contact: IContactModel | undefined;
  public isEdit = false;

  constructor(
      public dialogRef: MatDialogRef<AppContactDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: number | undefined,
      private readonly graphQLService: GraphQLService,
      private readonly snackBar: MatSnackBar,
  ) {
    this.id = data;
    this.isEdit = !this.id;
  }

  get isNew(): boolean {
    return !this.id;
  }

  get actionButtonLabel(): string {
    return this.isNew ? 'Create contact' : 'Edit contact';
  }

  get fc(): any {
    return this.contactForm?.controls!;
  }

  ngOnInit(): void {
    if (!!this.id) {
      this.getContactById();
    } else {
      this.isEdit = true;
      this.createContactForm();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getContactById(): void {
    this.graphQLService.getContactById(this.id)
        .pipe(
            takeUntil(this.ngUnsubscribe),
            tap((result) => {
              this.contact = result?.data?.contact;
              this.createContactForm();
            }),
        ).subscribe();
  }

  public onActionButtonClicked(): void {
    (this.isNew ?
            this.graphQLService.createContact({
              firstName: this.contactForm?.value.firstName,
              lastName: this.contactForm?.value.lastName,
              email: this.contactForm?.value.email,
              phone: this.contactForm?.value.phone,
              title: this.contactForm?.value.title,
              middleInitial: this.contactForm?.value.middleInitial,
            }) :
            this.graphQLService.updateContact({
              id: this.id,
              firstName: this.contactForm?.value.firstName,
              lastName: this.contactForm?.value.lastName,
              email: this.contactForm?.value.email,
              phone: this.contactForm?.value.phone,
              title: this.contactForm?.value.title,
              middleInitial: this.contactForm?.value.middleInitial,
            })
    ).pipe(
            takeUntil(this.ngUnsubscribe),
            tap(() => {
              this.snackBar.open(`Contact has been ${this.isNew ? 'created' : 'updated'}`, 'Close', { duration: 3000 });
              this.dialogRef.close(true);
            }),
            handleApiError(this.snackBar)
        ).subscribe();
  }

  public onEditChanged(): void {
    if (this.isNew) {
      return;
    }
    this.isEdit = !this.isEdit;
    this.mapDisabled();
  }

  private mapDisabled(): void {
    if (this.isEdit) {
      Object.keys(this.contactForm?.controls!).forEach(control => {
        this.contactForm!.get(control)!.enable();
      });
    } else {
      Object.keys(this.contactForm?.controls!).forEach(control => {
        this.contactForm!.get(control)!.disable();
      });
    }
  }

  private createContactForm() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{11}$/)]),
      title: new FormControl('', Validators.required),
      middleInitial: new FormControl('', Validators.maxLength(1)),
    });

    this.mapDisabled();

    if (!!this.contact) {
      this.contactForm.get('firstName')!.setValue(this.contact.firstName);
      this.contactForm.get('lastName')!.setValue(this.contact.lastName);
      this.contactForm.get('email')!.setValue(this.contact.email);
      this.contactForm.get('phone')!.setValue(this.contact.phone);
      this.contactForm.get('title')!.setValue(this.contact.title);
      this.contactForm.get('middleInitial')!.setValue(this.contact.middleInitial);
    }
  }
}
