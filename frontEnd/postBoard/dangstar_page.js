
const root = tagCreate("div", { id: "root" });
styleCreate(root, dangstarStyle.dangstarRoot);
document.body.appendChild(root);

// 탑 메뉴
const topMenuWrap = tagCreate("div", {});
root.appendChild(topMenuWrap);
topMenu(topMenuWrap);
createHamburger(root);


// 게시글 영역

// for (let i = 0; i < 3; i++) {
//   // i < 3에서 3 부분은 나중에 무한 스크롤 방식을 이용해 적용
//   console.log(i);
//   postCreate(root, "../resource/MainDogImg.jpg", "멍뭉이", "text", "../resource/MainDogImg.jpg", "name", i); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
// }

// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
root.appendChild(btmMeunWrap);
btmMeun(btmMeunWrap);

// 게시글 작성 버튼
const writeBtn = tagCreate("button", {});
styleCreate(writeBtn, dangstarStyle.dangstarAddWriteBtn);
root.appendChild(writeBtn);

writeBtn.addEventListener("click",() =>{
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  let writeForm = document.createElement('form');
  writeForm.method = "POST"
  writeForm.action = "/dangStarWrite";
  let params = {jwt:token, targetId:"mine"}
  for(let key in params){
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type","hidden");
    hiddenField.setAttribute("name",key);
    hiddenField.setAttribute("value",params[key]);
    writeForm.appendChild(hiddenField);
}
document.body.appendChild(writeForm);
writeForm.submit();
}); 

const writeImg = tagCreate("img", {src: '/image/resource/write.png'})
writeBtn.appendChild(writeImg);
styleCreate(writeImg, dangstarStyle.dangstarAddWriteImg);
loadDangstargram(0);
// 
// let test = document.cookie;
// console.log(test);
//
function loadDangstargram(nth) {
  const xhr = new XMLHttpRequest();
  // let result = {};
  xhr.open("GET", `http://localhost:2080/loadPostBoard?nth=${nth}`);
  xhr.send();
  xhr.addEventListener("load", function () {
    let res = JSON.parse(xhr.response);
    for (let i = 0; i < res.length; i++) {
      console.log(res[i])
      // postCreate(부모요소, src_link(이미지 링크), writerNickname(작성자 이름), text(게시글 내용), src_comment_link(댓글 작성자 프로필 이미지), textName(댓글 작성자 이름), cmText(댓글 내용), index(인덱싱), postIndex(DB인덱싱))
      // postCreate(root, "../resource/MainDogImg.jpg", res[i].post_id, res[i].post_detail, "../resource/MainDogImg.jpg", res[i].cm_id, res[i].cm_detail, i, res[i].post_index);
      postCreate(root, "../resource/MainDogImg.jpg", res[i].post_id, res[i].post_detail, i, res[i].post_index);
    }
  });
}

