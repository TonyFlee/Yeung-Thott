'use client';

import { useEffect, useRef, useState } from 'react';

export default function MouseFollower() {
  const followerRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(true);

  // Smooth animation
  useEffect(() => {
    let requestId: number;

    const animate = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));

      requestId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(requestId);
  }, [mousePosition]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle click effect
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Handle hover effect (optional: hover over links)
  useEffect(() => {
    const links = document.querySelectorAll('a, button');

    const addHover = () => followerRef.current?.classList.add('hovering');
    const removeHover = () => followerRef.current?.classList.remove('hovering');

    links.forEach((link) => {
      link.addEventListener('mouseenter', addHover);
      link.addEventListener('mouseleave', removeHover);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', addHover);
        link.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999]
        w-5 h-5 rounded-full 
        border-2
        ${isClicking ? 'scale-75 bg-[#468e83] border-[#e3e7d7]' : ''}
        transition-all duration-200 ease-out
        dark:bg-white/10 dark:border-[#e3e7d7]
        bg-black/10 border-[#468e83]
        `}
      style={{
        transform: `translate(${followerPosition.x - 10}px, ${followerPosition.y - 10}px)`,
      }}
    />
  );
}