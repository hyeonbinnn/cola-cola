import ColaGenerator from './classes/colaGenerator.js';
import VendingMachineEvents from './classes/vendingMachineEvents.js';

const colaGenerator = new ColaGenerator();
const vendingMachineEvents = new VendingMachineEvents();

// 스플래시 화면 나타내기
const showSplash = () => {
  const splashScreen = document.querySelector('.splash-screen');
  splashScreen.style.display = 'block';
};

// 스플래시 화면 숨기기
const hideSplash = () => {
  const splashScreen = document.querySelector('.splash-screen');
  splashScreen.style.display = 'none';
};

// 탑레벨 await : 최상위 모듈에서 실행되는 await
const startApp = async () => {
  // 스플래시 화면 나타내기
  showSplash();

  // 스플래시 화면 숨기기
  setTimeout(async () => {
    hideSplash();

    // ColaGenerator 초기화
    await colaGenerator.setup();

    // VendingMachineEvents 이벤트 바인딩 및 앱 초기화
    vendingMachineEvents.bindEvent();
  }, 3000);
};

// 앱 초기화
startApp();
