import LoginForm from "@/components/auth/login-form"
import Header from "@/components/layout/header"

export default function Page() {
    return (
        <div>
            <Header />
            <div className="flex min-h-[70svh] w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
