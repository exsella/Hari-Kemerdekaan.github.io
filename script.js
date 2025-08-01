document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const loginModal = document.getElementById('loginModal');
    const openBerandaBtn = document.getElementById('openBeranda');
    const closeBtn = document.querySelector('.close-btn');



    function showAlert(message) {
        alert(message);
    }


    openBerandaBtn.addEventListener('click', function(e) {
        e.preventDefault();

        document.getElementById('beranda').scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            loginModal.style.display = 'flex';
        }, 800);
    });

    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (email && password) {
                showAlert('Login Berhasil! Selamat datang.');
                loginModal.style.display = 'none';
                loginForm.reset();
            } else {
                showAlert('Email dan password tidak boleh kosong.');
            }
        });
    }


    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#beranda') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    window.addEventListener('scroll', function() {
        const scrollThreshold = 300;
        const scrolledDown = document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold;

        if (scrolledDown) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (animatedElements.length > 0) {
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }


    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const nisnInput = document.getElementById('nisn');
            const lombaSelect = document.getElementById('lomba');
            const usiaInput = document.getElementById('usia');

            const fullName = fullNameInput.value.trim();
            const email = emailInput.value.trim();
            const nisn = nisnInput.value.trim();
            const lomba = lombaSelect.value;
            const usia = usiaInput.value;

            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!nameRegex.test(fullName)) {
                showAlert('Nama Lengkap harus berisi hanya huruf dan spasi.');
                fullNameInput.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Format Email tidak valid. Contoh: nama@domain.com');
                emailInput.focus();
                return;
            }

            const nisnRegex = /^[0-9]+$/;
            if (!nisnRegex.test(nisn)) {
                showAlert('NISN / Nomor ID harus berisi hanya angka.');
                nisnInput.focus();
                return;
            }

            if (lomba === "") {
                showAlert('Harap pilih jenis lomba.');
                lombaSelect.focus();
                return;
            }

            const usiaNumber = parseInt(usia);
            if (isNaN(usiaNumber) || usiaNumber < 5 || usiaNumber > 99) {
                showAlert('Harap masukkan usia yang valid antara 5 hingga 99 tahun.');
                usiaInput.focus();
                return;
            }

            const isConfirmed = confirm(`Apakah Anda yakin ingin mendaftar dengan data ini?\n\nNama: ${fullName}\nEmail: ${email}\nLomba: ${lomba}\nUsia: ${usia}`);

            if (isConfirmed) {
                showAlert('Pendaftaran Berhasil! Terima kasih telah mendaftar lomba 17 Agustus.');
                registrationForm.reset();
            } else {
                showAlert('Pendaftaran dibatalkan.');
            }
        });
    }
});
const galleryGrid = document.querySelector('.gallery-grid');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const closeGalleryBtn = document.querySelector('.gallery-modal .close-btn');
let isModalOpen = false;

if (galleryGrid && galleryModal && modalImage && closeGalleryBtn) {
    galleryGrid.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const imgSrc = event.target.getAttribute('src');
            modalImage.setAttribute('src', imgSrc);
            galleryModal.style.display = 'flex';
            isModalOpen = true;
        }
    });

    closeGalleryBtn.addEventListener('click', function() {
        galleryModal.style.display = 'none';
        isModalOpen = false;
    });

    window.addEventListener('click', function(event) {
        if (event.target === galleryModal) {
            galleryModal.style.display = 'none';
            isModalOpen = false;
        }
    });

    document.addEventListener('keydown', function(event) {
        if (isModalOpen && event.key === 'Escape') {
            galleryModal.style.display = 'none';
            isModalOpen = false;
        }
    });
}