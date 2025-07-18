import { alertTitleClasses } from '../../../../../node_modules/@mui/material/index';
import './style.css'

console.log('Tailwind + TypeScript working!');

function DarkMode() {
  const html = document.documentElement;
  html.classList.toggle("dark");

  // Save mode in localStorage (so it's remembered on reload)
  const isDark = html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

  // Load saved theme on page load
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  });

function showModal(title: string, content: string) {
  const modal = document.getElementById("dynamicModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  if (modal && modalTitle && modalContent) {
    modal.classList.remove("hidden");
    modal.classList.add("flex")
    modalTitle.textContent = title;
    modalContent.textContent = content;
  }
}

function closeModal() {
  const modal = document.getElementById("dynamicModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function UserPage() {
  const modal = document.getElementById("formModal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}
let ListView= true;
function SwitchView() {

  const cardText = document.getElementById("cardText");
  const cardSection = document.getElementById("cardSection");
  const listSection = document.getElementById("listSection");
  const toggleBtn = document.getElementById("toggleBtn"); // Optional: for changing text
  if(!toggleBtn){return}
  
  if (ListView) {
    cardSection?.classList.add("hidden");
    cardText?.classList.add("hidden");
    listSection?.classList.remove("hidden");
    
    toggleBtn.innerText = "🧩 Show Card View";
  } else {
    cardSection?.classList.remove("hidden");
    cardText?.classList.remove("hidden");
    listSection?.classList.add("hidden");
    toggleBtn.innerText = "📃 Show List View";
  }

  ListView = !ListView; // Toggle view
}


function closeFormModal() {
  const modal2 = document.getElementById("formModal");
  if (modal2) {
    modal2.classList.add("hidden");
  }
}


function Submit(event:Event){
  event.preventDefault();
  const AuthorName=(document.getElementById("authorName") as HTMLInputElement).value
  const Place=(document.getElementById("placeName") as HTMLInputElement).value
  const City=(document.getElementById("city") as HTMLInputElement).value
  const State=(document.getElementById("state") as HTMLInputElement).value
  const SType=(document.getElementById("spotType") as HTMLInputElement).value
  const Image=(document.getElementById("imageUrl") as HTMLInputElement).value
  const Short=(document.getElementById("shortDesc") as HTMLInputElement).value
  const Detail=(document.getElementById("detailedDesc") as HTMLInputElement).value;
  (document.getElementById("spotForm") as HTMLFormElement).reset();

  const UserDetail = {
   AuthorName,
   Place,
   City,
   State,
   SType,
   Image,
   Short,
   Detail
  }
 
  const oldData= localStorage.getItem("userBlog");
  let dataArray = [];
  if(oldData){
    dataArray =  JSON.parse(oldData);
  }
  dataArray.push(UserDetail);
  localStorage. setItem("userBlog",JSON.stringify(dataArray))
  display()
}

function display(){
  const Data= localStorage.getItem("userBlog");
  if(!Data){return}
  const Convert= JSON.parse(Data);
  console.log(Convert.AuthorName)
}
window.addEventListener("DOMContentLoaded", display);




 
      

// Make functions accessible in HTML inline onclick
(window as any).showModal = showModal;
(window as any).closeModal = closeModal;
(window as any).DarkMode = DarkMode;
(window as any).UserPage = UserPage;
(window as any).SwitchView = SwitchView;
(window as any).Submit = Submit;
(window as any).closeFormModal = closeFormModal;
