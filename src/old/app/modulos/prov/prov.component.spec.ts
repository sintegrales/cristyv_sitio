import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvComponent } from './prov.component';

describe('ProvComponent', () => {
  let component: ProvComponent;
  let fixture: ComponentFixture<ProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
