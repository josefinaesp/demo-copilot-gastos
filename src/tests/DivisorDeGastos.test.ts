import { describe, it, expect } from "vitest";
import { DivisorDeGastos } from "../domain/DivisorDeGastos";

describe("DivisorDeGastos", () => {
  it("los saldos de todas las personas suman cero", () => {
    const divisor = new DivisorDeGastos();
    let suma = 0;
    divisor.calcularSaldos().forEach((saldo) => (suma += saldo));
    expect(suma).toBeCloseTo(0, 1);
  });
});
