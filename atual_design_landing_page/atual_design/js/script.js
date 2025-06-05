/**
 * Atual Design - Landing Page Scripts
 * Desenvolvido para criar uma experiência moderna e interativa
 */

// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Inicializar navegação
    initNavigation();

    // Inicializar botão voltar ao topo
    initBackToTop();

    // Inicializar filtros de ambientes
    initFilters();

    // Inicializar Swiper slider
    initSwiper();

    // Inicializar contadores
    initCounters();

    // Inicializar modais
    initModals();

    // Inicializar formulários
    initForms();

    // Adicionar imagens de fundo para ambientes
    setupBackgroundImages();
});

// Configurar imagens de fundo
function setupBackgroundImages() {
    // Usar a imagem enviada como referência para os ambientes
    document.querySelector('.hero').style.backgroundImage = "url('images/hero-bg.jpg')";
    
    // Adicionar classes específicas para cada ambiente
    const ambienteCards = document.querySelectorAll('.ambiente-card');
    
    if (ambienteCards.length > 0) {
        ambienteCards[0].querySelector('.ambiente-img').style.backgroundImage = "url('images/cozinha.jpg')";
        ambienteCards[1].querySelector('.ambiente-img').style.backgroundImage = "url('images/sala.jpg')";
        ambienteCards[2].querySelector('.ambiente-img').style.backgroundImage = "url('images/quarto.jpg')";
        ambienteCards[3].querySelector('.ambiente-img').style.backgroundImage = "url('images/infantil.jpg')";
    }
    
    // Configurar imagens para modais
    document.querySelector('.modal-cozinha').style.backgroundImage = "url('images/cozinha.jpg')";
    document.querySelector('.modal-sala').style.backgroundImage = "url('images/sala.jpg')";
    document.querySelector('.modal-quarto').style.backgroundImage = "url('images/quarto.jpg')";
    document.querySelector('.modal-infantil').style.backgroundImage = "url('images/infantil.jpg')";
    
    // Configurar imagens para projetos
    document.querySelector('.projeto-cozinha').style.backgroundImage = "url('images/cozinha.jpg')";
    document.querySelector('.projeto-sala').style.backgroundImage = "url('images/sala.jpg')";
    document.querySelector('.projeto-quarto').style.backgroundImage = "url('images/quarto.jpg')";
    document.querySelector('.projeto-infantil').style.backgroundImage = "url('images/infantil.jpg')";
}

// Inicializar navegação
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Alternar menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Mudar estilo do header ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Destacar link ativo baseado na seção visível
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Inicializar botão voltar ao topo
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Inicializar filtros de ambientes
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const ambienteCards = document.querySelectorAll('.ambiente-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe ativa de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe ativa ao botão clicado
                this.classList.add('active');
                
                // Obter categoria do filtro
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrar os cards
                ambienteCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Inicializar Swiper slider
function initSwiper() {
    const projetosSlider = document.querySelector('.projetos-slider');
    
    if (projetosSlider) {
        new Swiper('.projetos-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
    }
}

// Inicializar contadores
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Inicializar modais
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    if (modalTriggers.length > 0) {
        // Abrir modal
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Fechar modal com botão
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fechar modal clicando fora
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Fechar modal com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = '';
            }
        });
    }
}

// Inicializar formulários
function initForms() {
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulação de envio
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                // Simular tempo de envio
                setTimeout(() => {
                    // Mostrar mensagem de sucesso
                    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                    
                    // Resetar formulário
                    form.reset();
                    
                    // Restaurar botão
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 1500);
            });
        });
    }
}

// Função para animar elementos quando entrarem na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}
