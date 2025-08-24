// public/pessoaScript.js

const API_URL = "/api/pessoas";

const pessoaForm = document.getElementById("pessoaForm");
const pessoaList = document.getElementById("pessoaList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

async function loadPessoas() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    console.error("Erro na API ao carregar pessoas:", await res.json());
    return;
  }

  const pessoas = await res.json();
  pessoaList.innerHTML = "";
  pessoas.forEach((pessoa) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div>
                <strong>ID: ${pessoa.id}</strong> - <strong>${pessoa.nome}</strong> (${pessoa.email})
            </div>
            <div class="actions">
                <button onclick="editPessoa(${pessoa.id})">Editar</button>
                <button onclick="deletePessoa(${pessoa.id})">🗑 Excluir</button>
            </div>
        `;
    pessoaList.appendChild(li);
  });
}

pessoaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });

  if (!res.ok) {
    console.error("Erro ao cadastrar pessoa:", await res.json());
    return;
  }

  pessoaForm.reset();
  loadPessoas();
});

async function deletePessoa(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    console.error("Erro ao deletar pessoa:", await res.json());
    return;
  }
  loadPessoas();
}

async function editPessoa(id) {
  const newNome = prompt("Novo nome:");
  const newEmail = prompt("Novo email:");
  if (newNome && newEmail) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: newNome,
        email: newEmail,
      }),
    });
    if (!res.ok) {
      console.error("Erro ao editar pessoa:", await res.json());
      return;
    }
    loadPessoas();
  }
}

async function searchPessoaById() {
  const id = searchInput.value;
  if (!id) {
    alert("Por favor, digite um ID para buscar.");
    return;
  }

  const res = await fetch(`${API_URL}/${id}`);
  const pessoa = await res.json();

  if (!res.ok) {
    alert(pessoa.error || "Pessoa não encontrada.");
    pessoaList.innerHTML = "";
    return;
  }

  pessoaList.innerHTML = "";
  const li = document.createElement("li");
  li.innerHTML = `
        <div>
            <strong>ID: ${pessoa.id}</strong> - <strong>${pessoa.nome}</strong> (${pessoa.email})
        </div>
        <div class="actions">
            <button onclick="editPessoa(${pessoa.id})">Editar</button>
            <button onclick="deletePessoa(${pessoa.id})">🗑 Excluir</button>
        </div>
    `;
  pessoaList.appendChild(li);
}

searchButton.addEventListener("click", searchPessoaById);

loadPessoas();
