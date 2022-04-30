({
  metadata: {
    kind: 'commandpanel',
    name: 'developmentPanel',
    title: {
      en: 'Development application',
      ru: 'Разразработка приложения',
    },
  },
  getPanel() {
    return {
      panelItems: [
        {
          name: 'developmentPanel',
          title: {
            en: 'Development application',
            ru: 'Разразработка приложения',
          },
          typePanelItem: 'submenu',
          panelItems: [
            {
              name: 'developmentPanel',
              title: {
                en: 'Development application',
                ru: 'Разразработка приложения',
              },
              typePanelItem: 'submenu',
              panelItems: [

              ],
            },
          ],
        },
      ],
    };
  },
});