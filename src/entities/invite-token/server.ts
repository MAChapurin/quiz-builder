import {
  generateInviteToken,
  markUsedInviteToken,
  validateInviteToken,
} from "./services/invite-token";

export const inviteTokenService = {
  generateInviteToken,
  validateInviteToken,
  markUsedInviteToken,
};
