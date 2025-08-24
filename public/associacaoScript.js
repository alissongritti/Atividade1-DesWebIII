// public/associacaoScript.js

const API_URL_PESSOAS = "/api/pessoas";
const API_URL_CARROS = "/api/carros";
const API_URL_ASSOCIACOES = "/api/associacoes";

const pessoaSelect = document.getElementById("pessoaSelect");
const carroSelect = document.getElementById("carroSelect");
const associacaoForm = document.getElementById("associacaoForm");
const associacaoList = document.getElementById("associacaoList");

async function loadOptions() {
  // Carregar Pessoas
  const pessoasRes = await fetch(API_URL_PESSOAS);
  const pessoas = await pessoasRes.json();
  pessoaSelect.innerHTML = "<option value=''>Selecione uma Pessoa</option>";
  pessoas.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.nome;
    pessoaSelect.appendChild(option);
  });

  // Carregar Carros
  const carrosRes = await fetch(API_URL_CARROS);
  const carros = await carrosRes.json();
  carroSelect.innerHTML = "<option value=''>Selecione um Carro</option>";
  carros.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = `${c.marca} ${c.modelo}`;
    carroSelect.appendChild(option);
  });

  loadAssociacoes();
}

async function loadAssociacoes() {
  const res = await fetch(API_URL_ASSOCIACOES);
  if (!res.ok) {
    console.error("Erro ao carregar associações:", await res.json());
    return;
  }
  const associacoes = await res.json();
  associacaoList.innerHTML = "";
  associacoes.forEach((assoc) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div>
                <strong>Pessoa:</strong> ${assoc.pessoa.nome} (ID: ${assoc.pessoa.id}) | Email: ${assoc.pessoa.email}<br>
                <strong>Carro:</strong> ${assoc.carro.marca} ${assoc.carro.modelo} (ID: ${assoc.carro.id}) | Ano: ${assoc.carro.ano}
            </div>
            <div class="actions">
                <button onclick="deleteAssociacao(${assoc.id})">🗑 Excluir</button>
            </div>
        `;
    associacaoList.appendChild(li);
  });
}

associacaoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pessoaId = pessoaSelect.value;
  const carroId = carroSelect.value;
  if (!pessoaId || !carroId) {
    alert("Selecione uma pessoa e um carro.");
    return;
  }

  const res = await fetch(API_URL_ASSOCIACOES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pessoaId: Number(pessoaId),
      carroId: Number(carroId),
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Erro ao associar:", errorData);
    alert(`Erro ao associar: ${errorData.error}`);
    return;
  }

  associacaoForm.reset();
  loadAssociacoes();
});

async function deleteAssociacao(id) {
  const res = await fetch(`${API_URL_ASSOCIACOES}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Erro ao deletar associação:", errorData);
    alert(`Erro ao deletar: ${errorData.error}`);
    return;
  }
  loadAssociacoes();
}

loadOptions();
