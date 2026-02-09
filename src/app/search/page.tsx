import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import SearchContent from "@/components/search/SearchContent";
import { getProperties } from "@/app/actions/property-actions";

export default async function SearchPage() {
    const result = await getProperties();
    const properties = (result.success && result.data) ? result.data : [];

    return (
        <div className="min-h-screen pt-20 bg-white">
            <Suspense fallback={
                <div className="flex items-center justify-center h-[50vh]">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-primary/50" />
                </div>
            }>
                <SearchContent initialProperties={properties} />
            </Suspense>
        </div>
    );
}
