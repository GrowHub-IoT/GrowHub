let datos = {
    temperatura: 0,
    ph: 0,
    tds: 0,
    ec: 0
};

let timeData = [];
const eventSource = new EventSource("/stream");
eventSource.onmessage = function (event) {
    datos = JSON.parse(event.data);

    document.getElementById("temperatura").textContent = "Temperatura: " + datos.temperatura + " ºC";
    document.getElementById("ph").textContent = "pH: " + datos.ph;
    document.getElementById("tds").textContent = "TDS: " + datos.tds;
    document.getElementById("ec").textContent = "EC: " + datos.ec;


    Plotly.extendTraces('chart', {
        x: [[new Date().toLocaleTimeString()]],
        y: [[datos.temperatura], [datos.ph], [datos.tds], [datos.ec]  ]
    }, [0, 1, 2]);
};


document.addEventListener('DOMContentLoaded', (event) => {
    const eventSource = new EventSource("/stream");
    eventSource.onmessage = function (event) {
        datos = JSON.parse(event.data);
        const currentTime = new Date().toLocaleTimeString();

        document.getElementById("temperatura").textContent = `Temperatura: ${datos.temperatura} ºC`;
        document.getElementById("ph").textContent = `pH: ${datos.ph}`;
        document.getElementById("tds").textContent = `TDS: ${datos.tds}`;
        document.getElementById("ec").textContent = `EC: ${datos.ec}`;

        if (myPlot) {
            updateTimeDataAndPlot();
        }
    };

    const chartDiv1 = document.createElement('div');
    chartDiv1.id = 'chart1';
    document.body.appendChild(chartDiv1);

    const chartDiv2 = document.createElement('div');
    chartDiv2.id = 'chart2';
    document.body.appendChild(chartDiv2);

    const chartDiv3 = document.createElement('div');
    chartDiv3.id = 'chart3';
    document.body.appendChild(chartDiv3);

    const chartDiv4 = document.createElement('div');
    chartDiv4.id = 'chart4';
    document.body.appendChild(chartDiv4);

    function updatePlot() {
        fetch('/chart_data')
            .then(response => response.json())
            .then(data => {
                const timeData = data.temperatura.map((_, index) => index);
                const startTime = Math.max(0, timeData.length - 20);


                const plotData1 = [{
                    x: timeData.slice(startTime),
                    y: data.temperatura.slice(startTime),
                    mode: 'lines+markers',
                    name: 'Temperatura',
                    line: { color: 'red' }
                }];
                const layout1 = {
                    title: 'Temperatura',
                    xaxis: { title: 'Tiempo' },
                    yaxis: { title: 'Temperatura (ºC)', range: [12.5, 28.5] }
                };
                Plotly.newPlot('chart1', plotData1, layout1);

                const plotData2 = [{
                    x: timeData.slice(startTime),
                    y: data.ph.slice(startTime),
                    mode: 'lines+markers',
                    name: 'pH',
                    line: { color: 'blue' }
                }];
                const layout2 = {
                    title: 'pH',
                    xaxis: { title: 'Tiempo' },
                    yaxis: { title: 'pH',  range: [0.5, 10.5] }
                };
                Plotly.newPlot('chart2', plotData2, layout2);

                const plotData3 = [{
                    x: timeData.slice(startTime),
                    y: data.tds.slice(startTime),
                    mode: 'lines+markers',
                    name: 'TDS',
                    line: { color: 'green' }
                }];
                const layout3 = {
                    title: 'TDS',
                    xaxis: { title: 'Tiempo' },
                    yaxis: { title: 'TDS (ppm)', range: [650, 1200] }
                };
                Plotly.newPlot('chart3', plotData3, layout3);

                const plotData4 = [{
                    x: timeData.slice(startTime),
                    y: data.ec.slice(startTime),
                    mode: 'lines+markers',
                    name: 'EC',
                    line: { color: 'orange' }
                }];
                const layout4 = {
                    title: 'EC',
                    xaxis: { title: 'Tiempo' },
                    yaxis: { title: 'EC (µS/cm)',range: [400, 800] }
                };
                Plotly.newPlot('chart4', plotData4, layout4);

                // Ocultar la barra de carga cuando los gráficos estén listos
                document.getElementById('loading-bar').style.display = 'none';
            });
    }

    setInterval(updatePlot, 5000);

    function updateTimeDataAndPlot() {
        const currentTime = new Date().toLocaleTimeString();
        Plotly.extendTraces('chart1', {
            x: [[currentTime]],
            y: [[datos.temperatura]]
        }, [0]);
        Plotly.extendTraces('chart2', {
            x: [[currentTime]],
            y: [[datos.ph]]
        }, [0]);
        Plotly.extendTraces('chart3', {
            x: [[currentTime]],
            y: [[datos.tds]]
        }, [0]);
        Plotly.extendTraces('chart4', {
            x: [[currentTime]],
            y: [[datos.ec]]
        }, [0]);
    }

});

