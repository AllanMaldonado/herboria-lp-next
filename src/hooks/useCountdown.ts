import { useState, useEffect } from "react";

export function useCountdown(hoursToAdd: number = 24) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    let targetTime = localStorage.getItem("herboria_countdown_target");
    if (!targetTime || new Date(targetTime).getTime() < Date.now()) {
      const newTarget = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);
      localStorage.setItem("herboria_countdown_target", newTarget.toISOString());
      targetTime = newTarget.toISOString();
    }

    const targetTimeMs = new Date(targetTime).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetTimeMs - now;

      if (difference <= 0) {
        // Reset if reached zero
        const newTarget = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);
        localStorage.setItem("herboria_countdown_target", newTarget.toISOString());
        setTimeLeft({ hours: hoursToAdd, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [hoursToAdd]);

  return timeLeft;
}
