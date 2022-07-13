export const setNavLinkColors = () => {
  const experience = document.getElementById('experience') as HTMLElement;
  const projects = document.getElementById('projects') as HTMLElement;
  const skills = document.getElementById('skills') as HTMLElement;

  const navLinks = Array.from(document.getElementsByClassName('nav-link') as HTMLCollectionOf<HTMLElement>);

  const clearNavLinkColors = () => {
    navLinks.forEach((element) => {
      element.style.color = '';
    });
  };

  if (window.innerWidth > 800) {
    switch (true) {
      case window.scrollY < experience.offsetTop - 150:
        clearNavLinkColors();
        break;
      case window.scrollY < projects.offsetTop - 150:
        clearNavLinkColors();
        navLinks[0].style.color = '#af4d54';
        break;
      case window.scrollY < skills.offsetTop - 150:
        clearNavLinkColors();
        navLinks[1].style.color = '#af4d54';
        break;
      default:
        clearNavLinkColors();
        navLinks[2].style.color = '#af4d54';
    }
  } else {
    clearNavLinkColors();
  }
};
