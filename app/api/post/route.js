import prisma from "@/helpers/prisma";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/helpers/jwt";

export async function GET(request) {
    try {
        const accessToken = request.headers.get("Authorization");
        const decoded = verifyJwt(accessToken);

        if (!accessToken || !decoded) {
            return NextResponse.json({ message: "You are not authorized to get this data" }, { status: 401 });
        }

        const posts = await prisma.post.findMany();
        return NextResponse.json({ posts }, { status: 200 });
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Something went wrong while trying to load the posts", result: e }, { status: 500 });
    }
}
