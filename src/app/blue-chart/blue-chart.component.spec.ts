/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlueChartComponent } from './blue-chart.component';

describe('BlueChartComponent', () => {
  let component: BlueChartComponent;
  let fixture: ComponentFixture<BlueChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
