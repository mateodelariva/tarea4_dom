var contenedor = document.querySelector('#contenedor');
init();
function init() {
    var botones = document.querySelectorAll("#botones button");
    [].forEach.call(botones, function (btn) {
        btn.addEventListener('click', crearElemento);
    });
    document.querySelector("#btnEliminar")
            .addEventListener('click', eliminarElemento);
    document.querySelector('#elemento')
            .addEventListener('change', cargarPropiedades);
    document.querySelector('#propiedades')
            .addEventListener('change', cargarValores);
    document.querySelector("#btnAplicar")
            .addEventListener('click', aplicarCSS);
}
function crearElemento(e) {
    var nuevoElemento = document.createElement(e.target.id);
    switch (e.target.id) {
        case 'button':
            nuevoElemento.innerHTML = 'Este es un boton';
            break;
        case 'input':
            nuevoElemento.type = 'text';
            nuevoElemento.value = 'Este es un cuadro de texto';
            break;
        case 'table':
            for (var i = 0; i < 5; i++) {
                var fila = nuevoElemento.insertRow(i); //Inserta fila
                for (var j = 0; j < 5; j++) {
                    var columna = fila.insertCell(j);
                    columna.innerHTML = 'Celda ' + i + j; //Inserta columna
                }
            }
            break;
        case 'a':
            nuevoElemento.href = '#';
            nuevoElemento.innerHTML = 'Este es un link';
            break;
        case 'select':
            for (var i = 0; i < 5; i++)
                nuevoElemento.add(new Option('Opcion ' + (i + 1), i));
            break;
        default:
            break;
    }
    contenedor.appendChild(nuevoElemento);
    cargarElementos();
}
function cargarElementos() {
    var selElemento = document.querySelector('#elemento');
    selElemento.innerHTML = '';
    selElemento.add(new Option('Seleccionar elemento', '-1'));
    for (var i = 0; i < contenedor.children.length; i++)
        selElemento.add(new Option(contenedor.children[i].localName, i));
}
function eliminarElemento() {
    var selElemento = document.querySelector('#elemento');
    if (selElemento.value === '-1') {
        return alert('Seleccione elemento a eliminar');
    }
    contenedor.removeChild(contenedor.children[selElemento.value]);
    cargarElementos();
}
function cargarPropiedades() {
    var selElemento = document.querySelector('#elemento');
    var selPropiedades = document.querySelector('#propiedades');
    selPropiedades.innerHTML = '';
    selPropiedades.add(new Option('Seleccionar propiedad', '-1'));
    selPropiedades.add(new Option('Borde', 'border'));
    selPropiedades.add(new Option('Color', 'color'));
    selPropiedades.add(new Option('Animacion', 'animation'));
    selPropiedades.add(new Option('Fondo', 'backgroundColor'));
    selPropiedades.add(new Option('TamaÃ±o fuente', 'fontSize'));
}
function cargarValores() {
    var selPropiedades = document.querySelector('#propiedades');
    var selValores = document.querySelector('#valor');
    if (selPropiedades.value === '-1') {
        alert('Seleccione propiedad');
    }
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
        default:

            break;
    }
}
function aplicarCSS() {
    var selElemento = document.querySelector('#elemento');
    var selPropiedades = document.querySelector('#propiedades');
    var selValores = document.querySelector('#valor');
    if (selElemento.value === '-1')
        alert('Seleccione elemento');
    else if (selPropiedades.value === '-1')
        alert('Seleccione propiedad');
    else if (selValores.value === '-1')
        alert('Seleccione valor');

    contenedor.children[selElemento.value]
            .style[selPropiedades.value]=selValores.value;
}