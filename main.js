// main.js - المنطق الرئيسي الموحد (UI/UX - Checklist - Dark Mode)

// المتغيرات العامة التي تربط عناصر HTML
const homePage = document.getElementById('homePage');
const scriptPage = document.getElementById('scriptPage');
const flowPanel = document.getElementById('flowPanel');
const scriptDisplay = document.getElementById('scriptDisplay');

let currentScriptsData = {};
let currentScriptsFlow = {};
let completedSteps = new Set(); // لتتبع الخطوات المكتملة

// ------------------------------------------------------------------
// 0. Dark Mode / Light Mode Logic
// ------------------------------------------------------------------

/**
 * دالة تبديل الثيم وحفظ التفضيل
 */
window.toggleTheme = function() {
    const body = document.body;
    const isDarkMode = !body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
}

/**
 * دالة تحديث أيقونة الثيم
 */
function updateThemeIcon(isDarkMode) {
    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
         icon.innerHTML = isDarkMode ? '☀️' : '🌙';
         icon.title = isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن';
    }
}

// Check local storage on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = false;
    
    if (savedTheme === 'dark') {
        isDarkMode = true;
    } else if (savedTheme === 'light') {
        isDarkMode = false;
    } else if (prefersDark) {
        isDarkMode = true;
    }
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon(isDarkMode);
});

// ------------------------------------------------------------------
// 1. وظائف التنقل الأساسية
// ------------------------------------------------------------------

/**
 * دالة العودة للصفحة الرئيسية
 */
window.goHome = function() {
    homePage.classList.remove('hidden');
    scriptPage.classList.add('hidden');
    currentScriptsData = {};
    currentScriptsFlow = {};
    completedSteps = new Set(); // إعادة تعيين قائمة المراجعة
    flowPanel.innerHTML = '';
};

/**
 * الدالة الرئيسية لتحميل السكربت بناءً على نوعه
 */
window.loadScript = async function(scriptType) {
    homePage.classList.add('hidden');
    scriptPage.classList.remove('hidden');
    scriptDisplay.innerHTML = `<p style="text-align:center; padding: 50px; font-size: 1.5em; color: var(--primary-color);">جاري تحميل السكربت...</p>`;

    try {
        // 💡 مسار الاستيراد الصحيح: يبحث داخل مجلد 'scripts'
        const module = await import(`./scripts/${scriptType}.js`);

        currentScriptsFlow = module.flow;
        currentScriptsData = module.scripts;
        completedSteps = new Set();
        
        buildFlowPanel(currentScriptsFlow);
        // عند التحميل، نقوم بعرض أول خطوة أو الخطوة الرئيسية في حالة وجود خيارات فرعية
        if (currentScriptsFlow.steps.length > 0) {
            const firstStepId = currentScriptsFlow.steps[0].id;
            showScript(firstStepId); 
            // إذا كانت أول خطوة تحتوي على خيارات فرعية، افتحها
            if (currentScriptsFlow.steps[0].subOptions) {
                toggleSubOptions(firstStepId, true);
            }
        }

    } catch (error) {
        console.error("Error loading script module:", error);
        scriptDisplay.innerHTML = `<div class="highlight-box danger">عذراً، لم يتم العثور على ملف السكربت (<code>${scriptType}.js</code>). الرجاء التأكد من وجوده داخل مجلد <strong>scripts</strong>.</div>`;
    }
};

// ------------------------------------------------------------------
// 2. بناء اللوحة الجانبية وعرض المحتوى
// ------------------------------------------------------------------

/**
 * دالة بناء اللوحة الجانبية (Flow Panel)
 */
