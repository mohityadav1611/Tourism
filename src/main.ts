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

function UserPage(){
    alert("its working")
    location.href='blog.html'
}

// Make functions accessible in HTML inline onclick
(window as any).showModal = showModal;
(window as any).closeModal = closeModal;
(window as any).DarkMode = DarkMode;
(window as any).UserPage = UserPage;
