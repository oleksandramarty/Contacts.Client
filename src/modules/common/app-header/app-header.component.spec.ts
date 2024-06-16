import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';
import {MatToolbarModule} from "@angular/material/toolbar";

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,

        MatToolbarModule
      ],
      declarations: [ AppHeaderComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject Router for testing
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the specified URL', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const url = '/contacts';

    component.goto(url);

    expect(navigateSpy).toHaveBeenCalledWith([url]);
  });

});
