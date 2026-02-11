import { redirect } from "next/navigation";
import { getSession } from "@/app/actions/auth-actions";
import { getBookingsByUser } from "@/app/actions/booking-actions";
import { getConversations } from "@/app/actions/message-actions";
import { getFavoritesByUser } from "@/app/actions/favorite-actions";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    if (session.role !== "STUDENT") {
        redirect("/landlord/dashboard");
    }

    const bookingsResult = await getBookingsByUser(session.id);
    const conversationsResult = await getConversations(session.id);
    const favoritesResult = await getFavoritesByUser(session.id);

    const bookings = (bookingsResult.success && bookingsResult.data) ? (bookingsResult.data as any[]) : [];
    const conversations = (conversationsResult.success && conversationsResult.data) ? (conversationsResult.data as any[]) : [];
    const favorites = (favoritesResult.success && favoritesResult.data) ? (favoritesResult.data as any[]) : [];

    return <StudentDashboard user={session} bookings={bookings} conversations={conversations} favorites={favorites} />;
}
