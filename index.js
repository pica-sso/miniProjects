async function setRenderBackground() {
  //body의 background에 주소를 넣어도 괜찮음
  // 비동기로 가져올 예정
  //axios 요청으로 이미지 받아오기
  //blob -> 이미지, 사운드, 비디오 등 멀티미디어 데이터를 다룰 때 사용
  const result = await axios.get("https://picsum.photos/1280/720", {
    responseType : "blob"
  });
  console.log(result.data);
  //URL.createObjectURL -> 임시 url 만든다 (페이지 내에서만 유효)
  //받아온 데이터를 임시 URL 만들어서 그 URL body에 넣는다
  const imageURL = URL.createObjectURL(result.data);
  document.querySelector('body').style.backgroundImage = `url(${imageURL})`;
}
// const setRenderBackground = async () => {

function setTime() {
  const timer = document.querySelector('.timer');

  setInterval(() => {
    //date 함수
    const date = new Date();
    console.log(date);
    console.log(date.getHours());
    timer.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }, 1000)
}

function getMemo() {
  //localStorage로부터 가져와서 momo에 넣어주는 작엄
  const memo = document.querySelector('.memo');
  memo.textContent = localStorage.getItem('todo');
}

function setMemo() {
  const memoInput = document.querySelector('.memo-input');
  memoInput.addEventListener('keyup', function(e) {
    //e.code 입력시 -> 작성한 키보드 조회
    //console.log(e.code);
    //console.log(e.target);
    console.log(e.target.value);
    // ! null undefined false "" -> 부정의 의미
    // if(e.target.value) -> 위 부정의 의미가 아닌 경우를 통합
    // if(!e.target.value) -> 부정의 의미인 경우
    if (e.code === 'Enter' && e.target.value) {
      //메모를 저장
      

      //메모가 날아가지 않도록 저장
      // 원래는 백앤드 -> db에 저장해서 가져오는 작업
      // 브라우저에도 간단한 저장소 개념이 있다. localStrorage
      //localStorage 사용법
      //localStorage.setItem('키','넣을 값')
      localStorage.setItem('todo', e.target.value);
      //localStorage.getItem('키') -> 값을 가져온다
      //getMemo로 분리
      getMemo();
      e.target.value = "";
    }
  })
}

function deleteMemo() {
  //이벤트 위임
  //document.querySelector('body')
  //똑같은 함수를 수백만개 addEventListner 가정 -> 속도 저하
  document.addEventListener('click', function (e) {
    console.log(e.target);
    //e.target.classlist가 hello인 경우에 ~이벤트 실행

    //localStorage를 지워야하고
    if (e.target.classList.contains('memo')) {
      localStorage.removeItem('todo');
      e.target.textContent = "";
    }
    //HTML 파트도 지워야한다
  })
}

async function allRender() {
  
  setRenderBackground();
  setTime();
  setMemo();
  getMemo();
  deleteMemo();
  //5초마다 해당 콜백함수 반복
  setInterval(() => {
    setRenderBackground();
  }, 5000)
}
allRender();
