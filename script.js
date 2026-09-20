const repositoryList = document.querySelector("#repository-list");

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${date}T00:00:00`));
}

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository";

    const title = document.createElement("h2");
    const link = document.createElement("a");
    link.href = repository.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = repository.name;
    title.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const metadata = document.createElement("p");
    metadata.className = "repository-meta";
    metadata.innerHTML = `
      <span>${repository.language}</span>
      <span>${repository.stars.toLocaleString()} stars</span>
      <span>Starred ${formatDate(repository.starredAt)}</span>
    `;

    item.append(title, description, metadata);
    repositoryList.append(item);
  });
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = "<li class=\"status\">Unable to load starred repositories.</li>";
    console.error(error);
  }
}

loadRepositories();
