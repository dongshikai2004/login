// 检查密码强度
function checkPasswordStrength(password) {
    // 密码长度至少为6
    if (password.length == 0) {
        document.getElementById('strength').textContent = "";
        return;
    }
    if (password.length < 6) {
        document.getElementById('strength').textContent = "无效";
        return;
    }

    // 检查是否包含数字和字母
    const hasDigit = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    if (!hasDigit || !hasLetter) {
        document.getElementById('strength').textContent = "无效";
        return;
    }

    // 密码至少为弱强度
    let strength = "弱";

    // 检查长度是否大于10
    if (password.length > 10) {
        strength = "中"; // 至少为中等
    }

    // 检查是否有大写和小写字母
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasBothCase = hasLower && hasUpper;

    // 检查是否包含特殊字符
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

    // 如果同时满足三个条件，则密码强度为强
    if (password.length > 10 && hasBothCase && hasSpecialChar) {
        strength = "强";
    }
    // 如果满足其中一个或两个条件，则密码强度为中
    else if ((password.length > 10) || hasBothCase || hasSpecialChar) {
        strength = "中";
    }

    document.getElementById('strength').textContent = strength;
}

//注册账号
function signup() {
    const username = document.getElementById('text-signup').value;
    const password = document.getElementById('password-signup').value;

    if (localStorage.getItem(username)) {
        showAlertWithCountdown("用户名已存在，请选择其他用户名。",3);
    }
    else if(username.length==0){
        showAlertWithCountdown("请输入用户名",3);
    }
    else {
        localStorage.setItem(username, password);
        showAlertWithCountdown("注册成功！",3);
    }
    
}
// 登录账号
function login() {
    const username = document.getElementById('text').value;
    const password = document.getElementById('password').value;
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === null) {
        showAlertWithCountdown("用户名不存在。",3);
    }
    else if (storedPassword === password) {
        showAlertWithCountdown("登录成功！",3);
    } 
    else {
        showAlertWithCountdown("密码错误。",3);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');

    // 初始显示登录表单
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';

    // 处理登录和注册表单的切换
    signupLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });
});
//模拟alert
function showAlertWithCountdown(message, seconds) {
    const alertElement = document.getElementById('customAlert');
    const messageElement = alertElement.querySelector('.message');
    const countdownElement = alertElement.querySelector('.countdown');

    messageElement.textContent = message;
    countdownElement.textContent = `将在 ${seconds} 秒后关闭`;

    // 显示模态框
    alertElement.style.display = 'block';

    // 开始倒计时
    let count = seconds;
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = `将在 ${count} 秒后关闭`;
        if (--count < 0) {
            clearInterval(countdownInterval);
            hideAlert();
        }
    }, 1000);
}

function hideAlert() {
    const alertElement = document.getElementById('customAlert');
    alertElement.style.display = 'none';
}