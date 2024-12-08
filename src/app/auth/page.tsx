import SignIn from "@/components/auth/SignIn";

function AuthPage() {
  return (
    <>
      <main className="flex items-center justify-center min-h-screen select-none bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="rounded-lg border bg-white text-black shadow-sm w-[350px]">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-bold tracking-tight text-center">
              NxGo ✨
            </h3>
            <p className="text-sm text-center text-neutral-500">
              Lleva tus ideas al siguiente nivel con PlanMaster, tu asistente de
              productividad.
            </p>
          </div>
          <div className="p-6 pt-0 text-center">
            <p>
              Optimiza tus proyectos con una agenda única y centraliza tus
              eventos.
            </p>
          </div>
          <div className="flex items-center justify-center p-6 pt-0">
            <SignIn />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 pt-2 pl-2 text-white bg-black rounded-tl-md">
          v0.1.0 ✨
        </div>
      </main>
    </>
  );
}

export default AuthPage;
