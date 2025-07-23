
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
console.log(modal, modalTitle, modalContent)

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

function UserPage(event:Event) {
  event.preventDefault();
  const modal = document.getElementById("formModal");
  if (modal) {
    modal.classList.remove("hidden");

    //  modal.classList.add("flex"); // Make sure it's displayed
  } else {
    console.error("Modal not found");
  }
}
// (window as any).UserPage = UserPage;

function closeFormModal(event:Event) {
  event.preventDefault();
  const modal1 = document.getElementById("formModal");
  if (modal1) {
    modal1.classList.add("hidden");
    modal1.classList.remove("flex"); // ❌ remove flex so it's properly hidden
  }
}

let ListView= true;
function SwitchView(event:Event) {
  event.preventDefault();
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

function Submit(event: Event) {
  // event.preventDefault();
  
  const form = document.getElementById("spotForm") as HTMLFormElement;

  if (!form.checkValidity()) {
    form.reportValidity(); // Show built-in browser validation messages
    return;
  }

  const AuthorName = (document.getElementById("authorName") as HTMLInputElement).value;
  const Place = (document.getElementById("placeName") as HTMLInputElement).value;
  const City = (document.getElementById("city") as HTMLInputElement).value;
  const State = (document.getElementById("state") as HTMLInputElement).value;
  const SType = (document.getElementById("spotType") as HTMLInputElement).value;
  const Short = (document.getElementById("shortDesc") as HTMLInputElement).value;
  const Detail = (document.getElementById("detailedDesc") as HTMLInputElement).value;
  const ImageInput = document.getElementById("imageUrl") as HTMLInputElement;
  const file = ImageInput.files?.[0];

  if (!file) {
    // alert("Please upload an image!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Image = reader.result as string;

    const UserDetail = {
      AuthorName,
      Place,
      City,
      State,
      SType,
      Image: base64Image,
      Short,
      Detail,
    };

    const oldData = localStorage.getItem("userBlog");
    let dataArray = [];
    if (oldData) {
      dataArray = JSON.parse(oldData);
    }

    dataArray.unshift(UserDetail);
    localStorage.setItem("userBlog", JSON.stringify(dataArray));

    //  Reset form after saving
    (document.getElementById("spotForm") as HTMLFormElement).reset();

    //  Clear UI & Redisplay updated data
    const cardContainer = document.getElementById("cardContainer");
    if (cardContainer) cardContainer.innerHTML = "";

    display(); // refresh with latest data
    
  };
  const Modal2=document.getElementById("formModal")
  Modal2?.classList.add("hidden")
  reader.readAsDataURL(file);
}

function display() {
  const storeData = localStorage.getItem("userBlog");
  if (!storeData) return;

  const ResultData = JSON.parse(storeData);
  const cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) return;

  // Clear old content to avoid duplicate cards
  // cardContainer.innerHTML = "";

  ResultData.forEach((spot: any) => {
    const newDiv = document.createElement("div");
    newDiv.className =
      " bg-white  rounded-md shadow-blue-400  shadow-md  h-auto p-2 dark:bg-gray-800  dark:text-gray-200";
      
    newDiv.innerHTML = `
      <div class="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
        <img src="${spot.Image}" class="w-full h-48 object-cover" alt="${spot.Place}" />
      </div>
      <div class="p-3 h-48">
        <h5 class="text-xl font-bold dark:text-white text-blue-800 mb-2">📍 ${spot.Place}</h5>
        <p class="text-gray-700 dark:text-white text-lg mb-1">📍${spot.City}, ${spot.State}</p>
        <p class="text-gray-700 text-sm dark:text-white text-justify">> ${spot.Short}</p>
        <h4 class="text-sm font-mono dark:text-white text-blue-700 mt-1">By:- ✍️ ${spot.AuthorName}</h4>
      </div>
      `;
        const btnDiv=document.createElement("div");
         btnDiv.className = "m-auto";

         const btn = document.createElement("button");
         btn.textContent="Read More +";
          btn.className =
        "bg-purple-200 hover:bg-purple-400 text-gray-800 px-3 py-1 rounded-lg mt-2 transition-all font-semibold italic";

        btn.addEventListener("click", () => {
      showModal(`${spot.Place}, ${spot.City}`, spot.Detail);
    });
    
    cardContainer.appendChild(newDiv);  
    newDiv.appendChild(btnDiv);
    btnDiv.appendChild(btn);
    
    

  });
  
}

display();

