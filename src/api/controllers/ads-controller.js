import AdsService from '../../services/ads-service';

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
        const resp = await AdsService.prototype.getAds(adsDTO);
        res.json({ status: 'OK', data: JSON.parse(resp) });
      } catch (error) {
        res.status(500).json({ status: 'KO', message: error.message });
        throw new Error(error.message);
      }
    }
  );

  router.get('/slapi/ad/photo', 
    async (req, res) => {
      try {
        res.redirect(req.query.url);
      } catch (error) {
        res.status(500).json({ status: 'KO', message: error.message });
        throw new Error(error.message);
      }
    }
  );

}
