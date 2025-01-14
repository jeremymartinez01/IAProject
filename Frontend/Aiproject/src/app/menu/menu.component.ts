import { Component } from '@angular/core';
import { LightGbmModelService } from '../providers/light-gbm-model.service';
import { RandomForestModelService } from '../providers/random-forest-model.service';
import { XgBoostModelService } from '../providers/xg-boost-model.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 constructor(private lmodel:LightGbmModelService, private rfmodel: RandomForestModelService, private xgbmodel: XgBoostModelService){}
algorithms: string[] = ['lightgbm', 'xgboost', 'randomforest'];

selectedAlgorithm: string = this.algorithms[0];

devToolsEnabled: boolean = false;
isSubmitting: boolean = false;

  formData: { [key: string]: any } = {};
  prediction: string = '';
  treeImageBase64: string = ''; 
  treeImageHolder64: string = ''; 


  characteristics2: string[] = [
    'prov_insc', 'nac_1', 'cod_pais1', 'sexo_1', 'edad_1', 'hijos_1',
    'p_etnica1', 'niv_inst1', 'sabe_leer1', 'prov_hab1', 'area_1',
    'nac_2', 'cod_pais2', 'sexo_2', 'edad_2', 'hijos_2', 'p_etnica2',
    'niv_inst2', 'sabe_leer2', 'prov_hab2', 'area_2', 'edad_mat1', 'edad_mat2',
  ];

  characteristics = [
    {
      key: 'prov_insc',
      label: 'Provincia de Inscripción',
      options: [],
    },
    {
      key: 'nac_1',
      label: 'Nacionalidad 1',
      options: [],
    },
    {
      key: 'cod_pais1',
      label: 'País 1',
      options: [],
    },
    {
      key: 'sexo_1',
      label: 'Sexo 1',
      options: [],
    },
    {
      key: 'edad_1',
      label: 'Edad 1',
      options:[],
    },
    {
      key: 'hijos_1',
      label: 'Número de Hijos 1',
      options:[],
    },
    {
      key: 'p_etnica1',
      label: 'Etnia 1',
      options: [],
    },
    {
      key: 'niv_inst1',
      label: 'Nivel de Instrucción 1',
      options: [],
    },
    {
      key: 'sabe_leer1',
      label: 'Sabe Leer 1',
      options: [],
    },
    {
      key: 'prov_hab1',
      label: 'Provincia de Residencia 1',
      options: [],
    },
    {
      key: 'area_1',
      label: 'Área 1',
      options: [],
    },
    {
      key: 'nac_2',
      label: 'Nacionalidad 2',
      options: [],
    },
    {
      key: 'cod_pais2',
      label: 'País 2',
      options: [],
    },
    {
      key: 'sexo_2',
      label: 'Sexo 2',
      options: [],
    },
    {
      key: 'edad_2',
      label: 'Edad 2',
      options:[],
    },
    {
      key: 'hijos_2',
      label: 'Número de Hijos 2',
      options:[],
    },
    {
      key: 'p_etnica2',
      label: 'Etnia 2',
      options: [],
    },
    {
      key: 'niv_inst2',
      label: 'Nivel de Instrucción 2',
      options: [],
    },
    {
      key: 'sabe_leer2',
      label: 'Sabe Leer 2',
      options: [],
    },
    {
      key: 'prov_hab2',
      label: 'Provincia de Residencia 2',
      options: [],
    },
    {
      key: 'area_2',
      label: 'Área 2',
      options: [],
    },
    {
      key: 'edad_mat1',
      label: 'Edad en matrimonio 1',
      options: [],
    },
    {
      key: 'edad_mat2',
      label: 'Edad en matrimonio 2',
      options: [],
    },
  ]

  dropdownCharacteristics = [
    {
      key: 'prov_insc',
      label: 'Provincia de Inscripción',
      options: ['Sierra', 'Costa', 'Oriente', 'Galápagos'],
    },
    {
      key: 'nac_1',
      label: 'Nacionalidad 1',
      options: ['Ecuatoriano', 'Extranjero'],
    },
    {
      key: 'cod_pais1',
      label: 'País 1',
      options: [
        'Ecuador', 'Zonas sin especificar', 'Estados Unidos de América', 'Colombia',
        'Perú', 'Venezuela (República Bolivariana de)', 'España', 'Cuba',
        'República Dominicana', 'Reino Unido', 'Italia', 'Francia', 'Canadá', 'China',
        'Chile', 'Iraq', 'Federación de Rusia', 'Haití', 'Austria', 'México', 'Turquía',
        'Alemania', 'Bélgica', 'Pakistán', 'Albania', 'Suecia', 'Costa Rica',
        'Argentina', 'Países Bajos', 'Pitcairn', 'Camerún', 'Egipto', 'Angola',
        'Nueva Zelandia', 'India', 'Honduras', 'Brasil', 'Suiza', 'Ucrania', 'Guinea',
        'Marruecos', 'El Salvador', 'Túnez', 'Bangladesh', 'Croacia', 'Portugal',
        'Noruega', 'Irán (República Islámica del)', 'Argelia',
        'Bolivia (Estado Plurinacional de)', 'República Árabe Siria', 'Polonia',
        'Uruguay', 'Líbano', 'Puerto Rico', 'Israel', 'Luxemburgo', 'Japón', 'Lituania',
        'Guatemala', 'República Checa', 'Jordania', 'Irlanda', 'Libia',
      ],
    },
    {
      key: 'sexo_1',
      label: 'Sexo 1',
      options: ['Hombre', 'Mujer'],
    },
    {
      key: 'edad_1',
      label: 'Edad 1',
      type: 'numeric',
      options:[],
    },
    {
      key: 'hijos_1',
      label: 'Número de Hijos 1',
      type: 'numeric',
      options:[],
    },
    {
      key: 'p_etnica1',
      label: 'Etnia 1',
      options: ['Indígena', 'Mestiza', 'Montubia', 'Blanca', 'Otro', 'Mulata', 'Afrodescendiente'],
    },
    {
      key: 'niv_inst1',
      label: 'Nivel de Instrucción 1',
      options: ['Educación Básica', 'Educación Media', 'Educación Superior', 'Ninguno'],
    },
    {
      key: 'sabe_leer1',
      label: 'Sabe Leer 1',
      options: ['true', 'false'],
    },
    {
      key: 'prov_hab1',
      label: 'Provincia de Residencia 1',
      options: [
        'Chimborazo', 'Manabí', 'Guayas', 'Azuay', 'Pichincha', 'Loja', 'El Oro',
        'Tungurahua', 'Cañar', 'Santo Domingo de los Tsáchilas', 'Cotopaxi',
        'Orellana', 'Sucumbíos', 'Imbabura', 'Exterior', 'Los Ríos', 'Bolívar',
        'Carchi', 'Zamora Chinchipe', 'Napo', 'Esmeraldas', 'Morona Santiago',
        'Santa Elena', 'Pastaza', 'Galápagos',
      ],
    },
    {
      key: 'area_1',
      label: 'Área 1',
      options: ['Rural', 'Urbano'],
    },
    {
      key: 'nac_2',
      label: 'Nacionalidad 2',
      options: ['Ecuatoriano', 'Extranjero'],
    },
    {
      key: 'cod_pais2',
      label: 'País 2',
      options: [
        'Ecuador', 'Zonas sin especificar', 'Estados Unidos de América', 'Colombia',
        'Perú', 'Venezuela (República Bolivariana de)', 'España', 'Cuba',
        'República Dominicana', 'Reino Unido', 'Italia', 'Francia', 'Canadá', 'China',
        'Chile', 'Iraq', 'Federación de Rusia', 'Haití', 'Austria', 'México', 'Turquía',
        'Alemania', 'Bélgica', 'Pakistán', 'Albania', 'Suecia', 'Costa Rica',
        'Argentina', 'Países Bajos', 'Pitcairn', 'Camerún', 'Egipto', 'Angola',
        'Nueva Zelandia', 'India', 'Honduras', 'Brasil', 'Suiza', 'Ucrania', 'Guinea',
        'Marruecos', 'El Salvador', 'Túnez', 'Bangladesh', 'Croacia', 'Portugal',
        'Noruega', 'Irán (República Islámica del)', 'Argelia',
        'Bolivia (Estado Plurinacional de)', 'República Árabe Siria', 'Polonia',
        'Uruguay', 'Líbano', 'Puerto Rico', 'Israel', 'Luxemburgo', 'Japón', 'Lituania',
        'Guatemala', 'República Checa', 'Jordania', 'Irlanda', 'Libia',
      ],
    },
    {
      key: 'sexo_2',
      label: 'Sexo 2',
      options: ['Hombre', 'Mujer'],
    },
    {
      key: 'edad_2',
      label: 'Edad 2',
      type: 'numeric',
      options:[],
    },
    {
      key: 'hijos_2',
      label: 'Número de Hijos 2',
      type: 'numeric',
      options:[],
    },
    {
      key: 'p_etnica2',
      label: 'Etnia 2',
      options: ['Indígena', 'Mestiza', 'Montubia', 'Blanca', 'Otro', 'Mulata', 'Afrodescendiente'],
    },
    {
      key: 'niv_inst2',
      label: 'Nivel de Instrucción 2',
      options: ['Educación Básica', 'Educación Media', 'Educación Superior', 'Ninguno'],
    },
    {
      key: 'sabe_leer2',
      label: 'Sabe Leer 2',
      options: ['true', 'false'],
    },
    {
      key: 'prov_hab2',
      label: 'Provincia de Residencia 2',
      options: [
        'Chimborazo', 'Manabí', 'Guayas', 'Azuay', 'Pichincha', 'Loja', 'El Oro',
        'Tungurahua', 'Cañar', 'Santo Domingo de los Tsáchilas', 'Cotopaxi',
        'Orellana', 'Sucumbíos', 'Imbabura', 'Exterior', 'Los Ríos', 'Bolívar',
        'Carchi', 'Zamora Chinchipe', 'Napo', 'Esmeraldas', 'Morona Santiago',
        'Santa Elena', 'Pastaza', 'Galápagos',
      ],
    },
    {
      key: 'area_2',
      label: 'Área 2',
      options: ['Rural', 'Urbano'],
    },
    {
      key: 'edad_mat1',
      label: 'Edad en matrimonio 1',
      options: [],
    },
    {
      key: 'edad_mat2',
      label: 'Edad en matrimonio 2',
      options: [],
    },
  ];
  get isFormValid(): boolean {
    return this.characteristics.every(field => this.formData[field.key]) || this.dropdownCharacteristics.every(field => this.formData[field.key]);
  }
  onSubmit() {
    if (!this.isFormValid) return;
    this.isSubmitting = true;
    console.log('Datos del formulario:', this.formData);
    
    if (this.selectedAlgorithm === 'lightgbm') {
      this.lmodel.getlprediction(this.formData).subscribe({
        next: (response) => {
          console.log(response);
          const { predicciones, grafico_arbol } = response;
          this.prediction = predicciones;
          this.treeImageBase64 = grafico_arbol;
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error al obtener la predicción:', err);
          this.isSubmitting = false;
        }
      });
    } else if(this.selectedAlgorithm==='xgboost') {
      this.xgbmodel.getlprediction(this.formData).subscribe({
        next: (response) => {
          console.log(response);
          const { predicciones, grafico_arbol } = response;
          this.prediction = predicciones;
          this.treeImageHolder64 = grafico_arbol;
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error al obtener la predicción:', err);
          this.isSubmitting = false;
        }
      });
      this.isSubmitting = false;
    } else if (this.selectedAlgorithm==='randomforest'){
      this.rfmodel.getlprediction(this.formData).subscribe({
        next: (response) => {
          console.log(response);
          const { predicciones, grafico_arbol } = response;
          this.prediction = predicciones;
          this.treeImageBase64 = grafico_arbol;
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error al obtener la predicción:', err);
          this.isSubmitting = false;
        }
      });
      this.isSubmitting = false;
    }
  }

  onAlgorithmChange(): void {
    console.log('Algoritmo seleccionado:', this.selectedAlgorithm);
  }
  showTreeImage(): void {
    if (this.treeImageBase64) {
      this.treeImageBase64= this.treeImageHolder64;
    }
  }
}
