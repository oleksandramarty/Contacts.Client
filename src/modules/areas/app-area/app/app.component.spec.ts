import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppCommonModule} from "../../../common/app-common.module";
import {RouterOutlet} from "@angular/router";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports:[RouterOutlet, AppCommonModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
