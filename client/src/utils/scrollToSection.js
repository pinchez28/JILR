export const scrollToSection = (id) => {
  const el = document.getElementById(`${id}-title`);
  if (!el) return;

  const navbar = document.querySelector('nav');
  const navbarOffset = navbar ? navbar.offsetHeight : 100;

  const top =
    el.getBoundingClientRect().top + window.pageYOffset - navbarOffset - 10;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};
