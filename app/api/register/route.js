import prisma from "@/helpers/prisma";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import { sendVerificationMail } from "../helpers/mailer";

const generateRandomCode = () => {
    const min = 100000;
    const max = 999999;

    return Math.floor(Math.random() * (max - min) + min);
}

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const code = generateRandomCode();

        if (!email || !password) {
            return NextResponse.json({ message: "Both fields are required" }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10)
            }
        })

        await prisma.verificationCode.create({
            data: {
                code,
                user_id: user.id
            }
        })

        await sendVerificationMail(email, code);

        const { password: hashedPasswrod, ...result } = user;
        return NextResponse.json({ result }, { status: 201 });

    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Something went wrong while trying to register", result: e }, { status: 500 });
    }
}
