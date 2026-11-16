
// ======================================
// ระบบทักทายเดิม (คงไว้)
// ======================================

const greetingBtn = document.getElementById('greetingBtn');

const messaqe = document.getElementById('greetingMessage');

greetingBtn.addEventListener('click', function () {

    messaqe.textContent = 'สวัสดี ยินดีที่ได้รู้จักครับ';

});


// ======================================
// ส่วนที่ 1 Personalized Welcome
// ======================================

// ใช้ prompt รับชื่อผู้เข้าชม
let visitorName = prompt(
    'กรุณากรอกชื่อของคุณ เพื่อเข้าสู่เว็บไซต์ Portfolio'
);

// ตรวจสอบชื่อที่ได้รับ
if (visitorName !== null && visitorName.trim() !== '') {

    visitorName = visitorName.trim();

    // แสดงข้อความต้อนรับบนหน้าเว็บไซต์
    messaqe.textContent =
        `ยินดีต้อนรับคุณ ${visitorName} เข้าสู่เว็บไซต์ Portfolio ของฉัน`;

} else {

    messaqe.textContent =
        'ยินดีต้อนรับเข้าสู่เว็บไซต์ Portfolio ของฉัน';

}


// ======================================
// ส่วนที่ 2 Website Cost Estimator
// ======================================

// กำหนดราคาค่าพัฒนาเว็บไซต์ต่อหน้า
const pricePerPage = 500;

// เชื่อมต่อปุ่มและพื้นที่แสดงผล
const estimateBtn = document.getElementById('estimateBtn');

const pageCount = document.getElementById('pageCount');

const totalCost = document.getElementById('totalCost');

// เมื่อผู้เข้าชมคลิกปุ่มคำนวณค่าบริการ
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
    pageCount.textContent =
        numberOfPages + ' หน้า';

    totalCost.textContent =
        totalPrice.toLocaleString('th-TH') + ' บาท';

});