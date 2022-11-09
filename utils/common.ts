export const title2route = (title: string, path: string): string => {
  return (
    path.replace('index', '') + title.toLocaleLowerCase().replace(' ', '-')
  );
};
