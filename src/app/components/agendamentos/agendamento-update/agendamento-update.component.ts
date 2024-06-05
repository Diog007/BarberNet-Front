import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { Agendamentos } from '../../../models/Agendamentos';
import { Clientes } from '../../../models/Clientes';
import { Cabeleireiros } from '../../../models/Cabeleireiros';
import { ClientesService } from '../../../services/clientes.service';
import { CabeleireirosService } from '../../../services/cabeleireiros.service';
import { ToastrService } from 'ngx-toastr';
import { AgendamentoService } from '../../../services/agendamento.service';

@Component({
  selector: 'app-agendamento-update',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule,
     MatButtonModule, ReactiveFormsModule, 
     CommonModule, RouterLink,  MatDatetimepickerModule, MatNativeDatetimeModule],
  templateUrl: './agendamento-update.component.html',
  styleUrl: './agendamento-update.component.css'
})
export class AgendamentoUpdateComponent implements OnInit{
  ngOnInit(): void {
    this.agendamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllCabeleireiros();
  }

  agendamento: Agendamentos = {
    id: '',
    cabeleireiro: '',
    cliente: '',
    nomeCabeleireiro: '',
    nomeCliente: '',
    criacao: '',
    data: '',
    precoEstimado: '',
    statusAgendamento: '',
    metodoPagamento: '',
  }

  clientes: Clientes[] = [];
  cabeleireiros: Cabeleireiros[] = [];

  cabeleireiro: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])
  data: FormControl = new FormControl(null, [Validators.required])
  precoEstimado: FormControl = new FormControl(null, [Validators.required])
  statusAgendamento: FormControl = new FormControl(null, [Validators.required])
  metodoPagamento: FormControl = new FormControl(null, [Validators.required])

  constructor (
    private clienteService: ClientesService,
    private cabeleireiroService: CabeleireirosService,
    private agendamentoService: AgendamentoService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
  ) {  }

  update(): void {
    this.agendamentoService.update(this.agendamento).subscribe (resposta => {
      this.toastService.success('Agendamento atualizado com sucesso!', "Atualizar");
      this.router.navigate(['agendamentos']);     
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findById(): void {
    this.agendamentoService.findById(this.agendamento.id).subscribe(resp => {
      this.agendamento = resp;
    }, ex => {
      this.toastService.error(ex.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(respostaCliente => {
      this.clientes = respostaCliente;
    })
  }

  findAllCabeleireiros(): void {
    this.cabeleireiroService.findAll().subscribe(respostaCab => {
      this.cabeleireiros = respostaCab;
    })
  }

  validaCampos(): boolean {
    return this.cabeleireiro.valid && this.cliente.valid &&
      this.data.valid && this.precoEstimado.valid &&
      this.statusAgendamento.valid && this.metodoPagamento.valid 
  }
}
