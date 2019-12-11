import Axios from 'axios';
import config from '../config';
import logger from '../loaders/logger';
import unicodeToChar from '../utils/unicodeToChar';

export default class AdsService {
  async getAds(adsDTO) {
    const url =
      `https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1` +
      `&pxMax=${adsDTO.budget}&idtt=1&naturebien=1&ci=${adsDTO.inseeCode}`;
    logger.info(url);
    const resp = await Axios.get(url, config.axios.request.config);
    const dataMatch = resp.data.match('window.initialData =(.*);window.tags');
    const unicodeDataMatch = resp.data.match(
      'window\\["initialData"\\] = JSON.parse\\("(.*)"\\);window\\["tags"\\]'
    );
    if (dataMatch) {
      return dataMatch[1];
    } else if (unicodeDataMatch) {
      return unicodeToChar(unicodeDataMatch[1]);
    }
  }
}
