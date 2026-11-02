import type { Gasto } from "./Gasto";

const GASTOS_EJEMPLO: Gasto[] = [
  { persona: "Ana", concepto: "Supermercado", monto: 1200 },
  { persona: "Bruno", concepto: "Nafta", monto: 900 },
  { persona: "Ana", concepto: "Helado", monto: 300 },
  { persona: "Carla", concepto: "Carne", monto: 1400 },
];

export class DivisorDeGastos {
  private gastos: Gasto[];

  constructor(gastos: Gasto[] = GASTOS_EJEMPLO) {
    this.gastos = [...gastos];
  }

  getGastos(): Gasto[] {
    return this.gastos;
  }

  calcularSaldos(): Map<string, number> {
    const pagado = new Map<string, number>();
    let total = 0;
    for (const gasto of this.gastos) {
      const acumulado = pagado.get(gasto.persona) ?? 0;
      pagado.set(gasto.persona, acumulado + gasto.monto);
      total += gasto.monto;
    }
    const cuota = total / pagado.size;
    const saldos = new Map<string, number>();
    pagado.forEach((monto, persona) => {
      const diferencia = monto - cuota;
      saldos.set(persona, Math.round(diferencia * 100) / 100);
    });
    const saldosOrdenados = [...saldos.entries()].sort((a, b) => b[1] - a[1]);
    return new Map(saldosOrdenados);
  }

  personaQueMasGasto(): string {
    const pagado = new Map<string, number>();
    for (const gasto of this.gastos) {
      pagado.set(gasto.persona, gasto.monto);
    }
    let personaMax = "";
    let max = -1;
    pagado.forEach((monto, persona) => {
      if (monto > max) {
        max = monto;
        personaMax = persona;
      }
    });
    return personaMax;
  }
}
