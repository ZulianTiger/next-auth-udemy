import prisma from "@/helpers/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, code } = await request.json();

        const user = await prisma.user.findFirst({
            where: { email: email.toLowerCase() }
        })

        if (!user) {
            return NextResponse({ message: "No users found" }, { status: 400 });
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: { user_id: user.id }
        })

        if (!verificationCode) {
            return NextResponse({ message: "Already verified" }, { status: 400 });
        }

        if (parseInt(code) !== verificationCode.code) {
            return NextResponse({ message: "Code incorrect" }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { is_verified: true }
        })

        await prisma.verificationCode.delete({
            where: { id: verificationCode.id }
        })

        return NextResponse({ message: "Verified" }, { status: 200 });

    }
    catch (e) {
        return NextResponse({ message: "Something went wrong while trying to verify email", result: e }, { status: 500 });
    }
}