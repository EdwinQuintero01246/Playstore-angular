import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faStar,faTrash ,faPlusCircle, faUpload} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/service/categorias.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categorias:any =[];
  nombreCategoria:string="";
  descripcionCategoria:string="";
  applicaciones:any =[];
  categoriaSeleccionda:any;
  idCategoria:string="";
  idApp:string="";
  app:any =[];
  imagen1:boolean=true;
  imagen2:boolean=false;
  imagen3:boolean=false;
  openPlus:boolean=false;

  formularioComent = new FormGroup({
    usuario:new FormControl('', [Validators.required]),
    comentario:new FormControl('', [Validators.required]),
    fecha:new FormControl('', [Validators.required]),
    calificación:new FormControl('', [Validators.required])
  });
  formularioApp = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[Validators.required]),
    icono: new FormControl('',[Validators.required]),
    instalada: new FormControl('',[Validators.required]),
    app: new FormControl('',[Validators.required]),
    calificacion: new FormControl('',[Validators.required]),
    descargas: new FormControl('',[Validators.required]),
    precio: new FormControl('',[Validators.required]),
    desarrollador: new FormControl('',[Validators.required])
  });
  constructor(private categoriasService:CategoriasService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe(
      res =>{
        this.categorias = res;
        //console.log("categorias:", res);
      },
      error =>{
        console.log(error);
      }
    );
    console.log(this.applicaciones.length);
  }
  cargarAplicaciones(){}
  SelectCategorias(){
    console.log("categoria seleccionada:", this.categoriaSeleccionda);
    this.idCategoria=this.categoriaSeleccionda;
    this.categoriasService.obtenerCategoria(this.idCategoria).subscribe(
      res =>{
        this.nombreCategoria = res.nombreCategoria;
        this.descripcionCategoria = res.descripcion;
        this.applicaciones = res.aplicaciones;
        console.log("categorias:", res);
      },
      error =>{
        console.log(error);
      }
    );
  }
  eliminarApp(IdAPP:any){
    console.log("id de la app es:", IdAPP);
    console.log("iDcategoria es:", this.idCategoria);
    this.categoriasService.EliminarOneApp(this.idCategoria, IdAPP)
    .subscribe((res:any) =>{
        console.log("categorias:", res);
    });
  }
  abrirModal(modal:any){
    this.modalService.open(
      modal,
      {
        size:'xs',
        centered:false
      }
    );
  }
  abrirInformacion(modal:any,idApp:any){
    this.modalService.open(
      modal,
      {
        size:'xs',
        centered:false
      }
    );
    this.idApp=idApp;
    console.log("id de la app es: ",idApp);
    this.categoriasService.obtenerOneApp(this.idCategoria,idApp).subscribe(
      res =>{
        this.app = res.aplicaciones;
        console.log("Mi app:", this.app);
      },
      error =>{
        console.log(error);
      }
    );
  }
  siguienteImg(){
    if(this.imagen1==true){
      this.imagen1=false;
      this.imagen2=true;
      this.imagen3=false;
    }else
    if(this.imagen2==true){
      this.imagen1=false;
      this.imagen2=false;
      this.imagen3=true;
    }else 
    if(this.imagen3==true){
      this.imagen1=true;
      this.imagen2=false;
      this.imagen3=false;
    };
  }
  plusComent(){
    if(this.openPlus==false){
      this.openPlus=true;
    }else{
      this.openPlus=false;
    }
  }
  UpComent(){
    console.log('Formulario válido:' , this.formularioComent.value);
    this.categoriasService.GuardarComentadario(this.idCategoria,this.idApp,this.formularioComent.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
  )}
  GuardarApp(){
    console.log('Formulario válido:' , this.formularioApp.value,this.categoriaSeleccionda);
    this.categoriasService.GuardarApp(this.idCategoria,this.formularioApp.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
  )
}
  faStar=faStar;
  faTrash=faTrash;
  faPlusCircle=faPlusCircle;
  faUpload=faUpload;
}
