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

  mensaje += `Total estimado: ${total} CUP`;

  const numero = "5355555555"; // Reemplaza con tu número de WhatsApp
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

document.querySelectorAll("input[type='checkbox']").forEach((item) => {
  item.addEventListener("change", () => {
    let total = 0;
    document.querySelectorAll("input[type='checkbox']:checked").forEach((i) => {
      total += parseInt(i.dataset.price);
    });
    document.getElementById("total").textContent = total;
  });
});
fetch("https://sheetdb.io/api/v1/abc123xyz") // usa tu URL real
  .then(response => response.json())
  .then(data => {
    const menuDiv = document.getElementById("menu");
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <label>
          <input type="checkbox" data-name="${item.nombre}" data-price="${item.precio}" />
          ${item.nombre} - ${item.precio} CUP
        </label>
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
  });
