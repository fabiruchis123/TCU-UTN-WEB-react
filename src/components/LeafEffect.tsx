import React, { useEffect, useState } from 'react';

interface LeafItem {
  id: number;
  left: number;
  duration: number;
  size: number;
}

interface LeafEffectProps {
  isConstruction?: boolean;
}

export const LeafEffect: React.FC<LeafEffectProps> = ({ isConstruction = false }) => {
  const [leaves, setLeaves] = useState<LeafItem[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const maxLeaves = isMobile ? 9 : 13;
    const spawnRate = isMobile ? 3000 : 1200;

    let idCounter = 0;

    const createLeaf = () => {
      const duration = isMobile ? Math.random() * 25 + 15 : Math.random() * 20 + 10;
      const size = isMobile ? Math.random() * 10 + 12 : Math.random() * 14 + 14;
      const left = Math.random() * 95; // % width

      const newLeaf: LeafItem = {
        id: ++idCounter,
        left,
        duration,
        size,
      };

      setLeaves((prev) => {
        const next = [...prev, newLeaf];
        if (next.length > maxLeaves) {
          return next.slice(next.length - maxLeaves);
        }
        return next;
      });

      setTimeout(() => {
        setLeaves((prev) => prev.filter((item) => item.id !== newLeaf.id));
      }, duration * 1000);
    };

    // Initial leaves
    for (let i = 0; i < Math.floor(maxLeaves / 2); i++) {
      createLeaf();
    }

    const interval = setInterval(createLeaf, spawnRate);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="leaf-container" aria-hidden="true" style={{ overflow: 'hidden' }}>
      {leaves.map((leaf) => (
        <img
          key={leaf.id}
          src="/images/hoja.svg"
          alt=""
          className="leaf"
          style={{
            left: `${leaf.left}%`,
            top: 0,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationDuration: `${leaf.duration}s`,
            animationName: isConstruction ? 'fall-construccion' : 'fall',
          }}
        />
      ))}
    </div>
  );
};

export default LeafEffect;
