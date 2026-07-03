import { useLayoutEffect, useRef, useState } from 'react';
import { useElementSize } from '@mantine/hooks';

const GAP = 10;
const OVERFLOW_BUTTON_WIDTH = 130;

export function useChipOverflow(itemCount: number) {
  const { ref: containerRef, width: containerWidth } = useElementSize<HTMLDivElement>();
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  useLayoutEffect(() => {
    if (!containerWidth) {
      return;
    }

    const widths = measureRefs.current.slice(0, itemCount).map((el) => el?.offsetWidth ?? 0);
    const totalWidth = widths.reduce((sum, width) => sum + width + GAP, 0);

    if (totalWidth <= containerWidth) {
      setVisibleCount(itemCount);
      return;
    }

    let used = OVERFLOW_BUTTON_WIDTH;
    let count = 0;

    for (const width of widths) {
      if (used + width + GAP > containerWidth) {
        break;
      }

      used += width + GAP;
      count += 1;
    }

    setVisibleCount(count);
  }, [containerWidth, itemCount]);

  const setMeasureRef = (index: number) => (el: HTMLDivElement | null) => {
    measureRefs.current[index] = el;
  };

  return { containerRef, setMeasureRef, visibleCount };
}
