/* ---- NAV ACTIVE LINK ---- */
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
function setActive() {
  let index = sections.length;
  while (--index && window.scrollY + 80 < sections[index].offsetTop) { }
  links.forEach(link => link.classList.remove('active'));
  links[index].classList.add('active');
}
setActive();
window.addEventListener('scroll', setActive);

/* ---- TODO APP ---- */
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${task}</span> ✕`;
    li.addEventListener('click', () => {
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    });
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const val = taskInput.value.trim();
  if (!val) return;
  tasks.push(val);
  taskInput.value = '';
  saveTasks();
  renderTasks();
});

renderTasks();

/* ---- PRODUCT LISTING ---- */
const products = [
  { name: 'Laptop', category: 'electronics', price: 900, rating: 4.5 },
  { name: 'Phone', category: 'electronics', price: 500, rating: 4.7 },
  { name: 'Vacuum Cleaner', category: 'home', price: 150, rating: 4.2 },
  { name: 'Sofa', category: 'home', price: 800, rating: 4.1 },
  { name: 'Football', category: 'sport', price: 25, rating: 4.6 },
  { name: 'Tennis Racket', category: 'sport', price: 120, rating: 4.4 },
];

const productGrid = document.getElementById('productGrid');

function displayProducts(list) {
  productGrid.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
          <h4>${p.name}</h4>
          <p>$${p.price.toFixed(2)}</p>
          <p class="rating">⭐ ${p.rating}</p>
        `;
    productGrid.appendChild(div);
  });
}

function filterAndSort() {
  const category = document.getElementById('categorySelect').value;
  const sortBy = document.getElementById('sortSelect').value;
  let filtered = category === 'all' ? [...products] : products.filter(p => p.category === category);
  filtered.sort((a, b) => a[sortBy] - b[sortBy]);
  displayProducts(filtered);
}

filterAndSort();