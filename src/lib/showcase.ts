// Scroll position that shows project i inside the pinned desktop showcase (null when not pinned).
export function projectScrollTop(i: number): number | null {
  const sc = document.querySelector<HTMLElement>('.showcase');
  if (!sc || !window.matchMedia('(min-width: 901px)').matches) return null;
  const n = Number(getComputedStyle(sc).getPropertyValue('--n')) || 1;
  const travel = sc.offsetHeight - window.innerHeight;
  return sc.getBoundingClientRect().top + window.scrollY + travel * ((i + 0.35) / n);
}
