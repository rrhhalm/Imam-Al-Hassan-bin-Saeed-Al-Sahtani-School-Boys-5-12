// البيانات الخاصة بالصفوف والشعب
const schoolData = {
    "الصف الخامس": ["5", "5/1", "5/2", "5/3"],
    "الصف السادس": ["6/1", "6/2", "6/3"],
    "الصف السابع": ["7/1", "7/2", "7/3"],
    "الصف الثامن": ["8/1", "8/2", "8/3"],
    "الصف التاسع": ["9/1", "9/2"],
    "الصف العاشر": ["10/1", "10/2"],
    "الصف الحادي عشر": ["11/1", "11/2"],
    "الصف الثاني عشر": ["12/1", "12/2"]
};

// دالة لفتح القسم المطلوب وإخفاء الأيقونات
function openSection(sectionId) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.section-content').forEach(sec => {
        sec.classList.remove('active');
    });
    // إخفاء الأيقونات الرئيسية
    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.style.display = 'none';
    });
    // إظهار القسم المطلوب
    document.getElementById(sectionId).classList.add('active');
}

// دالة لإغلاق القسم والعودة للأيقونات
function closeSection(sectionId) {
    document.getElementById(sectionId).classList.remove('active');
    // إظهار الأيقونات الرئيسية
    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.style.display = 'block';
    });
}

// دالة لبناء قائمة الصفوف والشعب ديناميكياً
function buildClassesUI() {
    const container = document.getElementById('classes-container');
    container.innerHTML = ''; // مسح المحتوى السابق إن وجد

    for (const [grade, classes] of Object.entries(schoolData)) {
        // إنشاء عنصر الأكورديون (القائمة المنسدلة)
        const item = document.createElement('div');
        item.className = 'accordion-item';

        // رأس الأكورديون (اسم الصف)
        const header = document.createElement('div');
        header.className = 'accordion-header';
        header.innerHTML = `<span>${grade}</span> <span>▼</span>`;
        
        // محتوى الأكورديون (الشعب)
        const content = document.createElement('div');
        content.className = 'accordion-content';
        
        const list = document.createElement('ul');
        list.className = 'class-list';

        classes.forEach(className => {
            const li = document.createElement('li');
            li.textContent = `شعبة ${className}`;
            // هنا يمكنك إضافة رابط أو زر لكل شعبة للدخول لصفحة الحضور الخاصة بها
            li.onclick = () => alert(`سيتم فتح سجل الحضور والغياب لـ ${className}`);
            list.appendChild(li);
        });

        content.appendChild(list);
        item.appendChild(header);
        item.appendChild(content);
        container.appendChild(item);

        // إضافة حدث النقر لفتح وإغلاق القائمة المنسدلة
        header.addEventListener('click', () => {
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.accordion-content').forEach(acc => {
                if(acc !== content) acc.classList.remove('active');
            });
            document.querySelectorAll('.accordion-header span:last-child').forEach(arrow => {
                if(arrow !== header.lastElementChild) arrow.textContent = '▼';
            });

            // تبديل حالة القائمة الحالية
            content.classList.toggle('active');
            const arrow = header.lastElementChild;
            arrow.textContent = content.classList.contains('active') ? '▲' : '▼';
        });
    }
}

// تشغيل بناء الواجهة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    buildClassesUI();
});