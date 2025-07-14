"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.scss";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth");
  }, [router, setUser]);

  useEffect(() => {
    if (!user) router.push("/auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1>Welcome to the Dashboard</h1>
      <Button className={styles.logoutButton} onClick={handleLogout}>
        خروج
      </Button>
    </div>
  );
}
