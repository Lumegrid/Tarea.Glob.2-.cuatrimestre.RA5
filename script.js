document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("categoria");
  const boton = document.getElementById("btnSeleccionar");
  const resultado = document.getElementById("resultado");

  boton.addEventListener("click", function () {
    const categoriaSeleccionada = select.value;
    resultado.innerHTML = `<h3>Resultados para: ${categoriaSeleccionada}</h3>`;

    // Leer XML
    fetch("data.xml.txt")
      .then((response) => response.text())
      .then((str) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const productos = xml.getElementsByTagName("producto");

        resultado.innerHTML += "<h4>Datos desde XML:</h4>";
        let lista = "<ul>";

        for (let producto of productos) {
          const categoria = producto.getAttribute("categoria");
          if (categoria === categoriaSeleccionada) {
            const nombre = producto.getElementsByTagName("nombre")[0].textContent;
            const precio = producto.getElementsByTagName("precio")[0].textContent;
            let extra = "";

            if (categoria === "Bebidas") {
              extra = "Volumen: " + producto.getElementsByTagName("volumen")[0]?.textContent + " L";
            } else {
              extra = "Peso: " + producto.getElementsByTagName("peso")[0]?.textContent + " kg";
            }

            const caducidad = producto.getElementsByTagName("caducidad")[0]?.textContent || "N/A";

            lista += `<li><strong>${nombre}</strong> - ${extra} - Precio: ${precio} € - Caducidad: ${caducidad}</li>`;
          }
        }

        lista += "</ul>";
        resultado.innerHTML += lista;
      });

    // Leer JSON
    fetch("data.json.txt")
      .then((response) => response.json())
      .then((data) => {
        resultado.innerHTML += "<h4>Datos desde JSON:</h4>";
        let lista = "<ul>";

        data.forEach((producto) => {
          if (producto.categoria === categoriaSeleccionada) {
            const nombre = producto.nombre;
            const precio = producto.precio;
            let extra = "";

            if (categoriaSeleccionada === "Bebidas") {
              extra = "Volumen: " + producto.volumen + " L";
            } else {
              extra = "Peso: " + producto.peso + " kg";
            }

            const caducidad = producto.caducidad || "N/A";

            lista += `<li><strong>${nombre}</strong> - ${extra} - Precio: ${precio} € - Caducidad: ${caducidad}</li>`;
          }
        });

        lista += "</ul>";
        resultado.innerHTML += lista;
      });
  });
});
