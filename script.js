const baseUrl = "https://superheroapi.com/api/2063471723999700";
const generateButton = document.getElementById("generateButton");
const nameElement = document.getElementById("name");
const imageElement = document.getElementById("image");
const publisherElement = document.getElementById("publisher");
const aliasesElement = document.getElementById("aliases");
const firstAppearanceElement = document.getElementById("firstAppearance");
const alignmentElement = document.getElementById("alignment");
const affiliationElement = document.getElementById("affiliation");

function generateID() {
  const randomHeroId = Math.floor(Math.random() * 731) + 1;
  return randomHeroId;
}
function displayHero() {
  const id = generateID();
  getHero(id);
}

const getHero = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const data = await response.json();

    nameElement.textContent = data.name;

    imageElement.src = data.image.url;
    imageElement.onerror = () => {
      imageElement.src =
        "https://www.seekpng.com/png/full/349-3499598_portrait-placeholder-placeholder-person.png";
    };

    publisherElement.textContent =
      data.biography.publisher === "" || data.biography.publisher === "null"
        ? "Publisher: N/A"
        : `Publisher: ${data.biography.publisher}`;

    aliasesElement.textContent =
      Array.isArray(data.biography.aliases) &&
      data.biography.aliases.includes("-")
        ? "Aliases: N/A"
        : `Aliases: ${data.biography.aliases.join(", ")}`;

    firstAppearanceElement.textContent =
      data.biography["first-appearance"] === "-"
        ? "First Appearance: N/A"
        : `First Appearance: ${data.biography["first-appearance"]}`;

    alignmentElement.textContent =
      data.biography.alignment === "null" || data.biography.alignment === "-"
        ? "Alignment: N/A"
        : `Alignment: ${data.biography.alignment}`;

    affiliationElement.textContent =
      data.connections["group-affiliation"] === "-"
        ? "Affiliation: N/A"
        : `Affiliation: ${data.connections["group-affiliation"]}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

generateButton.addEventListener("click", displayHero);

displayHero();
