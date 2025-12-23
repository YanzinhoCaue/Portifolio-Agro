// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- INTERSECTION OBSERVER (ANIMAÇÕES) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => observer.observe(el));

// Observador "Cascata" para cards
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.15}s`; 
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-stagger').forEach(el => staggerObserver.observe(el));

// --- COPIAR EMAIL ---
const copyBtn = document.getElementById('copy-btn');
const emailText = document.getElementById('email-text');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText.innerText);
        const icon = copyBtn.querySelector('i');
        icon.className = 'fas fa-check';
        icon.style.color = '#4ade80';
        setTimeout(() => {
            icon.className = 'far fa-copy';
            icon.style.color = '';
        }, 2000);
    });
}

// --- LANG SWITCHER ---
const langBtn = document.getElementById('lang-switcher-btn');
const langDropdown = document.getElementById('lang-dropdown');
const currentFlag = document.getElementById('current-flag');

if(langBtn) {
    langBtn.addEventListener('click', () => langDropdown.classList.toggle('show'));
}

document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
        e.preventDefault();
        changeLang(opt.getAttribute('data-lang'));
        langDropdown.classList.remove('show');
    });
});

// --- CARROSSEL INFINITO ---
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function updateCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    const cardsPerView = getCardsPerView();
    const cardWidth = cards[0] ? cards[0].offsetWidth : 0;
    const gap = 20; 
    const moveAmount = (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${moveAmount}px)`;
}

