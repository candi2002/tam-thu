'use strict';

const USERS = {
  an:    { name: 'Phan Thành An', pass: '26', letter: 'letters/an.txt' },
  thai:  { name: 'Phạm Thành Thái', pass: '8424', letter: 'letters/thai.txt' },
  nhi: { name: 'Vòng Tuyết Nhi', pass: '644', letter: 'letters/nhi.txt' },
  vinh: { name: 'Nguyễn Thành Vỉnh', pass: '8464', letter: 'letters/vinh.txt' },
  anh: { name: 'Trịnh Ngọc Tử Anh', pass: '264', letter: 'letters/tuanh.txt' },
  // 
  thien: { name: 'Trần Duy Thiện', pass: '84636', letter: 'letters/thien.txt' },
  khang: { name: 'Nguyễn Hồng Khang', pass: '001', letter: 'letters/khang.txt' },
  kieu: { name: 'Lê Duyên Kiều', pass: '001', letter: 'letters/kieu.txt' },
  // : { name: '', pass: '001', letter: 'letters/.txt' },
  // : { name: '', pass: '001', letter: 'letters/.txt' },
  // : { name: '', pass: '001', letter: 'letters/.txt' },
  // : { name: '', pass: '001', letter: 'letters/.txt' },
  // : { name: '', pass: '001', letter: 'letters/.txt' },
  // : { name: '', pass: '001', letter: 'letters/.txt' },
};

const loginPanel  = document.getElementById('loginPanel');
const letterPage  = document.getElementById('letterPage');
const letterText  = document.getElementById('letterText');
const errorMsg    = document.getElementById('errorMsg');
const userInput   = document.getElementById('user');
const passInput   = document.getElementById('pass');

async function login() {
  const username = userInput.value.trim().toLowerCase();
  const password  = passInput.value;
  const user = USERS[username];

  if (!user || user.pass !== password) {
    showError('Sai tên hoặc mật khẩu.');
    passInput.value = '';
    passInput.focus();
    return;
  }

  clearError();

  let content;
  try {
    const res = await fetch(user.letter);
    if (!res.ok) throw new Error();
    content = await res.text();
  } catch {
    showError('Không thể tải thư. Vui lòng thử lại.');
    return;
  }

  const fullText = `Thân gửi ${user.name},\n\n${content.trim()}`;

  loginPanel.style.display = 'none';
  letterPage.classList.add('visible');
  typeWriter(fullText);
}

function typeWriter(text, speed = 22) {
  letterText.textContent = '';
  letterText.classList.remove('done');
  let i = 0;
  function tick() {
    if (i < text.length) {
      letterText.textContent += text[i++];
      setTimeout(tick, speed);
    } else {
      letterText.classList.add('done'); // hide cursor
    }
  }
  tick();
}

function resetAll() {
  letterPage.classList.remove('visible');
  letterText.textContent = '';
  userInput.value = '';
  passInput.value = '';
  clearError();
  loginPanel.style.display = '';
}

function showError(msg) { errorMsg.textContent = msg; }
function clearError()   { errorMsg.textContent = ''; }

passInput.addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
