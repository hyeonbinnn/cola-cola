# 🥤 Cola Cola
![image3](https://github.com/hyeonbinnn/cola-cola/assets/117449788/11c38953-3c94-4721-b4cd-074679a3ceca)

<br>
<br>

## 구현 기간

`2023.04.30 ~ 2023.05.08`

<br>
<br>

## 폴더 구조
```
🥤 cola-cola
├─ 📦 css
│  └─ 🎨 style.css
│  └─ 🎨 splash.css
├─ 📦 img
│  └─ 🖼️ cola-cool.png
│  └─ 🖼️ cola-green.png
│  └─ 🖼️ cola-logo.png
│  └─ 🖼️ cola-orange.png
│  └─ 🖼️ cola-original.png
│  └─ 🖼️ cola-violet.png
│  └─ 🖼️ cola-yellow.png
│  └─ 🖼️ soldout.png
│  └─ 🖼️ whiteLogo.png
├─ 📦 js
│  ├─ 📂 classes
│  │  └─ 📜 colaGenerator.js
│  │  └─ 📜 VendingMachineEvents.js
├  ├─ 📜 index.js
├─ 📃 index.html
├─ 🪧 items.json
```

<br>
<br>

## 사용 기술

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
</div>

<br>
<br>

## 구현 기능

- 입금 버튼 기능
- 거스름돈 반환 버튼 기능
- 자판기 장바구니 채우기
- 획득 버튼 기능
- 나의 장바구니 콜라 생성

<br>
<br>

## 코드 설명

### ⚙️ 콜라 아이템 정보

```json
[
  {
    "name": "Original Cola",
    "cost": 1000, 
    "img": "cola-original.png", 
    "count": 5 
  },
  {
    "name": "Violet Cola",
    "cost": 1000,
    "img": "cola-violet.png",
    "count": 5
  },
  {
    "name": "Yellow Cola",
    "cost": 1000,
    "img": "cola-yellow.png",
    "count": 5
  },
  {
    "name": "Cool Cola",
    "cost": 1000,
    "img": "cola-cool.png",
    "count": 5
  },
  {
    "name": "Green Cola",
    "cost": 1000,
    "img": "cola-green.png",
    "count": 5
  },
  {
    "name": "Orange Cola",
    "cost": 1000,
    "img": "cola-orange.png",
    "count": 5
  }
]
```
<br>
<br>

### saveTodo 함수

```js
const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
```

- `todos` 배열을 로컬 스토리지에 저장하는 함수다.
- `localStorage.setItem('todos', JSON.stringify(todos))`를 호출해, `todos` 배열을 JSON 형식으로 변환하여 로컬 스토리지에 저장한다.
<br>

![](https://velog.velcdn.com/images/hyeonbinnn/post/ac41e048-7a6b-4870-9cfa-4ecc34986aa4/image.png)

<br>
<br>

### delTodo 함수

```js
const delTodo = (event) => {
  const target = event.target.parentElement;
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  saveTodo();

  target.remove();
};
```

- 할 일 목록을 삭제하는 함수다.
- 클릭한 버튼의 부모 요소인 `li`를 찾아서 문서에서 삭제한다.
- `todos` 배열에서 해당 `id` 값을 가진 요소를 찾아서 삭제한 후, 변경된 `todos` 배열을 다시 저장한다.
<br>

![](https://velog.velcdn.com/images/hyeonbinnn/post/029c1bfd-e5f1-4426-8eff-cc6a445ee341/image.gif)

<br>
<br>

### allClear 함수

```js
const allClear = () => {
  localStorage.clear('todos', JSON.stringify(todos));
  ul.innerHTML = '';
};
```

- 모든 할 일 목록을 삭제하는 함수다.
- `localStorage.clear('todos', JSON.stringify(todos))`를 호출해 로컬 스토리지의 `todos` 데이터를 삭제한다.
- `ul.innerHTML`을 빈 문자열로 설정해 할 일 목록을 비운다.
<br>

![](https://velog.velcdn.com/images/hyeonbinnn/post/1ba1e4f3-dad8-4f3a-a00e-3d5d1f0c85ec/image.gif)

<br>
<br>

### addTodo 함수

```js
const addTodo = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');
    const check = document.createElement('button');

    check.innerText = '✔';
    check.classList.add('btn-check');
    span.innerText = todo.text;
    button.innerText = '✘';
    button.classList.add('btn-x');

    button.addEventListener('click', delTodo);
    clear.addEventListener('click', allClear);
    check.addEventListener('click', () => {
      li.classList.toggle('complete');
      todo.completed = !todo.completed;
      saveTodo();
    });

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    li.id = todo.id;

    if (todo.completed) {
      li.classList.add('complete');
    }
  }
};
```

- 새로운 할 일 항목을 화면에 추가하는 함수다.
- 인자로 받은 `todo` 객체를 사용해 HTML요소를 동적으로 생성하고 문서에 추가한다.
- 버튼의 클릭 이벤트와 완료 상태 변경을 처리하는 함수를 등록한다.
- 생성한 리스트 요소의 `id` 값을 `todo` 객체의 `id` 값으로 지정한다.
- 완료된 항목인 경우 `li` 요소에 `complete` 클래스를 추가해 완료 상태를 시각적으로 표시한다.
<br>

![](https://velog.velcdn.com/images/hyeonbinnn/post/7e12b1c4-63f4-4b07-8ae5-e52993ece657/image.png)

<br>
<br>

### handleSubmit 함수

```js
const handleSubmit = (event) => {
  event.preventDefault();
  const todo = {
    id: Date.now(),
    text: input.value,
    completed: false,
  };

  todos.push(todo);
  addTodo(todo);
  saveTodo();
  input.value = '';
};
```

- 폼 제출 이벤트를 처리하는 함수다.
- `event.preventDefault()`를 호출해 페이지가 새로고침되는 것을 방지한다.
- 입력된 텍스트를 사용해 새로운 `todo` 객체를 생성하고 `todos` 배열에 추가한다.
- `addTodo` 함수를 호출해 새로운 할 일을 화면에 추가한다.
- `saveTodo` 함수를 호출해 변경된 `todos` 배열을 저장한다.
- 입력 창을 공백으로 초기화한다.

<br>
<br>

### init 함수

```js
const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos'));

  if (userTodos) {
    userTodos.forEach((todo) => {
      addTodo(todo);
    });

    todos = userTodos;
  }
};
```

- 페이지가 로드될 때 호출되는 함수다.
- `localStorage.getItem('todos')`를 사용해 로컬 스토리지에서 `todos` 데이터를 가져온다.
- 가져온 데이터는 JSON 형식으로 저장되어 있으므로 `JSON.parse`를 사용하여 파싱한 후 `userTodos` 변수에 저장한다.
- 만약 `userTodos`가 존재한다면, 각 `todo` 객체에 대해 `addTodo` 함수를 호출해 화면에 할 일을 추가한다.
- `todos` 배열을, 가져온 `userTodos`로 초기화한다.

<br>
<br>

### 이벤트 처리와 초기화

```js
init();

form.addEventListener('submit', handleSubmit);

const today = new Date();
const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(
  2,
  '0'
)}.${String(today.getDate()).padStart(2, '0')}`;

document.getElementById('current-date').textContent = formattedDate;
```

- `init` 함수를 호출해 페이지가 로드될 때 기존의 할 일 목록을 가져와서 화면에 표시한다.
- `form` 요소에 `submit` 이벤트가 발생하면 `handleSubmit` 함수가 호출된다.
- 오늘 날짜를 가져와서 `formattedDate` 변수에 저장한다.
- 해당 날짜를 `current-data` id를 가진 HTML요소에 `textContent`를 사용하여 날짜를 설정한다.
