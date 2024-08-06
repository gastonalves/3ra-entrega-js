let articulos = JSON.parse(localStorage.getItem('articulos')) || [];

document.getElementById('formularioArticulo').addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let cantidad = parseInt(document.getElementById('cantidad').value);
    let precio = parseFloat(document.getElementById('precio').value);
    
    let articulo = { nombre, cantidad, precio };
    articulos.push(articulo);
    localStorage.setItem('articulos', JSON.stringify(articulos));

    mostrarArticulos();
    document.getElementById('formularioArticulo').reset();
});

document.getElementById('calcularTotal').addEventListener('click', function() {
    let totalCompra = calcularTotal(articulos);
    let descuentoAplicado = aplicarDescuento(totalCompra);
    mostrarTotal(descuentoAplicado);
});

function mostrarArticulos() {
    let resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    articulos.forEach(articulo => {
        let p = document.createElement('p');
        p.textContent = `Articulo: ${articulo.nombre} - Cantidad: ${articulo.cantidad}, Precio unitario: $${articulo.precio.toFixed(2)}`;
        resultadosDiv.appendChild(p);
    });
}

function calcularTotal(articulos) {
    return articulos.reduce((total, articulo) => total + (articulo.cantidad * articulo.precio), 0);
}

function aplicarDescuento(total) {
    return total > 100 ? total * 0.9 : total;
}

function mostrarTotal(total) {
    let totalDiv = document.getElementById('total');
    totalDiv.innerHTML = `<p>El total de la compra es: $${total.toFixed(2)}</p>`;
}

mostrarArticulos();
