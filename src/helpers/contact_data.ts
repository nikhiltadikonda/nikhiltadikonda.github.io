import envelope from '../images/contact/envelope.svg';
import github from '../images/contact/github.svg';
import linkedin from '../images/contact/linkedin.svg';
import x from '../images/contact/x.svg';
import { ContactItem } from '../types';

const contact_data: ContactItem[] = [
  {
    id: 1,
    name: 'Email',
    img: envelope,
    url: 'mailto:nikhiltadikonda@gmail.com',
    ariaLabel: 'Send email to Nikhil Tadikonda',
  },
  {
    id: 2,
    name: 'GitHub',
    img: github,
    url: 'https://github.com/nikhiltadikonda',
    ariaLabel: 'Visit Nikhil Tadikonda on GitHub',
  },
  {
    id: 3,
    name: 'LinkedIn',
    img: linkedin,
    url: 'https://www.linkedin.com/in/nikhil-tadikonda',
    ariaLabel: 'Visit Nikhil Tadikonda on LinkedIn',
  },
  {
    id: 4,
    name: 'X (Twitter)',
    img: x,
    url: 'https://x.com/nikhiltadikonda',
    ariaLabel: 'Visit Nikhil Tadikonda on X (formerly Twitter)',
  },
];

export default contact_data;
