const { user } = require('../../models');

module.exports = {
  userinfo: async (req, res) => {
    if (!req.session.identifier) {
      res.sendStatus(400);
    } else {

    const { email } = req.body;

    //console.log(req.session);
    if (!req.session.identifier) {
      // 세션 객체에 식별자가 존재하지 않는다면
      res.status(404).send("로그인 후 이용해주세요")
    } else {
      // 세션 객체에 식별자가 존재한다면
      const id = req.session.identifier;
      const userInfo = await user.findOne({
        where: { id: id }
      })

      const {
        username,
        nickname,
        email
      } = userInfo.dataValues;
      res.status(200).send({ username, nickname, email })
      
    }
  }}
}