import Invitation from '../models/invitation.model.mjs';

class InvitationService {
    async createInvitation(data) {
        const invitation = new Invitation(data);
        return await invitation.save();
    }

    async findInvitationByPhone(phone) {
        return await Invitation.findOne({ phone });
    }

    async findInvitationByID(id) {
        return await Invitation.findById(id);
    }

    async findAllInvitations() {
        return await Invitation.find();
    }
}

export default new InvitationService();
