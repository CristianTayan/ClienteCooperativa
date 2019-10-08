import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagosComponent } from './lista-pagos.component';

describe('ListaPagosComponent', () => {
  let component: ListaPagosComponent;
  let fixture: ComponentFixture<ListaPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
