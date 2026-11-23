/**
 * My Developer Portfolio Script
 * รองรับฟังก์ชันเดิมครบถ้วน 100% พร้อมขยายความสามารถใหม่:
 * 1. Dark Mode (สลับธีมพร้อมบันทึก LocalStorage)
 * 2. Project Filter (กรองผลงานตามหมวดหมู่)
 * 3. Project Details Modal (หน้าต่างแสดงรายละเอียดผลงานเพิ่มเติม)
 * 4. Contact Form Validation (ตรวจสอบความถูกต้องของแบบฟอร์มติดต่อ)
 */

// ======================================
// ระบบทักทายเดิม (คงไว้ตามเดิม 100%)
// ======================================

const greetingBtn = document.getElementById('greetingBtn');
const messaqe = document.getElementById('greetingMessage');

if (greetingBtn && messaqe) {
    greetingBtn.addEventListener('click', function () {
        messaqe.textContent = 'สวัสดี ยินดีที่ได้รู้จักครับ';
    });
}


// ======================================
// ส่วนที่ 1 Personalized Welcome (คงไว้ตามเดิม 100%)
// ======================================

// ใช้ prompt รับชื่อผู้เข้าชม
let visitorName = prompt(
    'กรุณากรอกชื่อของคุณ เพื่อเข้าสู่เว็บไซต์ Portfolio'
);

// ตรวจสอบชื่อที่ได้รับ
if (visitorName !== null && visitorName.trim() !== '') {
    visitorName = visitorName.trim();
    if (messaqe) {
        // แสดงข้อความต้อนรับบนหน้าเว็บไซต์
        messaqe.textContent =
            `ยินดีต้อนรับคุณ ${visitorName} เข้าสู่เว็บไซต์ Portfolio ของฉัน`;
    }
} else {
    if (messaqe) {
        messaqe.textContent =
            'ยินดีต้อนรับเข้าสู่เว็บไซต์ Portfolio ของฉัน';
    }
}


// ======================================
// ส่วนที่ 2 Website Cost Estimator (คงไว้ตามเดิม 100%)
// ======================================

// กำหนดราคาค่าพัฒนาเว็บไซต์ต่อหน้า
const pricePerPage = 500;

// เชื่อมต่อปุ่มและพื้นที่แสดงผล
const estimateBtn = document.getElementById('estimateBtn');
const pageCount = document.getElementById('pageCount');
const totalCost = document.getElementById('totalCost');

// เมื่อผู้เข้าชมคลิกปุ่มคำนวณค่าบริการ
if (estimateBtn) {
    estimateBtn.addEventListener('click', function () {

        // รับจำนวนหน้าจาก prompt
        const inputPages = prompt(
            'กรุณากรอกจำนวนหน้าที่ต้องการพัฒนาเว็บไซต์'
        );

        // ตรวจสอบการกดยกเลิก
        if (inputPages === null) {
            return;
        }

        // แปลงข้อมูลเป็นตัวเลข
        const numberOfPages = Number(inputPages);

        // ตรวจสอบข้อมูล
        if (
            inputPages.trim() === '' ||
            !Number.isInteger(numberOfPages) ||
            numberOfPages <= 0
        ) {
            alert('กรุณากรอกจำนวนหน้าเป็นจำนวนเต็มที่มากกว่า 0');
            return;
        }

        // คำนวณค่าบริการทั้งหมด
        const totalPrice = numberOfPages * pricePerPage;

        // แสดงผลบนหน้าเว็บไซต์
        if (pageCount) {
            pageCount.textContent = numberOfPages + ' หน้า';
        }

        if (totalCost) {
            totalCost.textContent =
                totalPrice.toLocaleString('th-TH') + ' บาท';
        }
    });
}


// ==========================================================================
// ส่วนที่ 3 Dark Mode - ระบบเปลี่ยนธีม (Light / Dark Mode)
// ==========================================================================

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

/**
 * อัปเดตการแสดงผลไอคอนและข้อความบนปุ่มเปลี่ยนธีม
 * @param {boolean} isDark
 */
function updateThemeUI(isDark) {
    if (themeIcon && themeLabel) {
        if (isDark) {
            themeIcon.textContent = '☀️';
            themeLabel.textContent = 'Light Mode';
            themeToggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)');
        } else {
            themeIcon.textContent = '🌙';
            themeLabel.textContent = 'Dark Mode';
            themeToggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดมืด (Dark Mode)');
        }
    }
}

/**
 * โหลดธีมที่เคยบันทึกไว้ใน LocalStorage หรือตรวจตามระบบของผู้ใช้
 */
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeUI(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeUI(false);
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
        updateThemeUI(isDarkMode);
    });
}

// เริ่มต้นระบบธีม
initTheme();


