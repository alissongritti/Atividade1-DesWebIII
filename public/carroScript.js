// public/carroScript.js

// Altere a URL para o prefixo correto
const API_URL = "/api/carros";

const carroForm = document.getElementById("carroForm");
const carroList = document.getElementById("carroList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

async function loadCarros() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    console.error("Erro na API ao carregar carros:", await res.json());
    return;
  }

  const carros = await res.json();
  carroList.innerHTML = "";
  carros.forEach((carro) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div>
                <strong>ID: ${carro.id}</strong> - <strong>${carro.marca}</strong> - ${carro.modelo} (${carro.ano})
            </div>
            <div class="actions">
                <button onclick="editCarro(${carro.id})">Editar</button>
                <button onclick="deleteCarro(${carro.id})">🗑 Excluir</button>
            </div>
        `;
    carroList.appendChild(li);
  });
}

carroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const ano = document.getElementById("ano").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ marca, modelo, ano: parseInt(ano) }),
  });

  if (!res.ok) {
    console.error("Erro ao cadastrar carro:", await res.json());
    return;
  }

  carroForm.reset();
  loadCarros();
});

async function deleteCarro(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    console.error("Erro ao deletar carro:", await res.json());
    return;
  }
  loadCarros();
}

async function editCarro(id) {
  const newMarca = prompt("Nova marca:");
  const newModelo = prompt("Novo modelo:");
  const newAno = prompt("Novo ano:");
  if (newMarca && newModelo && newAno) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marca: newMarca,
        modelo: newModelo,
        ano: parseInt(newAno),
      }),
    });
    if (!res.ok) {
      console.error("Erro ao editar carro:", await res.json());
      return;
    }
    loadCarros();
  }
}

// Nova função para buscar um carro por ID
async function searchCarroById() {
  const id = searchInput.value;
  if (!id) {
    alert("Por favor, digite um ID para buscar.");
    return;
  }

  const res = await fetch(`${API_URL}/${id}`);
  const carro = await res.json();

  if (!res.ok) {
    alert(carro.error || "Carro não encontrado.");
    return;
  }

  carroList.innerHTML = ""; // Limpa a lista antes de exibir o resultado
  const li = document.createElement("li");
  li.innerHTML = `
        <div>
            <strong>ID: ${carro.id}</strong> - <strong>${carro.marca}</strong> - ${carro.modelo} (${carro.ano})
        </div>
        <div class="actions">
            <button onclick="editCarro(${carro.id})">Editar</button>
            <button onclick="deleteCarro(${carro.id})">🗑 Excluir</button>
        </div>
    `;
  carroList.appendChild(li);
}

// Adiciona o ouvinte de evento para o botão de busca
searchButton.addEventListener("click", searchCarroById);

// ... (código anterior)

// Nova função para buscar um carro por ID
async function searchCarroById() {
  const id = searchInput.value;
  if (!id) {
    alert("Por favor, digite um ID para buscar.");
    return;
  }

  const res = await fetch(`${API_URL}/${id}`);
  const carro = await res.json();

  if (!res.ok) {
    alert(carro.error || "Carro não encontrado.");
    // Se o carro não for encontrado, limpe a lista para não confundir o usuário.
    carroList.innerHTML = "";
    return;
  }

  carroList.innerHTML = ""; // Limpa a lista de todos os carros
  const li = document.createElement("li");
  li.innerHTML = `
        <div>
            <strong>ID: ${carro.id}</strong> - <strong>${carro.marca}</strong> - ${carro.modelo} (${carro.ano})
        </div>
        <div class="actions">
            <button onclick="editCarro(${carro.id})">Editar</button>
            <button onclick="deleteCarro(${carro.id})">🗑 Excluir</button>
        </div>
    `;
  carroList.appendChild(li);
}

// Adiciona o ouvinte de evento para o botão de busca
searchButton.addEventListener("click", searchCarroById);

loadCarros();
