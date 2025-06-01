
function cargarDatos() {
  const categoria = document.getElementById("categoria").value;
  cargarXML(categoria);
  cargarJSON(categoria);
}

function cargarXML(categoria) {
  fetch("data.xml")
    .then(res => res.text())
    .then(str => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(str, "application/xml");
      const productos = xml.getElementsByTagName("producto");
      let salida = "<ul>";
      for (let producto of productos) {
        if (producto.getAttribute("categoria") === categoria) {
          const nombre = producto.getElementsByTagName("nombre")[0].textContent;
          const precio = producto.getElementsByTagName("precio")[0].textContent;
          const peso = producto.getElementsByTagName("peso")[0]?.textContent || "-";
          const volumen = producto.getElementsByTagName("volumen")[0]?.textContent || "-";
          const caducidad = producto.getElementsByTagName("caducidad")[0]?.textContent || "-";

          salida += `<li><strong>${nombre}</strong> - Precio: €${precio} - Peso: ${peso}kg - Volumen: ${volumen}L - Caducidad: ${caducidad}</li>`;
        }
      }
      salida += "</ul>";
      document.getElementById("resultadosXML").innerHTML = salida;
    });
}

function cargarJSON(categoria) {
  fetch("data.json")
    .then(res => res.json())
    .then(datos => {
      const filtrados = datos.filter(p => p.categoria === categoria);
      let salida = "<ul>";
      filtrados.forEach(p => {
        salida += `<li><strong>${p.nombre}</strong> - Precio: €${p.precio} - Peso: ${p.peso ?? "-"}kg - Volumen: ${p.volumen ?? "-"}L - Caducidad: ${p.caducidad ?? "-"}</li>`;
      });
      salida += "</ul>";
      document.getElementById("resultadosJSON").innerHTML = salida;
    });
}
