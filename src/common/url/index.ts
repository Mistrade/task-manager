export const openUrlInNewTab = (url: string) => {
  const link = window.open(url, '_blank');
  link?.focus();
};
