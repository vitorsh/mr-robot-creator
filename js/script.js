// Smooth scroll para botões
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#hero .btn');
  btn.addEventListener('click', () => {
    document.querySelector('#trailer').scrollIntoView({ behavior: 'smooth' });
  });
});