// ==========================================================================
// ส่วนที่ 4 Project Filter - ระบบกรองผลงานตามหมวดหมู่
// ==========================================================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // อัปเดตสถานะปุ่มที่เลือก (active)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selectedFilter = this.getAttribute('data-filter');

            // กรองการ์ดโปรเจกต์
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedFilter === 'all' || selectedFilter === cardCategory) {
                    card.style.display = 'flex';
                    // เพิ่มแอนิเมชันตอนแสดงผล
                    card.style.animation = 'fadeIn 0.3s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}


// ==========================================================================
// ส่วนที่ 5 Project Details - ระบบแสดงรายละเอียดผลงานเพิ่มเติม (Modal Popup)
// ==========================================================================

// ข้อมูลรายละเอียดเชิงลึกของผลงานแต่ละชิ้น
const projectsData = {
    'project-1': {
        title: 'My Developer Profile',
        category: 'การพัฒนาเว็บ (Web Development)',
        badgeClass: 'badge-web',
        icon: '💻',
        description: 'เว็บไซต์แนะนำประวัติส่วนตัวและผลงานที่พัฒนาด้วยโครงสร้าง HTML5, ตกแต่งด้วย CSS3 แบบประณีต และเพิ่มการโต้ตอบด้วย Vanilla JavaScript โดยเป็นโปรเจกต์หลักที่ใช้ฝึกฝนการเขียนโค้ดมาตรฐาน การทำ Responsive Design และการจัดการ DOM',
        features: [
            'การวางโครงสร้าง Semantic HTML5 ที่ชัดเจนและเป็นระเบียบ',
            'ระบบ Responsive Design รองรับการใช้งานทั้งคอมพิวเตอร์และมือถือ',
            'ระบบคำนวณค่าบริการพัฒนาเว็บไซต์ (Website Cost Estimator)',
            'ระบบสลับธีม Dark Mode / Light Mode พร้อมจำค่าลง LocalStorage'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'LocalStorage']
    },
    'project-2': {
        title: 'Student Grade & Data Dashboard',
        category: 'การวิเคราะห์ข้อมูล (Data Analytics)',
        badgeClass: 'badge-data',
        icon: '📊',
        description: 'ระบบแดชบอร์ดสรุปผลการเรียนและวิเคราะห์สถิตินักศึกษา เพื่อช่วยให้อาจารย์และนักศึกษาเห็นพัฒนาการของผลการเรียนรายวิชา สถิติการเข้าเรียน และค่าเฉลี่ยคะแนนผ่านกราฟเชิงโต้ตอบ',
        features: [
            'นำเข้าและประมวลผลข้อมูลสถิติคะแนนและสถิติการเข้าเรียน',
            'แสดงผลในรูปแบบกราฟแท่งและกราฟวงกลมแบบไดนามิก',
            'ระบบกรองข้อมูลรายเทอมและรายวิชาเพื่อการเปรียบเทียบผลลัพธ์',
            'สรุปตัวชี้วัดสำคัญ (Key Metrics) เช่น GPA เฉลี่ย และอัตราการผ่าน'
        ],
        techStack: ['JavaScript', 'Data Analytics', 'Chart.js', 'CSS Grid', 'JSON']
    },
    'project-3': {
        title: 'Smart Cafe UI/UX Redesign',
        category: 'การออกแบบ UI/UX (UI/UX Design)',
        badgeClass: 'badge-design',
        icon: '☕',
        description: 'โปรเจกต์ศึกษาและออกแบบประสบการณ์ผู้ใช้งาน (UX) และส่วนติดต่อผู้ใช้ (UI) สำหรับแอปพลิเคชันร้านกาแฟสมัยใหม่ เน้นลดขั้นตอนการสั่งซื้อให้รวดเร็วขึ้นภายใน 3 คลิก และรองรับระบบสะสมแต้มสมาชิก',
        features: [
            'การทำ User Journey Mapping และ Information Architecture',
            'การออกแบบ Wireframe แบบ Low-fidelity และ High-fidelity Prototype',
            'ระบบเลือกปรับแต่งความหวาน ขนาดแก้ว และท็อปปิ้งเครื่องดื่มที่เข้าใจง่าย',
            'การทดสอบความง่ายในการใช้งาน (Usability Testing) กับกลุ่มตัวอย่างจริง'
        ],
        techStack: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping']
    },
    'project-4': {
        title: 'Task & Habit Tracker Web App',
        category: 'การพัฒนาเว็บ (Web Development)',
        badgeClass: 'badge-web',
        icon: '📝',
        description: 'เว็บแอปพลิเคชันสำหรับจัดระเบียบชีวิตประจำวัน ช่วยจัดการสิ่งที่ต้องทำ (To-Do List) และติดตามกิจวัตรนิสัยที่ดีอย่างต่อเนื่อง มีระบบสรุปความก้าวหน้ารายสัปดาห์เพื่อเสริมสร้างวินัยตามคติประจำใจ',
        features: [
            'เพิ่ม แก้ไข ทำเครื่องหมายเสร็จสิ้น และลบรายการงาน (CRUD Operations)',
            'ระบบเก็บ streak ความต่อเนื่องในการสร้างกิจวัตรที่ดี',
            'บันทึกข้อมูลในบราวเซอร์ของผู้ใช้ด้วย Web Storage API ทำให้ไม่สูญหาย',
            'UI เรียบง่าย ปรับเปลี่ยนธีมมืด/สว่างได้อย่างกลมกลืน'
        ],
        techStack: ['JavaScript', 'HTML5', 'CSS3', 'Web Storage API', 'Event-driven Architecture']
    }
};

const projectModal = document.getElementById('projectModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

// องค์ประกอบภายใน Modal
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalTechStack = document.getElementById('modalTechStack');
const modalImageContainer = document.getElementById('modalImageContainer');

/**
 * เปิด Modal พร้อมแสดงข้อมูลของโปรเจกต์ตาม projectId
 * @param {string} projectId 
 */
function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalCategory.className = `project-badge ${data.badgeClass}`;
    modalDescription.textContent = data.description;

    // ไอคอนประกอบ
    if (modalImageContainer) {
        modalImageContainer.innerHTML = `<div class="modal-placeholder-icon">${data.icon}</div>`;
    }

    // ฟีเจอร์สำคัญ
    if (modalFeatures) {
        modalFeatures.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });
    }

    // Tech Stack
    if (modalTechStack) {
        modalTechStack.innerHTML = '';
        data.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            modalTechStack.appendChild(span);
        });
    }

    // แสดง Modal
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // ป้องกันการเลื่อนหน้าจอด้านหลัง
}

