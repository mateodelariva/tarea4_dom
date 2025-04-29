const contenedor = document.querySelector('#contenedor');

init();

function init() {
    const botones = document.querySelectorAll("#botones button");
    botones.forEach(btn => btn.addEventListener('click', crearElemento));

    document.querySelector("#btnEliminar").addEventListener('click', eliminarElemento);
    document.querySelector('#elemento').addEventListener('change', cargarPropiedades);
    document.querySelector('#propiedades').addEventListener('change', cargarValores);
    document.querySelector("#btnAplicar").addEventListener('click', aplicarCSS);

    document.querySelector("#toggleParrafo").addEventListener("click", toggleTexto);
    document.querySelector("#colorFondo").addEventListener("input", cambiarFondo);
}

function crearElemento(e) {
    const nuevoElemento = document.createElement(e.target.id);

    switch (e.target.id) {
        case 'button':
            nuevoElemento.textContent = 'Este es un botón';
            break;
        case 'input':
            nuevoElemento.type = 'text';
            nuevoElemento.value = 'Texto de entrada';
            break;
        case 'table':
            for (let i = 0; i < 3; i++) {
                const fila = nuevoElemento.insertRow(i);
                for (let j = 0; j < 3; j++) {
                    const celda = fila.insertCell(j);
                    celda.textContent = `Celda ${i}${j}`;
                }
            }
            break;
        case 'a':
            nuevoElemento.href = '#';
            nuevoElemento.textContent = 'Este es un enlace';
            break;
        case 'select':
            for (let i = 1; i <= 5; i++) {
                nuevoElemento.add(new Option('Opción ' + i, i));
            }
            break;
        case 'agregarTarjeta':
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");
            tarjeta.textContent = "Tarjeta nueva";

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = () => tarjeta.remove();

            tarjeta.appendChild(botonEliminar);
            document.querySelector("#contenedor").appendChild(tarjeta);
            return;
    }

    contenedor.appendChild(nuevoElemento);
    cargarElementos();
}

function cargarElementos() {
    const selElemento = document.querySelector('#elemento');
    selElemento.innerHTML = '';
    selElemento.add(new Option('Seleccionar elemento', '-1'));
    Array.from(contenedor.children).forEach((el, i) => {
        selElemento.add(new Option(el.localName, i));
    });
}

function eliminarElemento() {
    const selElemento = document.querySelector('#elemento');
    if (selElemento.value === '-1') return alert('Seleccione un elemento');
    contenedor.removeChild(contenedor.children[selElemento.value]);
    cargarElementos();
}

function cargarPropiedades() {
    const selPropiedades = document.querySelector('#propiedades');
    selPropiedades.innerHTML = '';
    selPropiedades.add(new Option('Seleccionar propiedad', '-1'));
    selPropiedades.add(new Option('Borde', 'border'));
    selPropiedades.add(new Option('Color', 'color'));
    selPropiedades.add(new Option('Animación', 'animation'));
    selPropiedades.add(new Option('Fondo', 'backgroundColor'));
    selPropiedades.add(new Option('Tamaño fuente', 'fontSize'));
}

function cargarValores() {
    const selPropiedades = document.querySelector('#propiedades');
    const selValores = document.querySelector('#valor');
    if (selPropiedades.value === '-1') return alert('Seleccione propiedad');
    selValores.innerHTML = '';
    selValores.add(new Option('Seleccionar valor', '-1'));

    switch (selPropiedades.value) {
        case 'border':
            selValores.add(new Option('1px solid black'));
            selValores.add(new Option('2px dotted red'));
            selValores.add(new Option('5px dashed green'));
            selValores.add(new Option('7px solid #ddd'));
            selValores.add(new Option('none'));
            break;
        case 'color':
            selValores.add(new Option('black'));
            selValores.add(new Option('blueviolet'));
            selValores.add(new Option('coral'));
            selValores.add(new Option('#999999'));
            selValores.add(new Option('rgb(0,0,255)'));
            break;
        case 'animation':
            selValores.add(new Option('animacion1 2s infinite'));
            break;
        case 'backgroundColor':
            selValores.add(new Option('lightblue'));
            selValores.add(new Option('lightgreen'));
            selValores.add(new Option('lightyellow'));
            selValores.add(new Option('lightgray'));
            break;
        case 'fontSize':
            selValores.add(new Option('12px'));
            selValores.add(new Option('16px'));
            selValores.add(new Option('20px'));
            selValores.add(new Option('24px'));
            break;
    }
}

function aplicarCSS() {
    const elemento = document.querySelector('#elemento');
    const propiedad = document.querySelector('#propiedades');
    const valor = document.querySelector('#valor');

    if (elemento.value === '-1') return alert('Seleccione elemento');
    if (propiedad.value === '-1') return alert('Seleccione propiedad');
    if (valor.value === '-1') return alert('Seleccione valor');

    contenedor.children[elemento.value].style[propiedad.value] = valor.value;
}

function toggleTexto() {
    const parrafo = document.querySelector("#textoOculto");
    parrafo.style.display = parrafo.style.display === "none" ? "block" : "none";
}

function cambiarFondo(e) {
    document.querySelector("#areaColor").style.backgroundColor = e.target.value;
}
