// tkmili_2007.js - سكربت مكالمات التكميلي 2007/2008 (النسخة النهائية والمحدثة)

export const flow = {
    name: 'سكربت التكميلي 2007',
    badge: '2007',
    steps: [
        { id: 'tkmili-greeting', label: 'الترحيب والتعريف', icon: '' },
        { id: 'tkmili-query', label: 'تحديد الجيل والسؤال عن العروض', icon: '' },
        { id: 'tkmili-pitch', label: 'عرض الباقات والأسعار', icon: '' },
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
    // الترحيب
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
            <p class="next-step-indicator">انتقل للخطوة: تحديد الجيل.</p>
        `
    },

    // ------------------------------------
    // تحديد الجيل والسؤال عن العروض
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
                <p><strong>العميل:</strong> تكميلي 2007.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: عرض الباقات.</p>
        `
    },

    // ------------------------------------
    // عرض الباقات والأسعار
    // ------------------------------------
    'tkmili-pitch': {
        title: 'عرض الباقات والأسعار',
        badge: 'العرض الرئيسي',
        content: `
            <h3>طرح العرض الأساسي</h3>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> تمام، عاملين الآن عرض: </p>
                <ul class="benefit-list" style="list-style: disc; margin-right: 20px;">
                    <li>المادة الواحدة فصلين + مكثف: **25 دينار**</li>
                    <li>المادتين فصلين + مكثف: **35 دينار**</li>
                    <li>الـ3 مواد فصلين + مكثف: **50 دينار**</li>
                    <li>الـ4 مواد فصلين + مكثف: **70 دينار**</li>
                    <li>الـ5 مواد فصلين + مكثف: **75 دينار**</li>
                </ul>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: رد العميل (نقطة القرار).</p>
        `
    },

    // ------------------------------------
    // رد العميل على العروض (نقطة التفرع)
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

    // السيناريو يختار باقة مباشرة
    'res-select': {
        title: 'سيناريو أ: يختار باقة مباشرة',
        badge: 'اختيار مباشر',
        content: `
            <h3>العميل يختار باقة محددة</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> بدي عرض المادة (أو 2 أو 3 أو 4 أو 5) مع المكثف.</p>
            </div>
            <p class="next-step-indicator">انتقل مباشرة إلى الخطوة: جمع المعلومات.</p>
        `
    },

    // السيناريو بشوف وبرجع (محاولة إقناع بالتوقيت)
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
                <p><strong>الموظف:</strong> تمام لكن حبيت أخبرك **هاد العرض ممكن ينتهي في أي يوم**.</p>
            </div>
            <h4 style="margin-top: 20px;">يوافق بعد التذكير</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> أوكى باخذ عرض المادة مع المكثف.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: جمع المعلومات.</p>
            <h4 style="margin-top: 20px;">يرفض نهائياً بعد التذكير</h4>
            <p class="next-step-indicator">انتقل للخطوة: إنهاء المكالمة (رفض نهائي).</p>
        `
    },

    // السيناريو مو مهتم بالعروض (إقناع بالمنافس)
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
                <p><strong>الموظف:</strong> ممتاز دايمًا حلو إنك بتدور على طرق تطوّر حالك. بس الفرق عنا **معلمين جو أكاديمي الأفضل على مستوى المملكة**، وجميع الأوائل على المملكة من جو أكاديمي، وأكثر من **2.7 مليون طالب** اشترك معنا في الـ 10 سنين الماضية. وبنصحك تشترك وتأمن مستقبلك.</p>
            </div>
            <h5 style="margin-top: 10px;">يقتنع ويوافق</h5>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> أوكى باخذ عرض المادة مع المكثف.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: جمع المعلومات.</p>
            <h5 style="margin-top: 10px;">يرفض نهائياً</h5>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> لا شكراً.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: إنهاء المكالمة (رفض نهائي).</p>
        `
    },

    // السيناريو مشغول (تحديد موعد)
    'res-busy': {
        title: 'سيناريو د: مشغول (تحديد موعد)',
        badge: 'متابعة لاحقة',
        content: `
            <h3>العميل مشغول (تحديد موعد للمتابعة)</h3>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> مشغول، احكي معي بعدين.</p>
            </div>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> أكيد ولا يهمك! متى أنسب وقت أتواصل معك؟ المساء ولا بكرة الصبح؟ **(سجّل الموعد لتتم المتابعة)**</p>
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
            <p class="next-step-indicator">انتهت هذه المكالمة. يجب المتابعة في الموعد المحدد.</p>
        `
    },

    // ------------------------------------
    // جمع معلومات التسجيل
    // ------------------------------------
    'tkmili-collect-info': {
        title: 'جمع معلومات التسجيل',
        badge: 'تجميع البيانات',
        content: `
            <h3>جمع المعلومات للطلب</h3>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> ولا يهمك ومبسوطين إنك رح تنضم لعائلة جو أكاديمي. بس بحتاج منك معلومات عشان نأكد الطلب:</p>
                <ul class="benefit-list" style="list-style: disc; margin-right: 20px;">
                    <li>اسم الطالب</li>
                    <li>رقمين هاتف فعالين</li>
                    <li>مكان السكن</li>
                    <li>المواد والمعلمين</li>
                </ul>
            </div>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> [يزود معلومات التسجيل].</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: اختيار طريقة الدفع.</p>
        `
    },

    // ------------------------------------
    // اختيار طريقة الدفع (نقطة التفرع الثالثة)
    // ------------------------------------
    'tkmili-payment': {
        title: 'اختيار طريقة الدفع',
        badge: 'خيارات الدفع',
        content: `
            <h3>تحديد طريقة الدفع</h3>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> عشان أفعّلك المواد، بتقدر تدفع من خلال **الكليك** أو **إي فواتيركم**. شو الطريقة الأنسب إلك؟ أو تحصيل **كاش** لكن بيكلفك **3 دنانير إضافية**.</p>
            </div>
            <p>الرجاء اختيار طريقة الدفع التي طلبها العميل من القائمة الجانبية.</p>
        `
    },

    // السيناريو الدفع كليك
    'pay-click': {
        title: 'الدفع عن طريق كليك',
        badge: 'كليك (Click)',
        content: `
            <h3>الدفع عبر Click (فوري)</h3>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> الدفع بكون عن طريق كليك والتفعيل فوري. بس ممكن نتأكد أنه الرقم الموجود على حسابك **نفس الرقم الي مربوط بحساب البنك**؟ ورح يوصلك مباشرة نتوفكيشن من البنك لتقدر تدفع.</p>
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
            <p class="next-step-indicator">بعد موافقة العميل على الإشعار، انتقل للخطوة: إنهاء المكالمة (نجاح).</p>
        `
    },

    // السيناريو الدفع اي فواتيركم
    'pay-efawateer': {
        title: 'الدفع عن طريق إي فواتيركم',
        badge: 'إي فواتيركم',
        content: `
            <h3>الدفع عبر الرقم المرجعي (E-Fawateercom)</h3>
            <div class="dialog-box agent success">
                <p><strong>الموظف:</strong> المواد الآن موجودة على حسابك وهسا رح يوصلك على الرقم الأول **رقم مرجعي** برسالة نصية (SMS). استعمل هذا الرقم للدفع من خلال خدمة إي فواتيركم. بإمكانك الدفع من خلال **تطبيق البنك أو أقرب محل صرافة أو أي محل هواتف**.</p>
            </div>
            <h4 style="margin-top: 20px;">وصل الرقم المرجعي</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> تمام وصلني يعطيكم العافيه.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: إنهاء المكالمة (نجاح).</p>
            <h4 style="margin-top: 20px;">ما وصل الرقم المرجعي</h4>
            <div class="dialog-box client">
                <p><strong>العميل:</strong> ما وصلني الرقم المرجعي.</p>
            </div>
            <div class="dialog-box agent danger">
                <p><strong>الموظف:</strong> تمام ثبتلك طلبك كمان مرة ممكن تشيك الآن.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: إنهاء المكالمة (نجاح).</p>
        `
    },

    // السيناريو الدفع كاش (تحصيل)
    'pay-cash': {
        title: 'الدفع كاش (تحصيل)',
        badge: 'كاش',
        content: `
            <h3>الدفع كاش (تحصيل عبر مندوب)</h3>
            <div class="dialog-box agent info">
                <p><strong>الموظف:</strong> تمام ولا يهمك. قيمة طلبك مع التحصيل بتصير **(المبلغ الموجود على الأدمن)**. وإن شاء الله المندوب خلال **يوم إلى 3 أيام** رح يتواصل معك ليسلمك الوصل ويستلم المبلغ، لكن **المواد الآن فعالة بحسابك وبتقدر تباشر بالدراسة**.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: إنهاء المكالمة (نجاح).</p>
        `
    },

    // السيناريو الدفع فيزا
    'pay-visa': {
        title: 'الدفع عن طريق فيزا',
        badge: 'فيزا',
        content: `
            <h3>الدفع عبر رابط الفيزا</h3>
            <div class="dialog-box agent warning">
                <p><strong>الموظف:</strong> تمام رح أزودك بلينك الموقع لتثبت طلبك وعند خيار الدفع اختار فيزا. وللحفاظ على سرية معلوماتك، **أكمل الطلب بنفسك**، ومعلومات الحساب رح توصلك عبر الـ SMS.</p>
            </div>
            <p class="next-step-indicator">انتقل للخطوة: إنهاء المكالمة (نجاح).</p>
        `
    },

    // ------------------------------------
    // إنهاء المكالمة (نجاح)
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
    // إنهاء المكالمة (رفض نهائي)
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