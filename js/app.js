/**
 * Erwin Saavedra 26 - 05 - 2022
 */

//Arreglo de Ingresos
const ingresos = [
  //   new Ingreso("Sueldo", 2100.0),
  //   new Ingreso("Venta coche", 1500),
];
//Arreglo de egresos
const egresos = [
  //   new Egreso("Renta departamento", 200),
  //   new Egreso("Ropa", 100),
];

//Funcion Principal que carga 3 funciones al principio de la aplicación
let cargarApp = () => {
  cargarInformacionUsuario();
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};
const cargarInformacionUsuario = () => {
  const userLogged = Array.from(
    JSON.parse(localStorage.getItem("details"))
  ).find((user) => user.logged);
  username.innerText = userLogged.email;
  if (userLogged.ingresos) {
    const nuevosIngresos = userLogged.ingresos.map(
      (ingreso) => new Ingreso(ingreso._descripcion, ingreso._valor)
    );
    ingresos.push(...nuevosIngresos);
  }
  if (userLogged.egresos) {
    const nuevosEgresos = userLogged.egresos.map(
      (ingreso) => new Egreso(ingreso._descripcion, ingreso._valor)
    );
    egresos.push(...nuevosEgresos);
  }
};
//Funcion que captura el valor de ingresos
let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

//Funcion que captura el valor de egresos
let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

/**
 * Carga mediante el dom con el getElementById 4 datos y calcula el
 * presupuesto y el porcentajePresupuesto llama a la funcion
 * formatoMoneda y formatoPorcentaje e innerHTML manipula el label
 * del formulario
 */

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-CL", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

//Carga datos dinamicamente
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onClick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
  return ingresoHTML;
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

let pegreso = localStorage.getItem;

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${
                      egreso.descripcion
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formatoMoneda(
                          egreso.valor
                        )}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(
                          egreso.valor / totalEgresos()
                        )}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onClick='eliminarEgreso(${
                                  egreso.id
                                })'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
  return egresoHTML;
};

let eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};

let agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];

  if (descripcion.value !== "" && valor.value !== "") {
    if (valor.value > 0) {
      if (tipo.value === "ingreso") {
        ingresos.push(new Ingreso(descripcion.value, +valor.value));
        const users = Array.from(JSON.parse(localStorage.getItem("details")));
        users.forEach((user) =>
          user.logged ? (user.ingresos = ingresos) : null
        );
        localStorage.setItem("details", JSON.stringify(users));
        cargarCabecero();
        cargarIngresos();
      } else if (tipo.value === "egreso") {
        if (valor.value > totalEgresos) {
          console.log("Error egreso");
          window.alert(
            "Error, No se aceptan valores superiores a Total egreso"
          );
        } else {
          egresos.push(new Egreso(descripcion.value, +valor.value));
          cargarCabecero();
          cargarEgresos();
        }
      }
    } else {
      console.log("Error");
    }
  }
};
const cerrarSesion = () => {
  const usuariosFinalizados = Array.from(
    JSON.parse(localStorage.getItem("details"))
  ).map((user) => ({ ...user, logged: false }));

  localStorage.setItem("details", JSON.stringify(usuariosFinalizados));
  document.location.replace("./index.html");
};
