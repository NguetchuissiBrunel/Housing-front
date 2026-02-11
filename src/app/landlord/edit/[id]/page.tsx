import { getPropertyById } from "@/app/actions/property-actions";
import { getSession } from "@/app/actions/auth-actions";
import { notFound, redirect } from "next/navigation";
import EditPropertyClient from "@/components/dashboard/EditPropertyClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
    const { id } = await params;
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const result = await getPropertyById(id);
    const property = result.success ? result.data : null;

    if (!property) {
        notFound();
    }

    // Security check: only the owner can edit
    if (property.ownerId !== session.id) {
        redirect("/landlord/dashboard");
    }

    return <EditPropertyClient property={property} user={session} />;
}
