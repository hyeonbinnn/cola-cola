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
        // 서버의 응답 코드가 200 ~ 299 일 경우
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
