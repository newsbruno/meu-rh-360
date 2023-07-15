/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RateItemComponent } from './rate-item.component';

describe('RateItemComponent', () => {
  let component: RateItemComponent;
  let fixture: ComponentFixture<RateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
