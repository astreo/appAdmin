import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import * as ingresoEgresoAct from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSuscription = new Subscription();

  constructor(public ingresoEgresoService: IngresoEgresoService, private store: Store<ingresoEgresoAct.AppState>) { }

  ngOnInit() {
    this.loadingSuscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSuscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    console.log(this.forma.value);
    console.log(this.tipo);

    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire({
          title: 'Creado',
          text: ingresoEgreso.descripcion,
          type: 'success'
        });
        this.forma.reset({ monto: 0 });
      });


  }

}
