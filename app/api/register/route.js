import prisma from "@/helpers/prisma";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Both fields are required", result: e }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10)
            }
        })

        const { password: hashedPasswrod, ...result } = user;
        return NextResponse.json({ result }, { status: 201 });

    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Something went wrong while trying to register", result: e }, { status: 500 });
    }
}
