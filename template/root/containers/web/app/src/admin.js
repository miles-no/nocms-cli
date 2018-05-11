import nocmsAdminClient from 'nocms-server/lib/client/admin';
import templates from './config/templates';
import sections, { folders } from './config/sections';
import applications from './config/applications';

const config = JSON.parse(document.getElementById('nocms.config').innerHTML);

nocmsAdminClient
  .setSections(sections)
  .setTemplates(templates)
  .setFolders(folders)
  .setLanguages(config.languages)
  .setApplications(applications)
  .render();
