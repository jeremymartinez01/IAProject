import lightgbm as lgb
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

modelo = lgb.Booster(model_file='./resources/lightgbm_model.txt')
modelo_rf = joblib.load('./resources/random_forest_model.pkl')
modelo_xgb = joblib.load('./resources/modelo_xgboost.pkl')

label_encoder = LabelEncoder()

class CaracteristicasInput(BaseModel):
    prov_insc: str
    nac_1: str
    cod_pais1: str
    sexo_1: str
    edad_1: str
    hijos_1: str
    p_etnica1: str
    niv_inst1: str
    sabe_leer1: str
    prov_hab1: str
    area_1: str
    nac_2: str
    cod_pais2: str
    sexo_2: str
    edad_2: str
    hijos_2: str
    p_etnica2: str
    niv_inst2: str
    sabe_leer2: str
    prov_hab2: str
    area_2: str
    edad_mat1: str
    edad_mat2: str

mapeo_clases = {
    0: "+20 años",
    1: "10-20 años",
    2: "5-10 años",
    3: "0-5 años"
}

def convertir_a_int_o_aleatorio(valor):
    try:
        return int(valor)
    except (ValueError, TypeError):
        return np.random.randint(1, 101)

def get_tree_plot(model, tree_index=0):
    fig, ax = plt.subplots(figsize=(20, 10))
    lgb.plot_tree(model, tree_index=tree_index, ax=ax)
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')
    plt.close(fig)
    return img_base64

def get_tree_plot_rf(model, tree_index=0):
    fig, ax = plt.subplots(figsize=(20, 10))
    tree = model.estimators_[tree_index]
    from sklearn.tree import plot_tree
    plot_tree(tree, filled=True, ax=ax, feature_names=model.feature_names_in_)
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')
    plt.close(fig)
    return img_base64

def get_tree_plot_xgb(model, tree_index=0):
    fig, ax = plt.subplots(figsize=(20, 10))
    xgb.plot_tree(model, num_trees=tree_index, ax=ax)
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')
    plt.close(fig)
    return img_base64

@app.post("/predictlight/")
async def predict(input_data: CaracteristicasInput):
    try:
        data = pd.DataFrame([input_data.dict()])
        for columna in ['sabe_leer1', 'sabe_leer2']:
            data[columna] = data[columna].apply(lambda x: True if x in ['True', '1'] else (False if x in ['False', '0'] else False))

        columnas_a_convertir = ['edad_1', 'hijos_1', 'edad_2', 'hijos_2', 'edad_mat1', 'edad_mat2']
        for columna in columnas_a_convertir:
            data[columna] = data[columna].apply(convertir_a_int_o_aleatorio)

        for columna in data.select_dtypes(include='object').columns:
            if columna not in ['sabe_leer1', 'sabe_leer2']:
                data[columna] = label_encoder.fit_transform(data[columna])

        predicciones = modelo.predict(data)

        predicciones_labels = [list(x).index(max(x)) for x in predicciones]

        predicciones_mapeadas = [mapeo_clases[label] for label in predicciones_labels]
        tree_image_base64 = get_tree_plot(modelo, tree_index=0)

        return {"predicciones": predicciones_mapeadas,
                "grafico_arbol": tree_image_base64,}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predictrf/")
async def predict_random_forest(input_data: CaracteristicasInput):
    try:
        data = pd.DataFrame([input_data.dict()])
        for columna in ['sabe_leer1', 'sabe_leer2']:
            data[columna] = data[columna].apply(lambda x: True if x in ['True', '1'] else (False if x in ['False', '0'] else False))

        columnas_a_convertir = ['edad_1', 'hijos_1', 'edad_2', 'hijos_2', 'edad_mat1', 'edad_mat2']
        for columna in columnas_a_convertir:
            data[columna] = data[columna].apply(convertir_a_int_o_aleatorio)

        for columna in data.select_dtypes(include='object').columns:
            if columna not in ['sabe_leer1', 'sabe_leer2']:
                data[columna] = label_encoder.fit_transform(data[columna])

        predicciones = modelo_rf.predict(data)
        predicciones_mapeadas = [mapeo_clases[label] for label in predicciones]
        tree_image_base64 = get_tree_plot_rf(modelo_rf, tree_index=0)

        return {"predicciones": predicciones_mapeadas,
                "grafico_arbol": tree_image_base64,}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/predictxgb/")
async def predict_xgboost(input_data: CaracteristicasInput):
    try:
        data = pd.DataFrame([input_data.dict()])
        for columna in ['sabe_leer1', 'sabe_leer2']:
            data[columna] = data[columna].apply(lambda x: True if x in ['True', '1'] else (False if x in ['False', '0'] else False))

        columnas_a_convertir = ['edad_1', 'hijos_1', 'edad_2', 'hijos_2', 'edad_mat1', 'edad_mat2']
        for columna in columnas_a_convertir:
            data[columna] = data[columna].apply(convertir_a_int_o_aleatorio)

        for columna in data.select_dtypes(include='object').columns:
            if columna not in ['sabe_leer1', 'sabe_leer2']:
                data[columna] = label_encoder.fit_transform(data[columna])

        predicciones = modelo_xgb.predict(data)
        predicciones_labels = [int(x) for x in predicciones]
        predicciones_mapeadas = [mapeo_clases[label] for label in predicciones_labels]
        tree_image_base64 = get_tree_plot_xgb(modelo_xgb, tree_index=0)

        return {"predicciones": predicciones_mapeadas,
                "grafico_arbol": tree_image_base64,}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)