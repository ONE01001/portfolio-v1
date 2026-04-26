import { useEffect, useMemo, useState } from "react";

export function useActiveSection(sectionIds: string[], rootMargin = "-15% 0px -70% 0px") {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  const idsKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < globalLockUntil) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.18, 0.3, 0.45], rootMargin }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [idsKey, rootMargin, sectionIds]);

  return active;
}

// Call this to temporarily lock active section after a nav click.
// It's implemented as a module-level function to keep the hook signature simple for the app.
export function lockActiveSection(ms = 850) {
  globalLockUntil = Date.now() + ms;
}

let globalLockUntil = 0;
