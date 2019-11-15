import Axios from "axios";
import config from '../config';
import logger from '../loaders/logger';

export default class AdsService {

  async getAds(adsDTO) {
    const url = `https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1`
      + `&pxMax=${adsDTO.budget}&idtt=1&naturebien=1&ci=${adsDTO.inseeCode}`;
    logger.info(url);
    const resp = await Axios.get(url, config.axios.request.config);
    return resp.data.match('window.initialData =(.*);window.tags')[1];
  }

}
