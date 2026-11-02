import { DivisorDeGastos } from "./domain/DivisorDeGastos";
import type { Gasto } from "./domain/Gasto";

const divisor = new DivisorDeGastos();

function crearTabla(
  encabezados: string[],
  filas: string[][],
): HTMLTableElement {
  const tabla = document.createElement("table");
  tabla.className = "table table-bordered";

  const thead = document.createElement("thead");
  const filaEncabezado = document.createElement("tr");
  encabezados.forEach((texto) => {
    const th = document.createElement("th");
    th.textContent = texto;
    filaEncabezado.appendChild(th);
  });
  thead.appendChild(filaEncabezado);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  filas.forEach((fila) => {
    const tr = document.createElement("tr");
    fila.forEach((texto) => {
      const td = document.createElement("td");
      td.textContent = texto;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
  return tabla;
}

function crearColumna(titulo: string, contenido: HTMLElement): HTMLDivElement {
  const col = document.createElement("div");
  col.className = "col-md-6";
  const encabezado = document.createElement("h2");
  encabezado.textContent = titulo;
  col.appendChild(encabezado);
  col.appendChild(contenido);
  return col;
}

function filasDeGastos(gastos: Gasto[]): string[][] {
  return gastos.map((g) => [g.persona, g.concepto, `$${g.monto}`]);
}

function filasDeSaldos(saldos: Map<string, number>): string[][] {
  const filas: string[][] = [];
  saldos.forEach((saldo, persona) => {
    const estado = saldo >= 0 ? "Le deben" : "Debe";
    filas.push([persona, `$${Math.abs(saldo)}`, estado]);
  });
  return filas;
}

function crearAvisoMayorGasto(persona: string): HTMLDivElement {
  const aviso = document.createElement("div");
  aviso.className = "alert alert-info";
  aviso.textContent = `Mayor gasto: ${persona}`;
  return aviso;
}

const app = document.getElementById("app");
if (app) {
  const tablaGastos = crearTabla(
    ["Persona", "Concepto", "Monto"],
    filasDeGastos(divisor.getGastos()),
  );
  const tablaSaldos = crearTabla(
    ["Persona", "Monto", "Estado"],
    filasDeSaldos(divisor.calcularSaldos()),
  );
  app.appendChild(crearColumna("Gastos", tablaGastos));
  app.appendChild(crearColumna("Saldos", tablaSaldos));
  app.appendChild(crearAvisoMayorGasto(divisor.personaQueMasGasto()));
}
