"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./AuthForm.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const { user, setUser } = useAuth();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePhone = useCallback(
    (phone: string) => /^09\d{9}$/.test(phone),
    []
  );

  const handleLogin = useCallback(async () => {
    if (!validatePhone(phone)) return setError("شماره موبایل معتبر نیست");

    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.results[0]));
    setUser(data.results[0]);
  }, [phone, setUser, validatePhone]);

  useEffect(() => {
    if (user) router.push("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user) return null;

  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <Input
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(e.target.value)
        }
        placeholder="شماره موبایل"
        disabled={!!user}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button onClick={handleLogin} type="submit" disabled={!!user}>
        ورود
      </Button>
    </form>
  );
}
