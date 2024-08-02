module.exports = async (policyContext, config, { strapi }) => {
  const requesterId = policyContext.state.user.id;
  if (policyContext.state.user.id) {
    const offerId = policyContext.request.params.id;
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      { populate: ["owner"] }
    );
    if (requesterId === offer.owner.id) {
      return true;
    } else {
      return false;
    }
  } else {
    const ownerId = JSON.parse(policyContext.request.body.data).owner;
    if (requesterId !== ownerId) {
      return false;
    } else {
      return true;
    }
  }
};
