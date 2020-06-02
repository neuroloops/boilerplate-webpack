import './styles/styles.scss';
import logoPath from './images/logo.svg';
import favicon from './images/favicon.png';

const version = 4;

document.getElementById('title').innerHTML = `bonjour de Webpack ${version}`;

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;

const faviconImg = document.getElementById('favicon');
faviconImg.href = favicon;
