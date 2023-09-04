import LoginForm from "@/components/LoginForm"

export default function Login() {
    return (
        <main className="flex h-screen">
            <div className="w-1/3 flex justify-center items-center">
                <LoginForm />
            </div>
            <div className="w-2/3 bg-[#0f0f16] flex items-center justify-center">
                <img
                    className="w-1/4 object-contain"
                    src="/login.png"
                    alt=""
                />
            </div>
        </main>
    )
}
