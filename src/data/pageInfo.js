/**
 * Page Information Data Model
 * Pulls localized metadata for each page from the active i18n context.
 */

export const getPageInfo = (pageId, t) => {
  if (!pageId || !['home', 'ginning', 'oil', 'settings'].includes(pageId)) {
    return null;
  }

  const title = t(`pageInfo.${pageId}.title`);
  const subtitle = t(`pageInfo.${pageId}.subtitle`);
  const purpose = t(`pageInfo.${pageId}.purpose`);
  const howToUse = t(`pageInfo.${pageId}.howToUse`);
  const keyFeatures = t(`pageInfo.${pageId}.keyFeatures`);
  const importantFields = t(`pageInfo.${pageId}.importantFields`);
  const actions = t(`pageInfo.${pageId}.actions`);

  return {
    pageId,
    title: typeof title === 'string' ? title : '',
    subtitle: typeof subtitle === 'string' ? subtitle : '',
    purpose: typeof purpose === 'string' ? purpose : '',
    howToUse: Array.isArray(howToUse) ? howToUse : [],
    keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
    importantFields: Array.isArray(importantFields) ? importantFields : [],
    actions: Array.isArray(actions) ? actions : [],
  };
};

export default getPageInfo;
