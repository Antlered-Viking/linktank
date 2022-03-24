import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxAuthModule, UserService } from '@linktank/ngx-auth';

import { PinPadComponent } from './pin-pad.component';

describe('PinPadComponent', () => {
  let component: PinPadComponent;
  let fixture: ComponentFixture<PinPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxAuthModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
      ],
      declarations: [PinPadComponent],
      providers: [UserService, HttpClient, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
