const input = document.getElementById('pokemon-input');
const btn = document.getElementById('search-btn');

const card = document.getElementById('pokemon-card');
const errorMessage = document.getElementById('error-message');

const nameElem = document.getElementById('pokemon-name');
const idElem = document.getElementById('pokemon-id');
const imgElem = document.getElementById('pokemon-image');
const typeElem = document.getElementById('pokemon-type');
const statsElem = document.getElementById('pokemon-stats');

// 隱藏卡片與錯誤訊息的函式
function hideAll() {
  card.classList.add('hidden');
  errorMessage.classList.add('hidden');
}

// 顯示寶可夢資料的函式
function showPokemon(data) {
  nameElem.textContent = data.name.toUpperCase();
  idElem.textContent = `編號: #${data.id}`;
  imgElem.src = data.sprites.front_default || '';
  imgElem.alt = data.name;
  typeElem.textContent = '屬性: ' + data.types.map(t => t.type.name).join(', ');

  // 清空之前的能力值列表
  statsElem.innerHTML = '';
  data.stats.forEach(stat => {
    const li = document.createElement('li');
    li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsElem.appendChild(li);
  });

  card.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

// 按鈕點擊事件
btn.addEventListener('click', () => {
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  hideAll();

  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => {
      if (!response.ok) throw new Error('查無資料');
      return response.json();
    })
    .then(data => {
      showPokemon(data);
    })
    .catch(() => {
      errorMessage.classList.remove('hidden');
    });
});