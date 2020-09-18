const Member = require('../model/Member');
const { httpOkResponse } = require('../helper/http_respone');

exports.createMember = async (req, res, next) => {
  try {
    const { name } = req.body;
    const date = new Date();
    const expired = date.setDate(date.getDate() + 30);
    const memberId = `M-${Date.now()}`;

    const newMember = await new Member({
      name: name,
      expired: expired,
      diskon: 5,
      memberId: memberId,
    });
    httpOkResponse(res, 'Member Successfully inputed', newMember);
  } catch (error) {
    next(error);
  }
};