function buildFlowPanel(flow) {
    flowPanel.innerHTML = `
        <h2 class="flow-title">${flow.name}</h2>
    `;

    flow.steps.forEach((step, index) => {
        const stepContainer = document.createElement('div');
        stepContainer.className = 'step-container';

        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.id = `step-${step.id}`;

        if (step.subOptions) {
            // للخطوات التي تحتوي على خيارات فرعية
            stepDiv.onclick = () => {
                showScript(step.id);
                toggleSubOptions(step.id);
            };
        } else {
            // للخطوات العادية
            stepDiv.onclick = () => showScript(step.id);
        }

        stepDiv.innerHTML = `
            <span><span class="step-number">${index + 1}</span> ${step.label}</span>
            <span>${step.icon}</span>
        `;
        
        stepContainer.appendChild(stepDiv);

        if (step.subOptions) {
            const subOptionsDiv = document.createElement('div');
            subOptionsDiv.className = 'sub-options';
            subOptionsDiv.id = step.id;
            subOptionsDiv.style.display = 'none'; // مخفية افتراضياً

            step.subOptions.forEach(subOption => {
                const subOptionDiv = document.createElement('div');
                subOptionDiv.className = 'sub-option';
                subOptionDiv.id = `sub-option-${subOption.id}`;
                subOptionDiv.textContent = subOption.label;
                subOptionDiv.onclick = (e) => {
                    e.stopPropagation(); // منع النقر من الوصول للخطوة الرئيسية
                    showScript(subOption.id);
                };
                subOptionsDiv.appendChild(subOptionDiv);
            });
            stepContainer.appendChild(subOptionsDiv);
        }

        flowPanel.appendChild(stepContainer);
    });
}

/**
 * دالة لفتح/إغلاق القائمة الفرعية
 * @param {string} id - ID للـ Step الرئيسية التي تحتوي على subOptions
 * @param {boolean} forceOpen - لإجبار فتح القائمة عند تحميل الصفحة
 */
window.toggleSubOptions = function(id, forceOpen = false) {
    const subOptions = document.getElementById(id);
    if (!subOptions) return;
    
    const isHidden = subOptions.style.display === 'none';
    
    // إغلاق جميع القوائم الفرعية الأخرى (لتفادي تداخل القوائم)
    document.querySelectorAll('.sub-options').forEach(el => {
        if (el.id !== id) {
            el.style.display = 'none';
        }
    });
    
    // إخفاء/إظهار القائمة الحالية
    if (forceOpen) {
         subOptions.style.display = 'block';
    } else {
        subOptions.style.display = isHidden ? 'block' : 'none';
    }
};


/**
 * دالة عرض محتوى السكربت
 */
