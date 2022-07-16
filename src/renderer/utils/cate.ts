import { config } from '../core/site/config';

const getCate = () => {
  const index = config.currentSite;
  const site = config.site[index];
  return site.cate;
};

export default { getCate };
