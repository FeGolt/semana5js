const formCep = document.querySelector("#form-cep");
const inputCep = document.querySelector("#input-cep");
const btnCep = document.querySelector("#btn-cep");
const statusCep = document.querySelector("#status-cep");
const resultadoCep = document.querySelector("#resultado-cep");
const listaHistorico = document.querySelector("#lista-historico");

const historicoCeps = [];

formCep.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const cepLimpo = inputCep.value.trim().replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        statusCep.textContent = "Digite um CEP válido com 8 dígitos.";
        resultadoCep.replaceChildren();
        return;
    }

    statusCep.textContent = "Buscando...";
    btnCep.disabled = true;
    resultadoCep.replaceChildren();

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            throw new Error("Falha na conexão com o servidor.");
        }

        const data = await response.json();

        if (data.erro) {
            statusCep.textContent = "CEP não encontrado.";
            return;
        }

        statusCep.textContent = "";

        const dl = document.createElement("dl");

        const dtRua = document.createElement("dt");
        dtRua.textContent = "Rua:";
        const ddRua = document.createElement("dd");
        ddRua.textContent = data.logradouro || "N/A";

        const dtBairro = document.createElement("dt");
        dtBairro.textContent = "Bairro:";
        const ddBairro = document.createElement("dd");
        ddBairro.textContent = data.bairro || "N/A";

        const dtCidade = document.createElement("dt");
        dtCidade.textContent = "Cidade:";
        const ddCidade = document.createElement("dd");
        ddCidade.textContent = data.localidade || "N/A";

        const dtUf = document.createElement("dt");
        dtUf.textContent = "UF:";
        const ddUf = document.createElement("dd");
        ddUf.textContent = data.uf || "N/A";

        dl.append(dtRua, ddRua, dtBairro, ddBairro, dtCidade, ddCidade, dtUf, ddUf);
        resultadoCep.replaceChildren(dl);

        if (!historicoCeps.some(item => item.cep === data.cep)) {
            historicoCeps.push({ cep: data.cep, cidade: data.localidade, uf: data.uf });
            atualizarHistorico();
        }

    } catch (error) {
        statusCep.textContent = error.message || "Erro de rede ao buscar o CEP.";
    } finally {
        btnCep.disabled = false;
    }
});

function atualizarHistorico() {
    listaHistorico.replaceChildren();
    historicoCeps.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.cep} - ${item.cidade}/${item.uf}`;
        listaHistorico.append(li);
    });
}