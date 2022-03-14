import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadStateComponent } from './read-state.component';

describe('ReadStateComponent', () => {
  let component: ReadStateComponent;
  let fixture: ComponentFixture<ReadStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
