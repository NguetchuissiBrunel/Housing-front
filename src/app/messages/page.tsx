import { getSession } from "@/app/actions/auth-actions";
import MessagesClient from "./MessagesClient";
import { Suspense } from "react";

export default async function MessagesPage() {
    const session = await getSession();

    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center">Chargement...</div>}>
            <MessagesClient initialSession={session} />
        </Suspense>
    );
}