/**
 * ปิดหน้าต่าง Modal
 */
function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // คืนค่าการเลื่อนหน้าจอ
}

// ผูก Event ให้ปุ่ม "ดูรายละเอียด" ของแต่ละการ์ด
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function () {
        const projectId = this.getAttribute('data-project-id');
        openProjectModal(projectId);
    });
});

// ผูก Event ปุ่มปิด
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
}
if (modalCloseActionBtn) {
    modalCloseActionBtn.addEventListener('click', closeProjectModal);
}

// ปิดเมื่อคลิกที่พื้นหลัง Backdrop
if (projectModal) {
    projectModal.addEventListener('click', function (e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// ปิดเมื่อกดแป้น Escape
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-open')) {
        closeProjectModal();
    }
});


// ==========================================================================
// ส่วนที่ 6 Contact Form - แบบฟอร์มติดต่อพร้อมการตรวจสอบข้อมูล (Validation)
// ==========================================================================

const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactSubject = document.getElementById('contactSubject');
const contactMessage = document.getElementById('contactMessage');
const contactAlert = document.getElementById('contactAlert');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

/**
 * ฟังก์ชันตรวจสอบรูปแบบอีเมล (Regex Email Validation)
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * แสดงข้อความแจ้งเตือนสถานะของแบบฟอร์ม
 * @param {string} message ข้อความแจ้งเตือน
 * @param {'success'|'error'} type ประเภทแจ้งเตือน
 */
function showContactAlert(message, type) {
    if (!contactAlert) return;
    contactAlert.textContent = message;
    contactAlert.className = `contact-alert ${type}`;
    contactAlert.style.display = 'block';

    // ซ่อนข้อความแจ้งเตือนอัตโนมัติหลังผ่านไป 6 วินาที (หากเป็นความสำเร็จ)
    if (type === 'success') {
        setTimeout(() => {
            contactAlert.style.display = 'none';
        }, 6000);
    }
}

// ล้างข้อความผิดพลาดทันทีเมื่อผู้ใช้เริ่มพิมพ์แก้ไข
if (contactName) {
    contactName.addEventListener('input', function () {
        if (this.value.trim().length >= 2) {
            this.classList.remove('is-invalid');
            if (nameError) nameError.textContent = '';
        }
    });
}

if (contactEmail) {
    contactEmail.addEventListener('input', function () {
        if (isValidEmail(this.value.trim())) {
            this.classList.remove('is-invalid');
            if (emailError) emailError.textContent = '';
        }
    });
}

if (contactMessage) {
    contactMessage.addEventListener('input', function () {
        if (this.value.trim().length >= 10) {
            this.classList.remove('is-invalid');
            if (messageError) messageError.textContent = '';
        }
    });
}

