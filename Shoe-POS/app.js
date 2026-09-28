// 1. بيانات الاتصال بقاعدة البيانات الخاصة بك
const supabaseUrl = 'https://dawjuahmdcsecilazvlx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2p1YWhtZGNzZWNpbGF6dmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NDQ1NDgsImV4cCI6MjEwNjEyMDU0OH0.sjZPVvsoQSJGzuqVTNHKgA7aKjf2QbwABQx1UQU0ndA';

// 2. تهيئة الاتصال
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 3. التحكم في نموذج الدخول
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        errorMsg.classList.add('hidden'); 

        // إرسال طلب تسجيل الدخول
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            errorMsg.classList.remove('hidden');
            errorMsg.textContent = 'البريد الإلكتروني أو كلمة المرور غير صحيحة!';
        } else {
            // جلب رتبة المستخدم
            checkUserRole(data.user.id);
        }
    });
}

// 4. دالة التحقق من الصلاحيات والتوجيه
async function checkUserRole(userId) {
    const { data, error } = await supabase
        .from('users_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

    if (data) {
        if (data.role === 'admin') {
            window.location.href = 'admin.html';
        } else if (data.role === 'cashier') {
            window.location.href = 'cashier.html';
        }
    } else {
        errorMsg.classList.remove('hidden');
        errorMsg.textContent = 'لم يتم العثور على صلاحيات لهذا الحساب.';
    }
}