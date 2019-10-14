import { IngresoEgreso } from './../ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import * as ingresoEgresoAct from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription = new Subscription();

  constructor(private store: Store<ingresoEgresoAct.AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal.fire({
          title: 'Eliminado',
          text: item.descripcion,
          type: 'success'
        });
      })
      ;
  }

}