document.addEventListener('DOMContentLoaded', function () {
    const infoIcon = document.querySelector('.info-icon');
    const container = document.querySelector('.container');
    const infoCards = document.querySelector('#info-cards');

    infoIcon.addEventListener('click', function () {
        if (infoCards.style.display === 'none') {
            infoCards.style.display = 'flex';
            container.style.display = 'none';
        } else {
            infoCards.style.display = 'none';
            container.style.display = 'grid';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logout-link');
    const logoutModal = document.getElementById('logout-modal');
    const closeModal = document.querySelector('.close');
    const confirmLogout = document.getElementById('confirm-logout');
    const cancelLogout = document.getElementById('cancel-logout');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        logoutModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        logoutModal.style.display = 'none';
    });

    cancelLogout.addEventListener('click', function () {
        logoutModal.style.display = 'none';
    });

    confirmLogout.addEventListener('click', function () {
        window.location.href = "/logout";
    });

    window.addEventListener('click', function (event) {
        if (event.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const menuDropdown = document.getElementById('menu-dropdown');

    menuIcon.addEventListener('click', function () {
        if (menuDropdown.style.display === 'none' || menuDropdown.style.display === '') {
            menuDropdown.style.display = 'block';
        } else {
            menuDropdown.style.display = 'none';
        }
    });

    window.addEventListener('click', function (event) {
        if (!menuIcon.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const plantName = "Lollo Bionda"; // Ejemplo de planta seleccionada
    const plantParameters = getPlantParameters(plantName);

    if (plantParameters) {
        console.log(`Parámetros para ${plantName}:`, plantParameters);
        // Aquí puedes utilizar los parámetros para configurar la interfaz o realizar otras acciones
    } else {
        console.log(`No se encontraron parámetros para ${plantName}`);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const plantSelect = document.getElementById('plant-select');
    const setPlantButton = document.getElementById('set-plant');

    function updateTable(parameters) {
        document.getElementById('temp-risk-low').textContent = `< ${parameters.temperature.min}`;
        document.getElementById('temp-risk-low').className = 'risk-low';
        document.getElementById('temp-acceptable-low').textContent = `${parameters.temperature.min} - ${parameters.temperature.min + 2}`;
        document.getElementById('temp-acceptable-low').className = 'acceptable-low';
        document.getElementById('temp-optimal').textContent = `${parameters.temperature.min + 2} - ${parameters.temperature.max - 2}`;
        document.getElementById('temp-optimal').className = 'optimal';
        document.getElementById('temp-acceptable-high').textContent = `${parameters.temperature.max - 2} - ${parameters.temperature.max}`;
        document.getElementById('temp-acceptable-high').className = 'acceptable-high';
        document.getElementById('temp-risk-high').textContent = `> ${parameters.temperature.max}`;
        document.getElementById('temp-risk-high').className = 'risk-high';

        document.getElementById('ph-risk-low').textContent = `< ${parameters.pH.min}`;
        document.getElementById('ph-risk-low').className = 'risk-low';
        document.getElementById('ph-acceptable-low').textContent = `${parameters.pH.min} - ${parameters.pH.min + 0.2}`;
        document.getElementById('ph-acceptable-low').className = 'acceptable-low';
        document.getElementById('ph-optimal').textContent = `${parameters.pH.min + 0.2} - ${parameters.pH.max - 0.2}`;
        document.getElementById('ph-optimal').className = 'optimal';
        document.getElementById('ph-acceptable-high').textContent = `${parameters.pH.max - 0.2} - ${parameters.pH.max}`;
        document.getElementById('ph-acceptable-high').className = 'acceptable-high';
        document.getElementById('ph-risk-high').textContent = `> ${parameters.pH.max}`;
        document.getElementById('ph-risk-high').className = 'risk-high';

        document.getElementById('tds-risk-low').textContent = `< ${parameters.TDS.min}`;
        document.getElementById('tds-risk-low').className = 'risk-low';
        document.getElementById('tds-acceptable-low').textContent = `${parameters.TDS.min} - ${parameters.TDS.min + 50}`;
        document.getElementById('tds-acceptable-low').className = 'acceptable-low';
        document.getElementById('tds-optimal').textContent = `${parameters.TDS.min + 50} - ${parameters.TDS.max - 50}`;
        document.getElementById('tds-optimal').className = 'optimal';
        document.getElementById('tds-acceptable-high').textContent = `${parameters.TDS.max - 50} - ${parameters.TDS.max}`;
        document.getElementById('tds-acceptable-high').className = 'acceptable-high';
        document.getElementById('tds-risk-high').textContent = `> ${parameters.TDS.max}`;
        document.getElementById('tds-risk-high').className = 'risk-high';

        document.getElementById('ec-risk-low').textContent = `< ${parameters.EC.min}`;
        document.getElementById('ec-risk-low').className = 'risk-low';
        document.getElementById('ec-acceptable-low').textContent = `${parameters.EC.min} - ${parameters.EC.min + 0.2}`;
        document.getElementById('ec-acceptable-low').className = 'acceptable-low';
        document.getElementById('ec-optimal').textContent = `${parameters.EC.min + 0.2} - ${parameters.EC.max - 0.2}`;
        document.getElementById('ec-optimal').className = 'optimal';
        document.getElementById('ec-acceptable-high').textContent = `${parameters.EC.max - 0.2} - ${parameters.EC.max}`;
        document.getElementById('ec-acceptable-high').className = 'acceptable-high';
        document.getElementById('ec-risk-high').textContent = `> ${parameters.EC.max}`;
        document.getElementById('ec-risk-high').className = 'risk-high';
    }

    function loadDefaultParameters() {
        const defaultPlant = "Lollo Bionda";
        const parameters = getPlantParameters(defaultPlant);
        if (parameters) {
            updateTable(parameters);
        }
    }

    loadDefaultParameters();

    setPlantButton.addEventListener('click', function () {
        const selectedPlant = plantSelect.value;
        const parameters = getPlantParameters(selectedPlant);
        if (parameters) {
            updateTable(parameters);
        }
    });
});