// tkmili_2008.js - سكربت مكالمات التكميلي 2008 (بدون ترقيم وإيموجي)

export const flow = {
    name: 'سكربت التكميلي 2008',
    badge: '2008',
    steps: [
        { id: 'tkmili-greeting', label: 'الترحيب والتعريف', icon: '' },
        { id: 'tkmili-query', label: 'تحديد الجيل والسؤال عن العروض', icon: '' },
        { id: 'tkmili-pitch', label: 'عرض الباقات والأسعار (2008)', icon: '' },
        {
            id: 'tkmili-response',
            label: 'رد العميل (نقطة القرار)',
            icon: '',
            subOptions: [
                { id: 'res-select', label: 'سيناريو أ: يختار باقة مباشرة' },
                { id: 'res-comeback', label: 'سيناريو ب: بشوف وبرجعلكم (تأجيل)' },
                { id: 'res-not-interested', label: 'سيناريو ج: مو مهتم/ماخذ عند منافس' },
                { id: 'res-busy', label: 'سيناريو د: مشغول (تحديد موعد)' }
            ]
        },
        { id: 'tkmili-collect-info', label: 'جمع معلومات التسجيل', icon: '' },
        {
            id: 'tkmili-payment',
            label: 'اختيار طريقة الدفع',
            icon: '',
            subOptions: [
                { id: 'pay-click', label: 'الدفع عبر كليك' },
                { id: 'pay-efawateer', label: 'الدفع عبر إي فواتيركم' },
                { id: 'pay-cash', label: 'الدفع كاش (تحصيل)' },
                { id: 'pay-visa', label: 'الدفع عن طريق فيزا' }
            ]
        },
        { id: 'tkmili-end-success', label: 'إنهاء المكالمة (نجاح)', icon: '' },
        { id: 'tkmili-end-refusal', label: 'إنهاء المكالمة (رفض نهائي)', icon: '' }
    ]
};

