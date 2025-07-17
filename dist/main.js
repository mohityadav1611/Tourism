import './style.css';
console.log('Tailwind + TypeScript working!');
function ReadMore() {
    alert("its working")
    const read = document.getElementById("pop1");
    const para = document.createElement("p");
    para.innerHTML = ("lol");
    read === null || read === void 0 ? void 0 : read.appendChild(para);
}
// const read = document.querySelector(".read")
// if(read){
//     read.addEventListener("click",ReadMore)
// }
