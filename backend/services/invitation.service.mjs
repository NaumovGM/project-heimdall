import Invitation from '../models/invitation.model.mjs';

class InvitationService {
    async createInvitation(data) {
        const invitation = new Invitation(data);
        return await invitation.save();
    }

    async findInvitationByPhoneOrPhone(phone, email) {
        return await Invitation.findOne({
            $or: [{ phone }, { email }],
        });
    }

    async findInvitationByID(id) {
        return await Invitation.findById(id);
    }

    async findAllInvitations() {
        return await Invitation.find();
    }
}

export default new InvitationService();
