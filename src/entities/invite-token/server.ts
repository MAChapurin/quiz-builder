import {
  generateInviteToken,
  markUsedInviteToken,
  validateInviteToken,
  consumeInviteToken,
} from "./services/invite-token";

export const inviteTokenService = {
  consumeInviteToken,
  generateInviteToken,
  validateInviteToken,
  markUsedInviteToken,
};
