# 🥤 Cola Cola 자판기
![image4](https://github.com/hyeonbinnn/cola-cola/assets/117449788/758f4f68-f402-48f9-9cdf-4a95cae72b15)

<br>
<br>

## 목차
1. [구현 기간 & 배포 링크](#-구현-기간-&-배포-링크)  
2. [폴더 구조](#-폴더-구조)   
3. [사용 기술](#-사용-기술)   
4. [구현 기능](#-구현-기능)
5. [콜라 아이템 정보](#-콜라-아이템-정보)
6. [JavaScript 파일 모듈화](#-JavaScript-파일-모듈화)

<br>
<br>

## 구현 기간 배포 링크

> ### vending-machine : 콜라 자판기 만들기
> `2023.04.30 ~ 2023.05.08` <br>
>
> <strong>[`배포 URL 바로가기`](https://colacola.netlify.app)</strong>

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

## 콜라 아이템 정보

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

## ⚙️ JavaScript 파일 모듈화
클래스를 만들고 인스턴스를 생성한 후에 `index.js`에서 2개의 클래스를 임포트하고, `index.html`에 모듈로 연결한다.

### Why? 
코드의 구조를 모듈화해 관리하기 위해서! 모듈화를 통해 코드를 작은 단위로 나누고, 각 단위별로 독립적으로 동작하게 만들어서 가독성과 유지보수성을 높일 수 있다.

### 모듈화 이점
- 코드의 재사용성
- 코드의 가독성
- 유지보수 용이성
- 코드의 구조화
- 충돌 방지

<br>
<br>

## 📜 콜라 버튼 생성 클래스 (ColaGenerator)
```js
class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector('.section1 .cola-list');
  }

  async setup() {
    try {
      const response = await this.loadData();
      if (response) {
        this.colaFactory(response);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loadData() {
    try {
      const response = await fetch('./items.json');

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
      return null; // 데이터 로딩 실패 시 null 반환
    }
  }

  colaFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement('li');
      const itemTemplate = `
          <button class="btn-cola" type="button" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
              <img class="cola-img" src="./img/${el.img}" alt="">
              <span class="cola-name">${el.name}</span>
              <strong class="cola-price">${el.cost}원</strong>
          </button>
          `;

      item.innerHTML = itemTemplate;
      docFrag.append(item);
    });
    this.itemList.append(docFrag);
  }
}

export default ColaGenerator;
```
<br>

> ### setup() 메서드
>
> `setup()` 메서드는 비동기 함수로, 초기 설정을 위해 `loadData()`와 `colaFactory()`를 차례로 실행한다.
> 
> `await this.loadData` 데이터를 로드하고, 로드가 완료될 때까지 기다리며, 작업이 완료될 때가지 다음 코드를 실행하지 않는다. 
>
> 그 다음, 로드된 데이터가 있으면 `this.colaFactory(response)`를 호출해 데이터를 가지고 콜라 아이템을 생성한다.
>  
> 에러가 발생하면, `catch`블록에서 에러를 콘솔에 기록하고 `null` 값을 반환한다.
> <br>
> <br>
>
> ### loadData() 메서드
>
> `loadData()` 메서드는 비동기 함수로, 서버에서 데이터를 가져오는 역할을 한다.
> 
> `fetch` 함수를 사용해서 `./items.json`에서 데이터를 가져온다.
>
> 만약 서버가 정상적으로 응답하면, JSON 데이터를 반환하고, 그렇지 않으면 마찬가지로 `catch` 블록에서 에러를 콘솔에 기록하고, `null` 값을 반환한다.
> <br>
> <br>
>
> ### colaFactory() 메서드
>
> `colaFactory()` 메서드는 받은 데이터를 이용해 HTML 요소를 동적으로 생성하고, 콜라 상품 목록에 추가한다.
>
> `document.createDocumentFragment()`를 사용해 여러 개의 DOM 요소를 생성한 후에 한 번에 추가하도록 한다.
>
> `data` 배열의 각 요소를 반복하면서 버튼 요소를 생성하고, 각각의 데이터를 해당 요소의 속성에 저장한다. 그리고 이 버튼을 `docFrag`에 추가한다.
>
> 마지막으로 `docFrag`를 `this.itemList`에 추가해 실제 웹 페이지에 콜라 상품 목록을 표시한다.

<br>
<br>

## 📜 자판기 이벤트 처리 클래스 (VendingMachineEvents)
### 0. DOM에서 필요한 요소들 선택해 클래스의 프로퍼티로 할당하기
```js
constructor() {
  const vMachine = document.querySelector('.section1');
  this.balance = vMachine.querySelector('.bg-box p');
  this.itemList = vMachine.querySelector('.cola-list');
  this.inputCostEl = vMachine.querySelector('#input-money');
  this.btnPut = vMachine.querySelector('#input-money+.btn');
  this.btnReturn = vMachine.querySelector('.bg-box+.btn');
  this.btnGet = vMachine.querySelector('.btn-get');
  this.stagedList = vMachine.querySelector('.get-list');

  const myinfo = document.querySelector('.section2');
  this.myMoney = myinfo.querySelector('.bg-box strong');

  const getInfo = document.querySelector('.section3');
  this.getList = getInfo.querySelector('.get-list');
  this.txtTotal = getInfo.querySelector('.total-price');
}

bindEvent() { ... } // 여러가지 이벤트 핸들러 기능을 수행하는 함수
```

### 1. 입금 버튼 기능
![image (1)](https://github.com/hyeonbinnn/cola-cola/assets/117449788/dfb203f2-9baa-4f05-b1ad-6c8ec34577d0)

```js
this.btnPut.addEventListener('click', () => {
  const inputCost = parseInt(this.inputCostEl.value); // 입력값
  const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', '')); // 소지금
  const balanceVal = parseInt(this.balance.textContent.replaceAll(',', '')); // 잔액

  if (inputCost) {
    // 입금액이 소지금 보다 적거나 같다면
    if (inputCost <= myMoneyVal && inputCost > 0) {
      this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputCost) + '원';
      this.balance.textContent =
        new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + '원';
      // 입금액이 소지금보다 많다면
    } else {
      alert('소지금이 부족합니다.');
    }
    // 입금액 초기화
    this.inputCostEl.value = '';
  }
});
```

### 2. 거스름돈 반환 버튼 기능
![image (2)](https://github.com/hyeonbinnn/cola-cola/assets/117449788/bec05125-57c4-4106-90bb-39f250301ed2)

```js
this.btnReturn.addEventListener('click', () => {
  const balanceVal = parseInt(this.balance.textContent.replaceAll(',', '')); // 잔액
  const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', '')); // 소지금

  if (balanceVal) {
    this.myMoney.textContent = new Intl.NumberFormat().format(balanceVal + myMoneyVal) + '원';
    this.balance.textContent = null;
  }
});
```

### 3. 자판기 장바구니 채우기 기능
![image (3)](https://github.com/hyeonbinnn/cola-cola/assets/117449788/8a3e15d9-c36f-4f61-99a5-951ab1307786)

```js
this.btnsCola = document.querySelectorAll('.section1 .btn-cola');

this.btnsCola.forEach((item) => {
  item.addEventListener('click', (event) => {
    // 이벤트 핸들러 내용
  });
});
```

```js
const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
const targetEl = event.currentTarget;
const targetElPrice = parseInt(targetEl.dataset.price);
const stagedListitem = this.stagedList.querySelectorAll('li');
let isStaged = false; // 이미 장바구니에 있는가?
```

```js
 if (balanceVal >= targetElPrice) {
   this.balance.textContent =
     new Intl.NumberFormat().format(balanceVal - targetElPrice) + '원';

   for (const item of stagedListitem) {
     // 클릭한 콜라의 이름과 장바구니에 있던 콜라의 이름이 같은지 비교!
     if (targetEl.dataset.item === item.dataset.item) {
       // 이미 장바구니에 콜라가 있다면 카운트 +1
       item.querySelector('strong').firstChild.textContent =
         parseInt(item.querySelector('strong').firstChild.textContent) + 1;

       isStaged = true;
       break;
     }
   }
   
   // isStaged가 false인 경우, 장바구니에 새로운 콜라를 생성
   if (!isStaged) {
     //장바구니 콜라 생성 함수 호출
     this.stagedItemGenerator(event.currentTarget);
   }

   // 자판기 콜라 개수 차감
   targetEl.dataset.count--;

   if (!parseInt(targetEl.dataset.count)) {
     targetEl.insertAdjacentHTML(
       'beforeEnd',
       `
       <strong class= "soldout">
       <span>품절</span>
       </strong>
       `
     );

     targetEl.disabled = 'disabled';
   }
 } else {
   alert('입금한 금액이 부족합니다.');
 }
});
});
```

### 4. 획득 버튼 기능
![image (1)](https://github.com/hyeonbinnn/cola-cola/assets/117449788/d5c838ce-97ae-4a43-9e72-16c36d8f6872)


```js
this.btnGet.addEventListener('click', () => {
  // const itemStagedList = this.stagedList.children;
  // const itemGetList = this.getList.children;
  const itemStagedList = this.stagedList.querySelectorAll('li');
  const itemGetList = this.getList.querySelectorAll('li');
  let totalPrice = 0;
```

```js
  for (const itemStaged of itemStagedList) {
    let isGet = false; // 이미 획득했는가?
    for (const itemGet of itemGetList) {
      console.log(itemStaged.querySelector('strong'));
      // 장바구니의 콜라가 이미 획득한 목록에 있다면
      if (itemStaged.dataset.item === itemGet.dataset.item) {
        // 이미 장바구니에 콜라가 있다면 카운트 +1
        itemGet.querySelector('strong').firstChild.textContent =
          parseInt(itemGet.querySelector('strong').firstChild.textContent) +
          parseInt(itemStaged.querySelector('strong').firstChild.textContent);

        isGet = true;
        break;
      }
    }

    if (!isGet) {
      this.getList.append(itemStaged);
    }
  }
```

```js
  // 장바구니 목록 초기화
  this.stagedList.innerHTML = null;

  // 획득한 음료 리스트를 순회하면서 총금액을 계산
  this.getList.querySelectorAll('li').forEach((itemGet) => {
    totalPrice +=
      parseInt(itemGet.dataset.price) *
      parseInt(itemGet.querySelector('strong').firstChild.textContent);
  });
  this.txtTotal.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)} 원`;
});
}
}
```

### 5. 장바구니 콜라 생성 함수
```js
stagedItemGenerator(target) {
  const stagedItem = document.createElement('li'); // 새로운 <li> 요소를 생성
  stagedItem.dataset.item = target.dataset.item; // 콜라 이름을 <li> 요소의 dataset.item 속성에 설정
  stagedItem.dataset.price = target.dataset.price; // 콜라 가격을 <li> 요소의 dataset.price 속성에 설정

  // 콜라 아이템을 <li> 요소 안에 HTML로 구성
  stagedItem.innerHTML = `
    <img src="./img/${target.dataset.img}" alt="">
        ${target.dataset.item}
    <strong>1
        <span class="a11y-hidden">개</span>
    </strong>
  `;

  this.stagedList.append(stagedItem); // 구성된 <li> 요소를 장바구니 목록(this.stagedList)에 추가
}
```

