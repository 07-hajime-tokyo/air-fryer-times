const foods = [
  {
    name: "冷凍ポテト 細め",
    category: "野菜・揚げ物",
    state: "冷凍",
    temp: "200℃",
    time: "8-11分",
    turn: "5分で振る",
    finish: "全体が薄く色づき、端がカリッとしたらOK。",
    tip: "重ねると蒸れます。まず8分で見て、足りなければ1分ずつ追加。",
  },
  {
    name: "冷凍イカゲソ",
    category: "魚介",
    state: "冷凍",
    temp: "190℃",
    time: "8-11分",
    turn: "5分で返す",
    finish: "身が白く不透明になり、ぷりっと締まればOK。目安は中心63℃。",
    tip: "水気が出やすいので、霜を払って軽く油。長く焼くと硬くなります。",
  },
  {
    name: "冷凍砂肝 銀皮なし",
    category: "肉",
    state: "冷凍",
    temp: "190℃",
    time: "14-18分",
    turn: "7-8分で振る",
    finish: "中心まで熱く、鶏系なので中心74℃を目安にします。",
    tip: "小さめに切って冷凍してあるなら短め。大きい塊は追加で2分ずつ。",
  },
  {
    name: "鮭 切り身",
    category: "魚",
    state: "冷蔵",
    temp: "190℃",
    time: "8-11分",
    turn: "返さなくてOK",
    finish: "身がほぐれ、中心63℃目安。厚い切り身は12分前後。",
    tip: "皮を下にして焼くと崩れにくい。塩鮭は焦げやすいので下限から。",
  },
  {
    name: "さんま",
    category: "魚",
    state: "冷蔵",
    temp: "200℃",
    time: "12-15分",
    turn: "7分で返す",
    finish: "皮が香ばしく、身が骨から離れやすければOK。中心63℃目安。",
    tip: "長ければ半分に切る。脂が落ちるので、下にアルミか受け皿があると楽。",
  },
  {
    name: "さば 切り身",
    category: "魚",
    state: "冷蔵",
    temp: "190-200℃",
    time: "9-12分",
    turn: "途中で返す",
    finish: "皮が焼け、身が不透明でほぐれればOK。中心63℃目安。",
    tip: "皮を上にすると皮が乾きやすい。塩さばは焦げに注意。",
  },
  {
    name: "豚もも薄切り",
    category: "肉",
    state: "冷蔵",
    temp: "190℃",
    time: "6-9分",
    turn: "4分で返す",
    finish: "赤みがなく、中心63℃到達後に3分休ませます。",
    tip: "広げて焼くと早い。重なる場合は途中でほぐします。",
  },
  {
    name: "豚ロース 1cm",
    category: "肉",
    state: "冷蔵",
    temp: "190℃",
    time: "9-12分",
    turn: "5-6分で返す",
    finish: "中心63℃到達後に3分休ませます。厚い端は追加加熱。",
    tip: "筋切りして、焼く前に表面の水気を拭くと反りにくいです。",
  },
];

const categoryFilter = document.querySelector("#categoryFilter");
const stateFilter = document.querySelector("#stateFilter");
const searchInput = document.querySelector("#searchInput");
const foodGrid = document.querySelector("#foodGrid");
const resultCount = document.querySelector("#resultCount");
const template = document.querySelector("#foodCardTemplate");

function init() {
  const categories = [...new Set(foods.map((food) => food.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  [categoryFilter, stateFilter, searchInput].forEach((control) => {
    control.addEventListener("input", render);
  });

  render();
}

function matches(food) {
  const category = categoryFilter.value;
  const state = stateFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  if (category !== "all" && food.category !== category) return false;
  if (state !== "all" && food.state !== state) return false;
  if (!query) return true;

  return [food.name, food.category, food.state, food.finish, food.tip]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function render() {
  const filtered = foods.filter(matches);
  foodGrid.replaceChildren();

  filtered.forEach((food) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".card-kicker").textContent = food.category;
    node.querySelector("h3").textContent = food.name;
    const statePill = node.querySelector(".state-pill");
    statePill.textContent = food.state;
    if (food.state === "冷凍") statePill.classList.add("frozen");
    node.querySelector(".temp").textContent = food.temp;
    node.querySelector(".time").textContent = food.time;
    node.querySelector(".turn").textContent = food.turn;
    node.querySelector(".finish").textContent = food.finish;
    node.querySelector(".tip").textContent = food.tip;
    foodGrid.appendChild(node);
  });

  resultCount.textContent = `${filtered.length}件表示`;
}

init();