window.showScript = function(scriptId) {
    const displayArea = document.getElementById('scriptDisplay');
    const script = currentScriptsData[scriptId];
    
    // إزالة التفعيل من جميع الخطوات/الخيارات
    document.querySelectorAll('.step, .sub-option').forEach(el => el.classList.remove('active'));

    // تفعيل الخطوة/الخيار الحالي
    let activeElement = document.getElementById(`sub-option-${scriptId}`) || document.getElementById(`step-${scriptId}`);
    let parentSubContainer = null;

    if (activeElement) {
        activeElement.classList.add('active');
        activeElement.classList.remove('completed'); // إزالة حالة الاكتمال عند التفعيل

        // التعامل مع الخطوات الفرعية
        if (activeElement.classList.contains('sub-option')) {
            parentSubContainer = activeElement.closest('.sub-options');
            if (parentSubContainer) {
                // فتح القائمة الفرعية
                parentSubContainer.style.display = 'block';

                // تفعيل الخطوة الرئيسية التابعة
                const parentStepId = parentSubContainer.id;
                const parentStepElement = document.getElementById(`step-${parentStepId}`);
                if (parentStepElement) {
                    parentStepElement.classList.add('active');
                    parentStepElement.classList.remove('completed');
                }
            }
        }
    }


    if (script) {
        // تحديد الخطوة التالية للـ Next Button
        let nextScriptId = null;
        let nextButtonHTML = '';
        
        // البحث في الخطوات الرئيسية (للانتقال بين الخطوات الرئيسية)
        let foundIndex = currentScriptsFlow.steps.findIndex(step => step.id === scriptId);
        
        if (foundIndex !== -1 && currentScriptsFlow.steps.length > foundIndex + 1) {
            nextScriptId = currentScriptsFlow.steps[foundIndex + 1].id;
        } 
        // البحث داخل الخيارات الفرعية (للانتقال داخل القوائم الفرعية)
        else {
            for (const step of currentScriptsFlow.steps) {
                if (step.subOptions) {
                    const subIndex = step.subOptions.findIndex(sub => sub.id === scriptId);
                    if (subIndex !== -1 && step.subOptions.length > subIndex + 1) {
                        nextScriptId = step.subOptions[subIndex + 1].id;
                        break;
                    } else if (subIndex !== -1) {
                        // إذا كانت آخر خطوة فرعية، ننتقل للخطوة الرئيسية التالية
                        const parentIndex = currentScriptsFlow.steps.findIndex(s => s.id === step.id);
                        if (parentIndex !== -1 && currentScriptsFlow.steps.length > parentIndex + 1) {
                            nextScriptId = currentScriptsFlow.steps[parentIndex + 1].id;
                        }
                        break;
                    }
                }
            }
        }

        if (nextScriptId) {
            const nextStepLabel = currentScriptsFlow.steps.find(s => s.id === nextScriptId)?.label ||
                                 currentScriptsFlow.steps.flatMap(s => s.subOptions || []).find(s => s.id === nextScriptId)?.label;
            nextButtonHTML = `<button class="next-step-btn" onclick="showScript('${nextScriptId}')">الانتقال للخطوة التالية: ${nextStepLabel}</button>`;
        }


        // عرض المحتوى
        displayArea.innerHTML = `
            <div class="script-header">
                <h2 class="script-title">${script.title}</h2>
                <div class="script-badge">${script.badge}</div>
            </div>
            
            <div class="script-content">
                ${script.content}
            </div>

            <button class="copy-btn" onclick="copyScript('${scriptId}')">
                <span>نسخ السكربت</span>
                <span>📋</span>
            </button>
            ${nextButtonHTML}
        `;
    } else {
         // هذه الرسالة لن تظهر الآن للخطوات الرئيسية التي لها subOptions، لأننا أضفنا لها محتوى (انظر universities.js و outbound_2008_2009.js)
         displayArea.innerHTML = `<p style="text-align:center; padding: 50px; font-size: 1.5em; color: var(--danger-color);">عذراً، محتوى هذا السكربت غير موجود في ملف البيانات. (ID: ${scriptId})</p>`;
    }
};

// ------------------------------------------------------------------
// 3. وظيفة النسخ
// ------------------------------------------------------------------

/**
 * دالة نسخ محتوى السكربت إلى الحافظة
 */
window.copyScript = function(scriptId) {
    const script = currentScriptsData[scriptId];
    if (!script) return;
    
    // إنشاء عنصر مؤقت لتحويل HTML إلى نص عادي لضمان النسخ الصحيح
    const temp = document.createElement('div');
    temp.innerHTML = script.content;
    const text = temp.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.copy-btn');
        // حفظ الحالة الأصلية
        const originalHTML = btn.innerHTML;
        const originalBackground = btn.style.backgroundColor;
        
        // حالة "تم النسخ"
        btn.innerHTML = '<span>✅</span><span> تم النسخ!</span>';
        btn.style.backgroundColor = 'var(--accent-color)'; 
        
        // العودة للحالة الأصلية بعد 2 ثانية
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = originalBackground;
        }, 2000);
    });
};

/**
 * دالة تحديد الخطوة كمكتملة (Checklist)
 */
window.markComplete = function(scriptId) {
    const activeElement = document.getElementById(`sub-option-${scriptId}`) || document.getElementById(`step-${scriptId}`);
    
    if (activeElement && !activeElement.classList.contains('completed')) {
        activeElement.classList.add('completed');
        activeElement.classList.remove('active');
        completedSteps.add(scriptId);
        
        // إغلاق القائمة الفرعية بعد الانتهاء
        if (activeElement.classList.contains('sub-option')) {
            const parentSubContainer = activeElement.closest('.sub-options');
            if (parentSubContainer) {
                parentSubContainer.style.display = 'none';
            }
        }
    } else if (activeElement && activeElement.classList.contains('completed')) {
        activeElement.classList.remove('completed');
        completedSteps.delete(scriptId);
    }
};