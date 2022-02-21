const KINDS = [
  { name: 'enterprise', path: 'enterprise' },
  { name: 'masterdatamanager', path: 'enterprise.masterdatamanager' },
  { name: 'masterdata', path: 'enterprise.masterdatamanager.masterdata' },
];

export default ENTERPRISE_CONTRACT = {
  metadata: {
    kind: { type: 'string', value: 'enterprise' },
    path: { type: 'string', value: 'enterprise' },
    description: { type: 'string', defaultValue: 'Enterprise application' },
  },
  help: {
    en: `# Enterprise application
The main application object of the application.
Contains:
  * application description,
  * application version,
  * copyright,
  * license information,
  * global settings for the behavior of application objects by default`,
    ru: `# Enterprise application
Главный прикладной объект приложения.
Содержит:
  * описание приложения,
  * версию приложения,
  * авторские права,
  * информацию о лицензии,
  * глобальные настройки поведения прикладных объектов по умолчанию`,
    ua: `# Enterprise application
Головний прикладний об'єкт програми.
Містить:
  * опис програми,
  * версію програми,
  * авторські права,
  * інформацію про ліцензію,
  * глобальні налаштування поведінки прикладних об'єктів за замовчуванням`,
    de: `# Enterprise application
Das Hauptanwendungsobjekt der Anwendung.
Enthält:
  * Anwendungsbeschreibung,
  * Anwendungsversion,
  * Urheberrechte ©,
  * Lizenzinformationen,
  * globale Einstellungen für das Verhalten von Anwendungsobjekten standardmäßig`,
  },
}