// ตรวจสอบข้อมูลเมื่อกดส่งแบบฟอร์ม (Form Submission Validation)
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // ป้องกันการรีเฟรชหน้าเว็บ
        e.preventDefault();

        let isValid = true;

        // 1. ตรวจสอบชื่อ (ต้องไม่ว่างและอย่างน้อย 2 ตัวอักษร)
        const nameVal = contactName ? contactName.value.trim() : '';
        if (nameVal === '') {
            isValid = false;
            contactName.classList.add('is-invalid');
            if (nameError) nameError.textContent = 'กรุณากรอกชื่อ-นามสกุลของคุณ';
        } else if (nameVal.length < 2) {
            isValid = false;
            contactName.classList.add('is-invalid');
            if (nameError) nameError.textContent = 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร';
        } else {
            contactName.classList.remove('is-invalid');
            if (nameError) nameError.textContent = '';
        }

        // 2. ตรวจสอบอีเมล (ต้องไม่ว่างและรูปแบบถูกต้อง)
        const emailVal = contactEmail ? contactEmail.value.trim() : '';
        if (emailVal === '') {
            isValid = false;
            contactEmail.classList.add('is-invalid');
            if (emailError) emailError.textContent = 'กรุณากรอกอีเมลของคุณ';
        } else if (!isValidEmail(emailVal)) {
            isValid = false;
            contactEmail.classList.add('is-invalid');
            if (emailError) emailError.textContent = 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง เช่น name@example.com';
        } else {
            contactEmail.classList.remove('is-invalid');
            if (emailError) emailError.textContent = '';
        }

        // 3. ตรวจสอบข้อความ (ต้องไม่ว่างและอย่างน้อย 10 ตัวอักษร)
        const messageVal = contactMessage ? contactMessage.value.trim() : '';
        if (messageVal === '') {
            isValid = false;
            contactMessage.classList.add('is-invalid');
            if (messageError) messageError.textContent = 'กรุณากรอกข้อความที่คุณต้องการติดต่อ';
        } else if (messageVal.length < 10) {
            isValid = false;
            contactMessage.classList.add('is-invalid');
            if (messageError) messageError.textContent = 'ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร (ปัจจุบันมี ' + messageVal.length + ' ตัวอักษร)';
        } else {
            contactMessage.classList.remove('is-invalid');
            if (messageError) messageError.textContent = '';
        }

        // หากข้อมูลไม่ถูกต้อง ให้เลื่อนไปยังจุดที่ผิดพลาดและแจ้งเตือน
        if (!isValid) {
            showContactAlert('กรุณากรอกข้อมูลในช่องที่มีเครื่องหมายดอกจัน (*) ให้ครบถ้วนและถูกต้อง', 'error');
            return;
        }

        // ======================================================================
        // ส่งข้อความจริงตรงเข้า Gmail (key013887@gmail.com) ผ่าน FormSubmit API
        // ======================================================================
        const submitBtn = document.getElementById('contactSubmitBtn');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'ส่งข้อความ';

        // ปรับสถานะปุ่มเป็นกำลังส่ง
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>⏳ กำลังส่งข้อความไปยังอีเมล...</span>';
        }

        const subjectVal = contactSubject && contactSubject.value.trim() !== '' 
            ? contactSubject.value.trim() 
            : 'ข้อความใหม่จากเว็บไซต์ Portfolio';

        // ส่งข้อมูลแบบ AJAX POST
        fetch('https://formsubmit.co/ajax/key013887@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `[Portfolio Contact] ${subjectVal} (จากคุณ ${nameVal})`,
                _template: 'table',
                _captcha: 'false',
                'ชื่อผู้ติดต่อ': nameVal,
                'อีเมลผู้ติดต่อ': emailVal,
                'หัวข้อเรื่อง': subjectVal,
                'ข้อความ': messageVal
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('เครือข่ายขัดข้องหรือไม่สามารถส่งอีเมลได้');
        })
        .then(data => {
            // ส่งสำเร็จ
            showContactAlert(
                `✓ ส่งข้อความเรียบร้อยแล้ว! ข้อความถูกส่งตรงไปยังอีเมล key013887@gmail.com แล้ว ขอบคุณคุณ ${nameVal} ที่ติดต่อเข้ามาครับ`,
                'success'
            );
            // ล้างฟอร์ม
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error sending message:', error);
            // แสดงข้อความแจ้งเตือนข้อผิดพลาด
            showContactAlert(
                `ขออภัย ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต หรือส่งอีเมลโดยตรงมาที่ key013887@gmail.com`,
                'error'
            );
        })
        .finally(() => {
            // คืนค่าสถานะปุ่ม
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            // เลื่อนหน้าจอมายังกล่องแจ้งเตือน
            if (contactAlert) {
                contactAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}