function displayList(){
  const storeData = localStorage.getItem("userBlog")
  if(!storeData){return}
  const ResultData = JSON.parse(storeData)
  const listContainer = document.getElementById("listContainer")
  if (!listContainer) return;

  ResultData.forEach((spot: any) => {
    const newDiv = document.createElement("div");

    newDiv.className ="bg-white  shadow-blue-400  dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center "
  newDiv.innerHTML =`
      <div class="bg-white w-auto  rounded-lg shadow-md overflow-hidden max-w-sm">
      <img src="${spot.Image}"
      class=" h-48 w-72 object-cover" alt="${spot.Place}">
    </div>
    
    <div class="ml-10 w-2/4">
      <h3 class="text-xl  font-bold  text-green-700">📍${spot.Place}, ${spot.City}</h3>
      <p class="text-gray-600 dark:text-white ">
        ${spot.Short}
      </p>
      </div>`;
    
      const btnDiv = document.createElement("div");
    btnDiv.className = "ml-10 w-32";

    const btn = document.createElement("button");
    btn.textContent = "Read More +";
    btn.className =
      "mt-3 md:mt-0 bg-green-200 hover:bg-green-400 text-gray-800 px-4 py-2 rounded-lg transition-all font-semibold italic";

    btn.addEventListener("click", () => {
      showModal(`${spot.Place}, ${spot.City}`, spot.Detail);
    });

    listContainer.appendChild(newDiv);
    newDiv.appendChild(btnDiv);
    btnDiv.appendChild(btn);
     
    
    
})
}
displayList();

function Search() {
  const searchInput = (document.getElementById("search") as HTMLInputElement).value.trim();
  const storedData = localStorage.getItem("userBlog");

  if (!storedData) return;

  const allData = JSON.parse(storedData);
  const searchTerm = searchInput.toLowerCase();
  const filteredData = allData.filter((spot: any) => {
    return (
      spot.Place.toLowerCase().includes(searchTerm) ||
      spot.City.toLowerCase().includes(searchTerm) ||
      spot.SType.toLowerCase().includes(searchTerm)
    );
  });

  const cardContainer = document.getElementById("cardContainer");
  const listContainer = document.getElementById("listContainer");
  if (cardContainer) cardContainer.innerHTML = "";
  if (listContainer) listContainer.innerHTML = "";

  filteredData.forEach((spot: any) => {
    // ======== Card View =========
    const newDiv = document.createElement("div");
    newDiv.className =
      "bg-white rounded-md shadow-blue-400 shadow-md h-auto p-2 dark:bg-gray-800 dark:text-gray-200";

    const cardContent = `
      <div class="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
        <img src="${spot.Image}" class="w-full h-48 object-cover" alt="${spot.Place}" />
      </div>
      <div class="p-3 h-48">
        <h5 class="text-xl font-bold dark:text-white text-blue-800 mb-2">📍 ${spot.Place}</h5>
        <p class="text-gray-700 dark:text-white text-lg mb-1">📍${spot.City}, ${spot.State}</p>
        <p class="text-gray-700 text-sm dark:text-white text-justify">> ${spot.Short}</p>
        <h4 class="text-sm font-mono dark:text-white text-blue-700 mt-1">By:- ✍️ ${spot.AuthorName}</h4>
      </div>
    `;

    const cardBtnDiv = document.createElement("div");
    cardBtnDiv.className = "m-auto";

    const cardBtn = document.createElement("button");
    cardBtn.textContent = "Read More +";
    cardBtn.className =
      "bg-purple-200 hover:bg-purple-400 text-gray-800 px-3 py-1 rounded-lg mt-2 transition-all font-semibold italic";
    cardBtn.addEventListener("click", () => {
      showModal(`${spot.Place}, ${spot.City}`, spot.Detail);
    });

    cardBtnDiv.appendChild(cardBtn);
    newDiv.innerHTML = cardContent;
    newDiv.appendChild(cardBtnDiv);
    cardContainer?.appendChild(newDiv);

    // ======== List View =========
    const newDiv1 = document.createElement("div");
    newDiv1.className =
      "bg-white shadow-blue-400 dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center";

    const imgDiv = document.createElement("div");
    imgDiv.className = "bg-white w-auto rounded-lg shadow-md overflow-hidden max-w-sm";
    imgDiv.innerHTML = `
      <img src="${spot.Image}" class="h-48 w-72 object-cover" alt="${spot.Place}">
    `;

    const contentDiv = document.createElement("div");
    contentDiv.className = "ml-10 w-2/4";
    contentDiv.innerHTML = `
      <h3 class="text-xl font-bold text-green-700">📍${spot.Place}, ${spot.City}</h3>
      <p class="text-gray-600 dark:text-white">${spot.Short}</p>
    `;

    const listBtnDiv = document.createElement("div");
    listBtnDiv.className = "ml-10 w-32";

    const listBtn = document.createElement("button");
    listBtn.textContent = "Read More +";
    listBtn.className =
      "mt-3 md:mt-0 bg-green-200 hover:bg-green-400 text-gray-800 px-4 py-2 rounded-lg transition-all font-semibold italic";
    listBtn.addEventListener("click", () => {
      showModal(`${spot.Place}, ${spot.City}`, spot.Detail);
    });

    listBtnDiv.appendChild(listBtn);
    newDiv1.appendChild(imgDiv);
    newDiv1.appendChild(contentDiv);
    newDiv1.appendChild(listBtnDiv);

    listContainer?.appendChild(newDiv1);
  });
}

 


// Make functions accessible in HTML inline onclick
(window as any).showModal = showModal;
(window as any).closeModal = closeModal;
(window as any).DarkMode = DarkMode;
(window as any).UserPage = UserPage;
(window as any).SwitchView = SwitchView;
(window as any).Submit = Submit;
(window as any).display = display;
(window as any).displayList = displayList;
(window as any).closeFormModal = closeFormModal;
(window as any).Search = Search;
