'use client';
import { cn } from '@/lib/utils';
import React, { useRef, useState, useEffect } from 'react';

export const BackgroundBeamsWithCollision = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [beams, setBeams] = useState<{ initialX: number; duration: number; delay: number; className: string }[]>([]);

  useEffect(() => {
    const newBeams = Array.from({ length: 10 }, () => ({
      initialX: Math.random() * window.innerWidth,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      className: `h-${Math.floor(Math.random() * 10 + 5)}`
    }));
    setBeams(newBeams);
  }, []);

  return (
    <div ref={parentRef} className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 pointer-events-none z-20">
        {beams.map((beam, index) => (
          <CollisionMechanism key={index} beamOptions={beam} containerRef={containerRef} parentRef={parentRef} />
        ))}
      </div>
      <div ref={containerRef} style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      initialX?: number;
      duration?: number;
      delay?: number;
      className?: string;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null
  });

  const handleAnimationEnd = () => {
    if (beamRef.current) {
      const beamRect = beamRef.current.getBoundingClientRect();
      const collisionCoordinates = {
        x: beamRect.left + beamRect.width / 2,
        y: beamRect.bottom
      };
      setCollision({ detected: true, coordinates: collisionCoordinates });
      setTimeout(() => setCollision({ detected: false, coordinates: null }), 1500);
    }
  };

  return (
    <>
      <div
        ref={beamRef}
        className={cn(
          'absolute h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent',
          beamOptions.className,
          'animate-beam'
        )}
        style={{
          left: `${beamOptions.initialX || 0}px`,
          transform: 'translateY(-200px)',
          animationDuration: `${beamOptions.duration || 8}s`,
          animationDelay: `${beamOptions.delay || 0}s`
        }}
        onAnimationEnd={handleAnimationEnd}
      />
      {collision.detected && collision.coordinates && (
        <Explosion
          className="absolute"
          style={{
            left: `${collision.coordinates.x}px`,
            top: `${collision.coordinates.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </>
  );
});

CollisionMechanism.displayName = 'CollisionMechanism';

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    directionX: Math.random() * 2 - 1, // Acak arah horizontal
    directionY: Math.random() * 2 - 1, // Acak arah vertikal
    distance: Math.random() * 100 + 50 // Jarak acak
  }));

  return (
    <div {...props} className={cn('absolute z-50', props.className)}>
      {spans.map((span) => (
        <span
          key={span.id}
          className="absolute h-2 w-2 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
          style={
            {
              animation: 'particle-explosion 1s ease-out forwards',
              animationDelay: `${Math.random() * 0.2}s`,
              '--distance-x': `${span.directionX * span.distance}px`,
              '--distance-y': `${span.directionY * span.distance}px`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
