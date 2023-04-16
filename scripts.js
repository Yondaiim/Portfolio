// header
const header = document.getElementById('header');


function checkScroll() {
  if (window.scrollY > 50) {
    header.classList.add('disparait');
  } else {
    header.classList.remove('disparait');
  }
}


window.addEventListener('scroll', checkScroll);

// Fin header

// Compétence

document.getElementById("html-bar").style.width = "50%";
document.getElementById("css-bar").style.width = "60%";
document.getElementById("javascript-bar").style.width = "20%"
document.getElementById("ang-bar").style.width = "50%";
document.getElementById("esp-bar").style.width = "60%";
document.getElementById("por-bar").style.width = "20%"

function animateSkillBars(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBar = entry.target;
      const percentage = skillBar.dataset.percentage;
      skillBar.style.width = percentage;
      observer.unobserve(skillBar);
    }
  });
}

const observer = new IntersectionObserver(animateSkillBars, { threshold: 0.5 });

document.querySelectorAll(".skill-bar").forEach(skillBar => {
  observer.observe(skillBar);
});

// Fin Compétence