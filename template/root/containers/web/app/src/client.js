import { clientApp } from 'nocms-server/lib/clientApp';
import templates from './config/templates';

clientApp
  .setTemplates(templates)
  .render();
