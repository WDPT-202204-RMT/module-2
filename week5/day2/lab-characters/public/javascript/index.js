const charactersAPI = new APIHandler("http://localhost:8000");
const charactersInfoTemplate = document.querySelector(".character-info");
const charactersContainer = document.querySelector(".characters-container");

function createCharacterCard(character) {
  const visual = charactersInfoTemplate.cloneNode(true);
  visual.querySelector(".name").innerText += ": " + character.name;
  visual.querySelector(".occupation").innerText += ": " + character.occupation;
  visual.querySelector(".cartoon").innerText += ": " + character.cartoon;
  visual.querySelector(".weapon").innerText += ": " + character.weapon;
  return visual;
}

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      const data = await charactersAPI.getFullList();
      data.forEach((element) => {
        const card = createCharacterCard(element);
        charactersContainer.appendChild(card);
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      const id = document.querySelector("input[name=character-id]").value;
      const data = await charactersAPI.getOneRegister(id);
      const card = createCharacterCard(data);
      charactersContainer.appendChild(card);
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      const id = document.querySelector(
        "input[name=character-id-delete]"
      ).value;
      const button = document.querySelector("#delete-one");
      try {
        await charactersAPI.deleteOneRegister(id);
        button.style.backgroundColor = "green";
      } catch (error) {
        button.style.backgroundColor = "red";
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const id = document.querySelector(
        "#edit-character-form>.field>input[name=chr-id]"
      ).value;
      const name = document.querySelector(
        "#edit-character-form>.field>input[name=name]"
      ).value;
      const occupation = document.querySelector(
        "#edit-character-form>.field>input[name=occupation]"
      ).value;
      const weapon = document.querySelector(
        "#edit-character-form>.field>input[name=weapon]"
      ).value;
      const cartoon = document.querySelector(
        "#edit-character-form>.field>input[name=cartoon]"
      ).value;
      const button = document.querySelector("#edit-character-form>#send-data");

      try {
        await charactersAPI.updateOneRegister(id, {
          name,
          occupation,
          weapon,
          cartoon,
        });
        button.style.backgroundColor = "green";
      } catch (error) {
        button.style.backgroundColor = "red";
      }
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const name = document.querySelector(
        "#new-character-form>.field>input[name=name]"
      ).value;
      const occupation = document.querySelector(
        "#new-character-form>.field>input[name=occupation]"
      ).value;
      const weapon = document.querySelector(
        "#new-character-form>.field>input[name=weapon]"
      ).value;
      const cartoon = document.querySelector(
        "#new-character-form>.field>input[name=cartoon]"
      ).value;
      const button = document.querySelector("#new-character-form>#send-data");
      try {
        await charactersAPI.createOneRegister({
          name,
          occupation,
          weapon,
          cartoon,
        });
        button.style.backgroundColor = "green";
      } catch (error) {
        button.style.backgroundColor = "red";
      }
    });
});
