import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * GET /api/token — dev-only endpoint to extract a Convex-compatible Clerk JWT
 * ⚠️ Remove before deploying to production.
 */
export async function GET() {
    try {
        const { userId, getToken } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Not signed in. Sign into the app at http://localhost:3000 first, then visit this URL." },
                { status: 401 }
            );
        }

        // Try all likely template name casings
        const templateNames = ["convex", "Convex", "CONVEX"];
        let token: string | null = null;
        let successfulTemplate: string | null = null;

        for (const name of templateNames) {
            try {
                token = await getToken({ template: name });
                if (token) { successfulTemplate = name; break; }
            } catch {
                // try next
            }
        }

        if (!token) {
            // Fall back to default session token for debugging
            const defaultToken = await getToken();
            return NextResponse.json({
                error: "Could not get a 'convex' template token.",
                userId,
                defaultTokenPreview: defaultToken ? defaultToken.slice(0, 60) + "... (this is NOT the Convex token)" : null,
                hint: "Check your Clerk Dashboard → JWT Templates. The template must be named EXACTLY 'convex' (all lowercase).",
                clerkDashboard: "https://dashboard.clerk.com",
            }, { status: 500 });
        }

        return NextResponse.json({
            token,
            templateUsed: successfulTemplate,
            usage: "Authorization: Bearer <token>",
            note: "Expires in ~1hr. Revisit this page to refresh.",
        });

    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message ?? "Unexpected error", stack: err?.stack?.slice(0, 200) },
            { status: 500 }
        );
    }
}
