const Member = require('../model/Member');
const { httpOkResponse, httpNotFound } = require('../helper/http_respone');

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
    }).save();
    httpOkResponse(res, 'Member Successfully inputed', newMember);
  } catch (error) {
    next(error);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const { memberId, expired } = req.body;
    const find = await Member.findOne({ memberId: memberId });
    if (!find) {
      return httpNotFound(res, 'user not found');
    }
    const date = find.expired;
    const exp = date.setDate(date.getDate() + 30);
    const update = await Member.findOneAndUpdate({ memberId: memberId }, { expired: +(+exp) * expired }, { new: true });
    httpOkResponse(res, 'update successfully', update);
  } catch (error) {
    next(error);
  }
};
