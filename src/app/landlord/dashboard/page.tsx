import { redirect } from "next/navigation";
import { getSession } from "@/app/actions/auth-actions";
import { getPropertiesByLandlord } from "@/app/actions/property-actions";
import { getBookingsByLandlord } from "@/app/actions/booking-actions";
import { getConversations } from "@/app/actions/message-actions";
import LandlordDashboard from "@/components/dashboard/LandlordDashboard";

export default async function LandlordDashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    if (session.role !== "LANDLORD") {
        redirect("/dashboard");
    }

    // Fetch properties owned by this landlord
    const propertiesResult = await getPropertiesByLandlord(session.id);
    const allProperties = propertiesResult.success ? propertiesResult.data : [];

    // Fetch bookings for these properties
    const bookingsResult = await getBookingsByLandlord(session.id);

    // Fetch conversations
    const conversationsResult = await getConversations(session.id);

    return (
        <LandlordDashboard
            user={session}
            properties={allProperties as any[]}
            bookings={(bookingsResult.success && bookingsResult.data) ? (bookingsResult.data as any[]) : []}
            conversations={(conversationsResult.success && conversationsResult.data) ? (conversationsResult.data as any[]) : []}
        />
    );
}
