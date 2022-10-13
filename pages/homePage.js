import React, { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import About from "../components/home/About";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <div>
      {status === "authenticated" ? (
        <button
          type="button"
          onClick={() => signOut({ callBackUrl: "/login" })}
        >
          logout
        </button>
      ) : (
        <button type="button">login</button>
      )}
      <HeroSection />
      <About />
    </div>
  );
}

export default HomePage;
