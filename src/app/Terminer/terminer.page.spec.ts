import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { TerminerPage } from './terminer.page';

describe('TerminerPage', () => {
  let component: TerminerPage;
  let fixture: ComponentFixture<TerminerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminerPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TerminerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