if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
        const totalCards = document.querySelectorAll('.carousel-card').length;
        const cardsPerView = getCardsPerView();
        const maxIndex = totalCards - cardsPerView;
        if (currentIndex < maxIndex) currentIndex++;
        else currentIndex = 0; // Loop Infinito
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const totalCards = document.querySelectorAll('.carousel-card').length;
        const cardsPerView = getCardsPerView();
        const maxIndex = totalCards - cardsPerView;
        if (currentIndex > 0) currentIndex--;
        else currentIndex = maxIndex; // Loop Infinito
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// --- DICIONÁRIO DE TRADUÇÃO ---
const texts = {
    en: {
        flag: "https://flagcdn.com/w40/us.png",
        nav: { profile: "PROFILE", manual: "MANUAL SKILLS", gallery: "GALLERY", tech: "TECH SUPPORT", experience: "EXPERIENCE", contact: "HIRE ME" },
        hero: {
            badge: "AVAILABLE FOR SEASONAL WORK",
            title: "HARDWORKING & VERSATILE LABORER",
            subtitle: "AGRICULTURE • HOSPITALITY • MAINTENANCE",
            summary: "Solid practical experience in diverse fields. From Hotel Reception and Guest Services to Farm Maintenance. Reliable, organized, and ready to work.",
            btn: { contact: "CONTACT FOR HIRE", cv: "DOWNLOAD RESUME" },
            stats: { exp: "Proven Experience", stamina: "Dedicated Worker", passport: "Valid Passport" }
        },
        manual: { 
            title: "PRACTICAL SKILLS", subtitle: "Experience in Hospitality, Farming & General Labor",
            agro: { title: "Agriculture & Farming", l1: "Coffee planting & harvesting", l2: "Land preparation & cleaning", l3: "Vegetable farming", l4: "Irrigation systems setup" },
            livestock: { title: "Livestock Care", l1: "Cattle feeding & care", l2: "Pig & Poultry management", l3: "Barn cleaning & maintenance", l4: "Fence repair & building" },
            hospitality: { title: "Hospitality & Resort", l1: "Hotel Reception & Front Desk", l2: "Guest Services & Check-in", l3: "Resort Operations Support", l4: "Professional Customer Service" },
            construction: { title: "Maintenance & Repairs", l1: "General Hotel Maintenance", l2: "Painting & Finishing", l3: "Basic Carpentry & Repairs", l4: "Tool Operation & Safety" }
        },
        gallery: {
            title: "WORK GALLERY", subtitle: "Proof of work and dedication",
            img1: "Field Work", img2: "Construction", img3: "Solar Maintenance", img4: "Livestock Care"
        },
        tech: { 
            title: "THE \"SMART WORKER\" BONUS", subtitle: "I can handle front-desk systems AND farm technology.",
            solar: { title: "Solar Panel Setup", desc: "Experience installing and maintaining solar energy systems." },
            security: { title: "Security Systems", desc: "Setup of security cameras and monitoring systems for property safety." },
            net: { title: "Connectivity & VoIP", desc: "Networking knowledge to keep hotel/farm communications running." },
            erp: { title: "Management Systems", desc: "Experience with ERPs, Booking Systems & Project Management." }
        },
        exp: { 
            title: "WORK HISTORY",
            job1: { 
                role: "General Laborer & Hospitality Support", loc: "Minas Gerais, Brazil", company: "Various Employers",
                l1: "Hospitality: Front desk support, guest reception, and general hotel maintenance.",
                l2: "Agriculture: Diverse tasks including planting, harvesting, and irrigation.",
                l3: "Livestock: Daily care and feeding for cattle and pigs.",
                l4: "Construction: Assisted in renovation projects, painting, and repairs.",
                l5: "Reliability: Consistent performance in both customer-facing and manual roles."
            }
        },
        contact: { title: "READY TO WORK", text: "I am ready for seasonal opportunities (H-2A/H-2B) in Resorts, Hotels, or Farms.", location: "Eloi Mendes, MG - Brazil" }
    },
    pt: {
        flag: "https://flagcdn.com/w40/br.png",
        nav: { profile: "PERFIL", manual: "HABILIDADES", gallery: "GALERIA", tech: "SUPORTE TÉC", experience: "EXPERIÊNCIA", contact: "CONTRATAR" },
        hero: {
            badge: "DISPONÍVEL PARA TRABALHO SAZONAL",
            title: "TRABALHADOR VERSÁTIL & DEDICADO",
            subtitle: "HOTELARIA • AGRICULTURA • MANUTENÇÃO",
            summary: "Sólida experiência prática. Da Recepção de Hotel e Atendimento ao Hóspede até a Manutenção Rural. Confiável, organizado e pronto para o trabalho.",
            btn: { contact: "ENTRAR EM CONTATO", cv: "BAIXAR CURRÍCULO" },
            stats: { exp: "Exp. Comprovada", stamina: "Trabalhador Dedicado", passport: "Passaporte Válido" }
        },
        manual: { 
            title: "HABILIDADES PRÁTICAS", subtitle: "Experiência em Hotelaria, Fazenda e Obras",
            agro: { title: "Agricultura & Lavoura", l1: "Plantio e colheita de café", l2: "Preparo e limpeza de terreno", l3: "Cultivo de hortaliças", l4: "Instalação de irrigação" },
            livestock: { title: "Cuidado Animal", l1: "Trato de gado (corte/leite)", l2: "Manejo de suínos e aves", l3: "Limpeza de currais", l4: "Construção e reparo de cercas" },
            hospitality: { title: "Hotelaria & Resort", l1: "Recepção de Hotel", l2: "Atendimento ao Hóspede", l3: "Apoio Operacional em Resorts", l4: "Atendimento Profissional ao Cliente" },
            construction: { title: "Manutenção & Reparos", l1: "Manutenção Geral de Hotel", l2: "Pintura e Acabamento", l3: "Carpintaria Básica e Reparos", l4: "Operação Segura de Ferramentas" }
        },
        gallery: {
            title: "GALERIA DE TRABALHO", subtitle: "Prova de trabalho e dedicação",
            img1: "Trabalho no Campo", img2: "Construção", img3: "Manutenção Solar", img4: "Cuidado Animal"
        },
        tech: { 
            title: "O DIFERENCIAL TÉCNICO", subtitle: "Lido bem com sistemas de recepção E tecnologia rural.",
            solar: { title: "Energia Solar", desc: "Experiência na instalação e manutenção de painéis solares." },
            security: { title: "Sistemas de Segurança", desc: "Configuração de câmeras e monitoramento para segurança da propriedade." },
            net: { title: "Conectividade & VoIP", desc: "Conhecimento em Redes para manter a comunicação do hotel/fazenda." },
            erp: { title: "Sistemas de Gestão", desc: "Experiência com ERPs, Sistemas de Reserva e Gestão de Projetos." }
        },
        exp: { 
            title: "HISTÓRICO PROFISSIONAL",
            job1: { 
                role: "Trabalhador Geral & Apoio Hoteleiro", loc: "Minas Gerais, Brasil", company: "Vários Empregadores",
                l1: "Hotelaria: Apoio na recepção, atendimento ao hóspede e manutenção geral.",
                l2: "Agricultura: Tarefas diversas incluindo plantio, colheita e irrigação.",
                l3: "Pecuária: Cuidado diário e alimentação de gado e suínos.",
                l4: "Construção: Auxílio em projetos de reforma, pintura e reparos.",
                l5: "Confiabilidade: Desempenho consistente tanto em funções manuais quanto de atendimento."
            }
        },
        contact: { title: "PRONTO PARA O TRABALHO", text: "Estou pronto para oportunidades sazonais (H-2A/H-2B) em Resorts, Hotéis ou Fazendas.", location: "Elói Mendes, MG - Brazil" }
    }
};

function changeLang(lang) {
    const data = texts[lang];
    if(currentFlag) currentFlag.src = data.flag;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const keys = key.split('.');
        let val = data;
        for (const k of keys) val = val ? val[k] : null;
        if(val) el.innerText = val;
    });
}