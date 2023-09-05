import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await
                        fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password
                            })
                        })

                    const json = await response.json();

                    if (response.status === 200) {
                        return json.result;
                    }
                    else {
                        throw (JSON.stringify(json));
                    }
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
})

export { authHandler as GET, authHandler as POST };