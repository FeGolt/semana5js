const pedidos = [
    { cliente: "Bia", valor: 120.00, status: "pago" },
    { cliente: "Carlos", valor: 0, status: "pago" },
    { cliente: "", valor: 50.00, status: "pago" },
    { cliente: "Ana", valor: 85.50, status: "pendente" },
    { cliente: "João", valor: 200.00, status: "pago" }
];

const pedidosValidos = pedidos.filter(p => typeof p.cliente === "string" && p.cliente.trim() !== "" && typeof p.valor === "number" && p.valor > 0);

const pedidosPagos = pedidosValidos.filter(p => p.status === "pago");

const totalFaturado = pedidosPagos.reduce((acumulador, p) => acumulador + p.valor, 0);

const textosFormatados = pedidosPagos.map(p => `${p.cliente} – R$ ${p.valor.toFixed(2)}`);

console.log("Pedidos Válidos e Pagos:", textosFormatados);
console.log("Total Faturado: R\$", totalFaturado.toFixed(2));