// Экземпляры всех моделей приложения
import Invitation from './invitation.model.mjs';
import Notification from './notification.model.mjs';
import Profile from './profiles/profile.model.mjs';
import ProfileTopic from './profiles/profileTopic.model.mjs';
import ProfileRestriction from './profiles/profileRestriction.model.mjs';
import Session from './session.model.mjs';
import Subscription from './subscription.model.mjs';

const models = {
    Invitations: Invitation,
    Notifications: Notification,
    Profiles: Profile,
    ProfilesRestrictions: ProfileRestriction,
    ProfilesTopics: ProfileTopic,
    Sessions: Session,
    Subscriptions: Subscription,
};

export default models;
