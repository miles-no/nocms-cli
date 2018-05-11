import ErrorPage from '../templates/ErrorPage.jsx';
import FrontPage from '../templates/FrontPage.jsx';

import sectionData from './sections'; // eslint-disable-line

const getSectionData = (sections) => {
  const data = sections.map((section) => {
    return sectionData.find((item) => {
      // @TODO: gi warning dersom ikke finnes/find returnerer undefined?
      return item.name === section;
    });
  });
  return data;
};

export default [
  {
    id: 'frontPage',
    component: FrontPage,
    name: 'Forsiden',
    siteTemplate: true,
    sections: [],
  },
  {
    id: 'errorPage',
    component: ErrorPage,
    name: '404',
    siteTemplate: false,
    sections: [],
  },
];