export const scripts = {
    // ------------------------------------
    // 1. الترحيب
    // ------------------------------------
    'tkmili-greeting': {
        title: 'الترحيب والتعريف',
        badge: 'الافتتاحية',
        content: `
            <h3>بداية المكالمة</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> مرحبا- السلام عليكم – بدي اسألك – ممكن سؤال.</p>
            </div>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> أهلاً معك قصي من منصة جو أكاديمي قسم المبيعات، تفضل كيف بقدر أساعدك؟</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: تحديد الجيل.</strong></p>
        `
    },

    // ------------------------------------
    // 2. تحديد الجيل والسؤال عن العروض
    // ------------------------------------
    'tkmili-query': {
        title: 'تحديد الجيل والسؤال عن العروض',
        badge: 'تحديد الحاجة',
        content: `
            <h3>تحديد الجيل والعروض</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> بدي أسأل عن عروض الجمعة البيضاء.</p>
            </div>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> أكيد ولا يهمك، ممكن بالبداية أعرف اسمك وأي جيل حضرتك؟</p>
            </div>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> تكميلي 2008.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: عرض الباقات.</strong></p>
        `
    },

    // ------------------------------------
    // 3. عرض الباقات والأسعار (مُعدَّل لـ 2008)
    // ------------------------------------
    'tkmili-pitch': {
        title: 'عرض الباقات والأسعار (2008)',
        badge: 'العرض الرئيسي',
        content: `
            <h3>طرح العرض الأساسي لـ (تكميلي 2008)</h3>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> تمام، عاملين الآن عرض خاص بطلاب 2008:</p>
                <ul class="benefit-list" style="list-style: disc; margin-right: 20px;">
                    <li>المادة الواحدة فصلين + مكثف: <strong>25 دينار</strong></li>
                    <li>المادتين فصلين + مكثف: <strong>35 دينار</strong></li>
                    <li>الـ3 مواد فصلين + مكثف: <strong>50 دينار</strong></li>
                    <li>الـ4 مواد فصلين + مكثف: <strong>60 دينار</strong></li>
                </ul>
                <p style="margin-top: 10px; color: var(--danger-color); font-weight: bold;">ملاحظة: لا يتوفر عرض لـ 5 مواد لجيل 2008.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: رد العميل (نقطة القرار).</strong></p>
        `
    },

    // ------------------------------------
    // 4. رد العميل على العروض (نقطة التفرع)
    // ------------------------------------
    'tkmili-response': {
        title: 'رد العميل (نقطة القرار)',
        badge: 'اتخاذ القرار',
        content: `
            <h3>يرجى اختيار السيناريو الذي سلكه العميل</h3>
            <div class="highlight-box info">
                <p><strong>الخيارات:</strong> يختار باقة / يؤجل / يرفض / مشغول.</p>
            </div>
        `
    },

    // السيناريو 4.1: يختار باقة مباشرة
    'res-select': {
        title: 'سيناريو أ: يختار باقة مباشرة',
        badge: 'اختيار مباشر',
        content: `
            <h3>العميل يختار باقة محددة</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> بدي عرض المادة (أو 2 أو 3 أو 4) مع المكثف.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل مباشرة إلى الخطوة: جمع المعلومات.</strong></p>
        `
    },

    // السيناريو 4.2: بشوف وبرجع (محاولة إقناع بالتوقيت)
    'res-comeback': {
        title: 'سيناريو ب: بشوف وبرجعلكم (إقناع التوقيت)',
        badge: 'محاولة الإقناع (1)',
        content: `
            <h3>محاولة إقناع بالتوقيت</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> بشوف وبرجعلكم.</p>
            </div>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> ممكن تخبرني شو السبب؟ لإنه زي ما بتعرف ما ضل معك وقت، بدنا نفرح بنجاحك.</p>
            </div>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> بدي إياهم كمان أسبوع مو هسا.</p>
            </div>
            <div class="dialog-box agent danger">
                <p><strong>الموظف:</strong> تمام لكن حبيت أخبرك <strong>هاد العرض ممكن ينتهي في أي يوم</strong>.</p>
            </div>
            <h4 style="margin-top: 20px;">يوافق بعد التذكير</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> أوكى باخذ عرض المادة (أو 2 أو 3 أو 4) مع المكثف.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: جمع المعلومات.</strong></p>
            <h4 style="margin-top: 20px;">يرفض نهائياً بعد التذكير</h4>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: إنهاء المكالمة (رفض نهائي).</strong></p>
        `
    },

    // السيناريو 4.3: مو مهتم بالعروض (إقناع بالمنافس)
    'res-not-interested': {
        title: 'سيناريو ج: مو مهتم بالعروض (إقناع المنافس)',
        badge: 'محاولة الإقناع (2)',
        content: `
            <h3>مو مهتم بالعروض / ماخد عند منافس</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> مو مهتم بالعروض (أو: ماخد عند منافس).</p>
            </div>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> تمام، بتفهّم موقفك، بس قبل ما نسكّر، ممكن تخبرني شو السبب؟</p>
            </div>
            <h4 style="margin-top: 20px;">الإقناع بالمميزات</h4>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> ممتاز دايمًا حلو إنك بتدور على طرق تطوّر حالك. بس الفرق عنا <strong>معلمين جو أكاديمي الأفضل على مستوى المملكة</strong>، وجميع الأوائل على المملكة من جو أكاديمي، وأكثر من <strong>2.7 مليون طالب</strong> اشترك معنا في الـ 10 سنين الماضية. وبنصحك تشترك وتأمن مستقبلك.</p>
            </div>
            <h5 style="margin-top: 10px;">يقتنع ويوافق</h5>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> أوكى باخذ عرض المادة (أو 2 أو 3 أو 4) مع المكثف.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: جمع المعلومات.</strong></p>
            <h5 style="margin-top: 10px;">يرفض نهائياً</h5>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> لا شكراً.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: إنهاء المكالمة (رفض نهائي).</strong></p>
        `
    },

    // السيناريو 4.4: مشغول (تحديد موعد)
    'res-busy': {
        title: 'سيناريو د: مشغول (تحديد موعد)',
        badge: 'متابعة لاحقة',
        content: `
            <h3>العميل مشغول (تحديد موعد للمتابعة)</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> مشغول، احكي معي بعدين.</p>
            </div>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> أكيد ولا يهمك! متى أنسب وقت أتواصل معك؟ المساء ولا بكرة الصبح؟ <strong>(سجّل الموعد لتتم المتابعة)</strong></p>
            </div>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> [يعطي موعد محدد - مثلاً: المساء الساعة 7].</p>
            </div>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> كل التوفيق يا رب ورح نتواصل معك (الموعد الذي تم تحديده). عندك أي سؤال أو استفسار آخر؟</p>
            </div>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> لا شكراً.</p>
            </div>
            <p class="next-step-indicator">❌ <strong>انتهت هذه المكالمة. يجب المتابعة في الموعد المحدد.</strong></p>
        `
    },

    // ------------------------------------
    // 5. جمع معلومات التسجيل
    // ------------------------------------
    'tkmili-collect-info': {
        title: 'جمع معلومات التسجيل',
        badge: 'تجميع البيانات',
        content: `
            <h3>جمع المعلومات للطلب</h3>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> ولا يهمك ومبسوطين إنك رح تنضم لعائلة جو أكاديمي. بس بحتاج منك معلومات عشان نأكد الطلب:</p>
                <ul class="benefit-list" style="list-style: disc; margin-right: 20px;">
                    <li><strong>اسم الطالب</strong></li>
                    <li><strong>رقمين هاتف فعالين</strong></li>
                    <li><strong>مكان السكن</strong></li>
                    <li><strong>المواد والمعلمين</strong></li>
                </ul>
            </div>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> [يزود معلومات التسجيل].</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: اختيار طريقة الدفع.</strong></p>
        `
    },

    // ------------------------------------
    // 6. اختيار طريقة الدفع (نقطة التفرع الثالثة)
    // ------------------------------------
    'tkmili-payment': {
        title: 'اختيار طريقة الدفع',
        badge: 'خيارات الدفع',
        content: `
            <h3>تحديد طريقة الدفع</h3>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> عشان أفعّلك المواد، بتقدر تدفع من خلال <strong>الكليك</strong> أو <strong>إي فواتيركم</strong>. شو الطريقة الأنسب إلك؟ أو تحصيل <strong>كاش</strong> لكن بيكلفك <strong>3 دنانير إضافية</strong>.</p>
            </div>
            <p>الرجاء اختيار طريقة الدفع التي طلبها العميل من القائمة الجانبية.</p>
        `
    },

    // السيناريو 6.1: الدفع كليك
    'pay-click': {
        title: 'الدفع عن طريق كليك',
        badge: 'كليك (Click)',
        content: `
            <h3>الدفع عبر Click (فوري)</h3>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> الدفع بكون عن طريق كليك والتفعيل فوري. بس ممكن نتأكد أنه الرقم الموجود على حسابك <strong>نفس الرقم الي مربوط بحساب البنك</strong>؟ ورح يوصلك مباشرة نتوفكيشن من البنك لتقدر تدفع.</p>
            </div>
            <h4 style="margin-top: 20px;">الرقم نفسه</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> نعم نفس الرقم.</p>
            </div>
            <h4 style="margin-top: 20px;">الرقم مختلف</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> لا الرقم مختلف.</p>
            </div>
            <div class="dialog-box agent danger">
                <p><strong>الموظف:</strong> لو سمحت زودني بالرقم اللي مربوط بحساب البنك.</p>
            </div>
            <div class="dialog-box agent success" style="margin-top: 20px;">
                <p><strong>الموظف (الإتمام):</strong> تمام أنا ثبتلك الطلب وحالياً راح يوصلك خلال لحظات من تطبيق بنكك إشعار لإكمال عملية الدفع.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>بعد موافقة العميل على الإشعار، انتقل للخطوة: إنهاء المكالمة (نجاح).</strong></p>
        `
    },

    // السيناريو 6.2: الدفع اي فواتيركم
    'pay-efawateer': {
        title: 'الدفع عن طريق إي فواتيركم',
        badge: 'إي فواتيركم',
        content: `
            <h3>الدفع عبر الرقم المرجعي (E-Fawateercom)</h3>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> المواد الآن موجودة على حسابك وهسا رح يوصلك على الرقم الأول <strong>رقم مرجعي</strong> برسالة نصية (SMS). استعمل هذا الرقم للدفع من خلال خدمة إي فواتيركم. بإمكانك الدفع من خلال <strong>تطبيق البنك أو أقرب محل صرافة أو أي محل هواتف</strong>.</p>
            </div>
            <h4 style="margin-top: 20px;">وصل الرقم المرجعي</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> تمام وصلني يعطيكم العافيه.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: إنهاء المكالمة (نجاح).</strong></p>
            <h4 style="margin-top: 20px;">ما وصل الرقم المرجعي</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> ما وصلني الرقم المرجعي.</p>
            </div>
            <div class="dialog-box agent danger">
                <p><strong>الموظف:</strong> تمام ثبتلك طلبك كمان مرة ممكن تشيك الآن.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: إنهاء المكالمة (نجاح).</strong></p>
        `
    },

    // السيناريو 6.3: الدفع كاش (تحصيل)
    'pay-cash': {
        title: 'الدفع كاش (تحصيل)',
        badge: 'كاش',
        content: `
            <h3>الدفع كاش (تحصيل عبر مندوب)</h3>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> تمام ولا يهمك. قيمة طلبك مع التحصيل بتصير <strong>(المبلغ الموجود على الأدمن)</strong>. وإن شاء الله المندوب خلال <strong>يوم إلى 3 أيام</strong> رح يتواصل معك ليسلمك الوصل ويستلم المبلغ، لكن <strong>المواد الآن فعالة بحسابك وبتقدر تباشر بالدراسة</strong>.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: إنهاء المكالمة (نجاح).</strong></p>
        `
    },

    // السيناريو 6.4: الدفع فيزا
    'pay-visa': {
        title: 'الدفع عن طريق فيزا',
        badge: 'فيزا',
        content: `
            <h3>الدفع عبر رابط الفيزا</h3>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> تمام رح أزودك بلينك الموقع لتثبت طلبك وعند خيار الدفع اختار فيزا. وللحفاظ على سرية معلوماتك، <strong>أكمل الطلب بنفسك</strong>، ومعلومات الحساب رح توصلك عبر الـ SMS.</p>
            </div>
            <p class="next-step-indicator">⬅️ <strong>انتقل للخطوة: إنهاء المكالمة (نجاح).</strong></p>
        `
    },

    // ------------------------------------
    // 7. إنهاء المكالمة (نجاح)
    // ------------------------------------
    'tkmili-end-success': {
        title: 'إنهاء المكالمة (نجاح)',
        badge: 'الإغلاق',
        content: `
            <h3>إغلاق ناجح للمكالمة</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> شكراً إلك.</p>
            </div>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> المواد الآن بحسابك على منصة جو أكاديمي. كل التوفيق وإحنا مبسوطين لانضمامك لعائلة جو أكاديمي. في إشي ثاني بتحب أساعدك فيه؟</p>
            </div>
        `
    },

    // ------------------------------------
    // 8. إنهاء المكالمة (رفض نهائي)
    // ------------------------------------
    'tkmili-end-refusal': {
        title: 'إنهاء المكالمة (رفض نهائي)',
        badge: 'الختام',
        content: `
            <h3>الإنهاء اللطيف للمكالمة</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> لا شكراً.</p>
            </div>
            <div class="dialog-box agent danger">
                <p><strong>الموظف:</strong> ولا يهمك الله يوفقك، وإذا غيرت رأيك إحنا موجودين في خدمتكم.</p>
            </div>
        `
    }
};