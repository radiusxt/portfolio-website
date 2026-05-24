import type { ReactNode } from "react";
import { Flex } from "@once-ui-system/core"

type BounceProps = {
  children: ReactNode;
  distance: number;
  duration: number;
};

export function Bounce({ children, distance, duration }: BounceProps) {
  return (
    <Flex>
      <style>
        {`@keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(${distance}px);
            }
          }

          .animation {
            animation: bounce ${duration}s ease-in-out infinite;
          }`
        }
      </style>
      <Flex className="animation">
        {children}
      </Flex>
    </Flex>
  );
}
