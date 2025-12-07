import { sessionService } from "@/entities/user/server";
import { LogOutButton } from "@/features/auth/ui/logout-button";

export default async function DashboardPage() {
  const { session } = await sessionService.verifySession();
  return (
    <div className="p-8 h-screen">
      <h1>Добро пожаловать на Dashboard!</h1>
      <p>Здесь будут ваши тесты, результаты и статистика.</p>
      <LogOutButton />
    </div>
  );
}
