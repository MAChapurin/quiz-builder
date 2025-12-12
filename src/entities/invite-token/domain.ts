export interface InviteTokenEntity {
  id: string;
  quizId: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  label?: string;
}
