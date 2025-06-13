// Section 2 — Video Play/Pause Button
const videoEl = document.querySelector('.reel-video');
const btn = document.querySelector('.play-pause-btn');
btn.addEventListener('click', () => {
  if(videoEl.paused){
    videoEl.play(); btn.textContent = 'Pause';
  } else {
    videoEl.pause(); btn.textContent = 'Play';
  }
});

// Envelope Creation and Interaction
const container = document.querySelector('.envelope-container');
const count = 4; // You can increase to 16 or as desired
const envelopeData = [
  {
    sender: "Mamoni & Nipa Didi 🌞",
    message: "শুভ জন্মদিন আমার মিষ্টি  বন্ধু। 💖",
    video: "Wish_Mamoni.mp4"
  },
  {
    sender: "আমি দিদি 💌",
    message: "শুভ জন্মদিন শতরূপা।জন্মদিন হোক জীবনের সবচেয়ে সুন্দর দিনগুলোর একটা।এই দিনটা কাটুক এমন আনন্দে, যেন মনে হয় এমন দিনের জন্যই জীবনটা সুন্দর। অনেক অনেক ভালোবাসা রইলো তোমার জন্য । 🌱 ",
    video: "Wish_amididi.mp4"
  },
  {
    sender: "মার্জিয়া ও তার ভাগ্নী 😘",
    message: "Dear Sotorupa,<br>শুভ জন্মদিন দেবুর বউ,,🥰🥰,ভালো থাক,,,,সুস্থ থাক সবসময় 👑",
    video: "Wish_Marzia.mp4"
  },
  {
    sender: "Irfan Vai 👦",
    message: "Dear Sister,<br>Sending you birthday smiles.Today is all about you. 🥳🥳Shine on! Birthday Star!",
    video: "Wish_Irfan_Vai.mp4"
  },
  { sender: "জিতু ও দিদি",
    message: "Dear Sister,<br> Happy birthday Sotorupa.May the happiness around you today and always..",
    video: "Wish_jitu.mp4"
  }
];

for (let i = 0; i < envelopeData.length; i++) {
  const env = document.createElement('div');
  env.className = 'envelope';
  env.innerHTML = `
    <div class="flap"></div>
    <div class="letter">
      <span class="close-letter">×</span>
   
      <p>${envelopeData[i].message}</p>
      <p><strong>— ${envelopeData[i].sender}</strong></p>
      <video controls>
        <source src="${envelopeData[i].video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>`;

  
  // Toggle envelope open/close and close others
  env.addEventListener('click', () => {
    document.querySelectorAll('.envelope').forEach(e => {
      if (e !== env) e.classList.remove('open');
    });
    env.classList.toggle('open');
  });

  // Close button functionality
  const closeBtn = env.querySelector('.close-letter');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    env.classList.remove('open');
  });

  // Open video in modal
  const video = env.querySelector('video');
  video.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(video.querySelector('source').src);
  });

  container.append(env);
}

// Carousel Controls
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
prevBtn.addEventListener('click', () => {
  container.scrollBy({ left: -260, behavior: 'smooth' });
});
nextBtn.addEventListener('click', () => {
  container.scrollBy({ left: 260, behavior: 'smooth' });
});

// Auto-scroll functionality (optional)
let autoScrollInterval;
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 260, behavior: 'smooth' });
    }
  }, 3000);
}
startAutoScroll();

// Pause auto-scroll on hover
container.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
container.addEventListener('mouseleave', startAutoScroll);



// Accessibility: Keyboard navigation for carousel
container.setAttribute('tabindex', '0');
container.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    container.scrollBy({ left: -260, behavior: 'smooth' });
  } else if (e.key === 'ArrowRight') {
    container.scrollBy({ left: 260, behavior: 'smooth' });
  }
});




// Section 4 — Diary Page-Flip
const pages = Array.from(document.querySelectorAll('#diary .page'));
let current = 0;

function renderDiary() {
  pages.forEach((p, i) => {
    p.style.transform = i < current ? 'rotateY(-180deg)' : 'rotateY(0deg)';
    p.style.zIndex = pages.length - i;
  });
}

document.getElementById('flip-next').addEventListener('click', () => {
  if (current < pages.length - 1) current++;
  renderDiary();
});

document.getElementById('flip-prev').addEventListener('click', () => {
  if (current > 0) current--;
  renderDiary();
});

renderDiary();


// ✅ Calendar Loader — now DOM-safe and delayed
// Dynamically build June 2025 calendar and mark 14th
const calPage = document.querySelector('.page-calendar');
const tbl = document.createElement('table');
const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let row = '<tr>'+days.map(d=>`<td><b>${d}</b></td>`).join('')+'</tr>';
let date = new Date(2025,5,1);
while(date.getMonth() === 5){
  if(date.getDay()===0) row += '<tr>';
  row += `<td class="${date.getDate()===14?'marked':''}">${date.getDate()}</td>`;
  if(date.getDay()===6) row += '</tr>';
  date.setDate(date.getDate()+1);
}
tbl.innerHTML = row;
calPage.appendChild(tbl);




// LOVE BUBBLE ANIMATION
window.addEventListener('DOMContentLoaded', () => {
  const loveContainer = document.getElementById('love-bubbles-container');

  function createLoveBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('love-bubble');

    // Random horizontal position (within the container)
    bubble.style.left = Math.random() * 120 + 'px';

    // Random size between 10px and 30px
    const size = Math.random() * 20 + 10;
    bubble.style.width = bubble.style.height = size + 'px';

    // Optional: Add pinkish variations
    const pinkShades = ['#ff80bf', '#ff99cc', '#ff66b2', '#ff4da6'];
    bubble.style.background = pinkShades[Math.floor(Math.random() * pinkShades.length)];

    loveContainer.appendChild(bubble);

    // Remove the bubble after it finishes animation
    setTimeout(() => {
      bubble.remove();
    }, 5000); // match CSS animation duration
  }

  // Start creating love bubbles every 400ms
  setInterval(createLoveBubble, 400);
});

document.addEventListener('click', () => {
  const audio = document.getElementById("bg-music");
  audio.volume = 0.2;  // ✅ Set volume *before* playing
  audio.play();
}, { once: true });


