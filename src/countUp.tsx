import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
interface ICountUpProps {
  countTo: number;
  countTimeMs?: number;
  shouldCount: boolean;
}

export function CountUp({
  countTo,
  countTimeMs = 3 * 1000,
  shouldCount
}: ICountUpProps) {
  const [value, setValue] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // reset value on count change, ideally doesn't happen tho
  useEffect(() => {
    setValue(0);
  }, [countTo]);


  const increment = useCallback(() => {
    setValue(v => Math.max(v+1, countTo));
  }, [setValue, countTo]);

  useEffect(() => {
    if (value >= countTo) {
      // @ts-ignore compiler type sux
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }, [
    value,
    intervalId,
    countTo
  ])

  useEffect(() => {
    // @ts-ignore the node type is diff than the browser type :(
    const _intervalId: number = setInterval(
      increment,
      countTimeMs / (countTo - value),
    );

    setIntervalId(_intervalId)

    return () => {
      clearInterval(_intervalId);
      setIntervalId(null);
    }
  }, [shouldCount]);
}