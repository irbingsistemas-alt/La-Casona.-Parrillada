const SHEETDB_URL = "https://sheetdb.io/api/v1/c7ira8rzyobxr";
let platos = [];

fetch(SHEETDB_URL)
  .then(response => response.json())
  .then(data => {
    platos = data;
    mostrarMenu("Todos");
  });

function mostrarMenu(categoria) {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  const filtrados = categoria === "Todos" ? platos : platos.filter(p => p.categoria === categoria);

  filtrados.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <label>
        <input type="checkbox" data-name="${item.nombre}" data-price="${item.precio}" />
        <strong>${item.nombre}</strong> - ${item.precio} CUP
      </label>
      ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : ""}
    `;
    menuDiv.appendChild(div);
  });

  document.querySelectorAll("input[type='checkbox']").forEach((item) => {
    item.addEventListener("change", () => {
      let total = 0;
      document.querySelectorAll("input[type='checkbox']:checked").forEach((i) => {
        total += parseInt(i.dataset.price);
      });
      document.getElementById("total").textContent = total;
    });
  });
}

function filtrar(categoria) {
  mostrarMenu(categoria);
}

function enviarPedido() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  let mensaje = "Hola, quiero ordenar:\n";
  let total = 0;

  checkboxes.forEach((item) => {
    const nombre = item.dataset.name;
    const precio = parseInt(item.dataset.price);
    mensaje += `- ${nombre} (${precio} CUP)\n`;
    total += precio;
  });

  mensaje += `Total estimado: ${total} CUP";

  const numero = "5355555555"; // Reemplaza con tu número real
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
