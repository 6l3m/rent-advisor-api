import AdsService from '../services/ads-service';
import Axios from 'axios';
import config from '../config';

describe('Get ads', () => {
  const adsDTO = {
    inseeCode: 750119,
    budget: 1500
  };
  const url =
    `https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1` +
    `&pxMax=${adsDTO.budget}&idtt=1&naturebien=1&ci=${adsDTO.inseeCode}`;

  it('get response as string', async () => {
    const resp = await Axios.get(url, config.axios.request.config);
    console.log(resp.data);
    expect(resp.data).toBeDefined();
  });

  it('get ads from response', async () => {
    const adsAsString = await AdsService.prototype.getAds(adsDTO);
    // adsAsString.replace('\\\\"', '');
    console.log(adsAsString.substring(39400, 39475));
    const ads = JSON.parse(adsAsString.toLowerCase());
    console.log(ads);
    expect(ads).toBeDefined();
  });
});
