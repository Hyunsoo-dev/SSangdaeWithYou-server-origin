const { smokePlace, user } = require('../../models');

module.exports = {
  placeUpload: async (req, res) => {
    if (!req.cookies.id) {
      res.sendStatus(400);
    } else {
      const { longitude, latitude, comment, placeName } = req.body;
      const username = req.cookies.id;
      const userId = await user.findOne({
        where: {
          username: username,
        },
      });
      await smokePlace
        .findOrCreate({
          where: {
            longitude: longitude,
            latitude: latitude,
          },
          defaults: {
            userId: userId,
            comment: comment,
            placeName: placeName,
          },
        })
        .then(async ([smokeplace, created]) => {
          if (!created) {
            return res.status(400).send('이미 추가된 장소입니다');
          } else {
            res.status(200).send('리스트가 추가되었습니다');
          }
          const data = await smokeplace.get({ plain: true });
          res.status(200).send('리스트가 추가되었습니다');
        })
        .catch((err) => res.status(400).send('입력값이 잘못되었습니다.'));
    }
  },
};
