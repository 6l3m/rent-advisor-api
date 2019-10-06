import Axios from "axios";

export default (router) => {

  router.post('/slapi/ads',
    async (req, res) => {
      const _inseeCodeArr = req.body.inseeCode.split('');
      _inseeCodeArr.splice(2, 0, '0');
      const adsDTO = {
        inseeCode: _inseeCodeArr.join(''),
        budget: req.body.budget 
      };
      try {
        const url = `https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1`
          + `&pxMax=${adsDTO.budget}&idtt=1&naturebien=1&ci=${adsDTO.inseeCode}`;
        const resp = await Axios.get(url);
        res.json({ status: 'OK', resp: JSON.stringify(resp.data)
          .match('var ava_data =(.*)ava_data.logged')[1]
          .replace(/\\r?\\n|\\r|\\|;/g, '') 
        });
      } catch (error) {
        res.status(500).json({ status: 'KO' });
        throw new Error(error.message);
      }
    }
  );
}
