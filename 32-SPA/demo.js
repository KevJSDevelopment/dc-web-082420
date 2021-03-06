function render(e) {
  let n = document.createElement('div');
  (n.innerHTML += `<div class='card'\n    id='pokemon-${e.id}'><h2>${e.name}</h2>\n    <img src="${e.sprite}"/></div>`),
    document.getElementById('pokemon-container').appendChild(n),
    n.addEventListener('click', function () {
      deletePokemon(e.id);
    });
}
function fetchAllPokemon() {
  fetch('http://localhost:3000/pokemon/')
    .then((e) => e.json())
    .then((e) => {
      e.forEach((e) => render(e));
    });
}
function postNewPokemon(e, n) {
  let t = { name: e, sprite: n };
  fetch('http://localhost:3000/pokemon/', {
    method: 'POST',
    body: JSON.stringify(t),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((e) => e.json())
    .then((e) => {
      render(e);
    });
}
function deletePokemon(e) {
  fetch(`http://localhost:3000/pokemon/${e}`, { method: 'DELETE' }).then(
    (n) => {
      document.getElementById(`pokemon-${e}`).remove();
    }
  );
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(),
      postNewPokemon(
        document.getElementById('name-input').value,
        document.getElementById('sprite-input').value
      );
  }),
    fetchAllPokemon();
});
