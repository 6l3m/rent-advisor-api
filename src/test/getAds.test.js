import Axios from 'axios';
import config from '../config';
import LoggerInstance from '../loaders/logger';
import unicodeToChar from '../utils/unicodeToChar';

describe('Get ads', () => {
  const adsDTO = {
    inseeCode: 750119,
    budget: 1500
  };
  const url =
    `https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1` +
    `&pxMax=${adsDTO.budget}&idtt=1&naturebien=1&ci=${adsDTO.inseeCode}`;
  LoggerInstance.info(url);
  let cfg = config.axios.request.config;
  Axios.interceptors.request.use(config => {
    console.log(config);
    return config;
  });
  // Axios.interceptors.response.use(response => {
  //   delete cfg.headers.cookie;
  //   response.headers['set-cookie'].forEach(cookie => {
  //     cfg;
  //   });
  //   return response;
  // });

  let resp;
  let adsMatch;

  it('get response', async () => {
    resp = await Axios.get(url, cfg);
    expect(resp.data).toBeDefined();
  });

  it('get ads match', () => {
    adsMatch = resp.data.match(
      'window\\["initialData"\\] = JSON.parse\\("(.*)"\\);window\\["tags"\\]'
    );
    expect(adsMatch).not.toBeNull();
  });

  it('get ads as json', () => {
    const adsAsString = unicodeToChar(adsMatch[1]).replace('\\\\"', "'");
    const ads = JSON.parse(adsAsString);
    expect(ads).not.toBeNull();
  });
});
