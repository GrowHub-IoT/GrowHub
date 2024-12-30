// static/config.ts

interface PlantParameters {
    temperature: { min: number, max: number };
    pH: { min: number, max: number };
    TDS: { min: number, max: number };
    EC: { min: number, max: number };
}

interface PlantDictionary {
    [plantName: string]: PlantParameters;
}

const plantDictionary: PlantDictionary = {
    "Lollo Bionda": {
        temperature: { min: 18, max: 22 },
        pH: { min: 5.5, max: 6.0 },
        TDS: { min: 700, max: 850 },
        EC: { min: 1.2, max: 1.6 }
    },
    "Lechuga Española": {
        temperature: { min: 16, max: 20 },
        pH: { min: 5.8, max: 6.2 },
        TDS: { min: 560, max: 840 },
        EC: { min: 0.8, max: 1.2 }
    },
    "Tomate Cherry": {
        temperature: { min: 18, max: 24 },
        pH: { min: 5.5, max: 6.5 },
        TDS: { min: 1400, max: 3500 },
        EC: { min: 2.0, max: 5.0 }
    },
    "Pepino": {
        temperature: { min: 22, max: 26 },
        pH: { min: 5.5, max: 6.0 },
        TDS: { min: 1190, max: 1750 },
        EC: { min: 1.7, max: 2.5 }
    },
    "Albahaca": {
        temperature: { min: 18, max: 24 },
        pH: { min: 5.5, max: 6.5 },
        TDS: { min: 700, max: 1120 },
        EC: { min: 1.0, max: 1.6 }
    },
    "Fresa": {
        temperature: { min: 18, max: 24 },
        pH: { min: 5.5, max: 6.5 },
        TDS: { min: 1050, max: 1260 },
        EC: { min: 1.4, max: 1.8 }
    }
};

export function getPlantParameters(plantName: string): PlantParameters | undefined {
    return plantDictionary[plantName];
}
