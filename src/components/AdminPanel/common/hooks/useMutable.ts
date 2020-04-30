import { BehaviorSubject } from "rxjs";
import { useCallback, useEffect, useState } from "react";
import { useObservable } from "react-use";

type ChangeValue<T> = (bs$: BehaviorSubject<T>) => any;

export function useMutable<T>(defaultValue: T) {
  // ): [BehaviorSubject<T>, (val: T) => any] {
  // ): [T, (val: T) => any] {
  // ): [T, (fn: ChangeValue<T>) => any] {
  //   const obs$ = new BehaviorSubject(defaultValue);
  //   const [value, setValue] = useState(defaultValue);
  //   useEffect(() => {
  //     const s = obs$.subscribe(setValue);
  //     return () => s.unsubscribe();
  //   }, [obs$]);
  //   return value;
  // //   const obs$ = new BehaviorSubject(defaultValue);
  // //   const value = useObservable(obs$, defaultValue);
  //   //   const changeValue = (val: T) => obs$.next(val);
  //   function changeValue(func: (obs: BehaviorSubject<T>) => any) {
  //     return func(obs$);
  //   }
  //   //   useEffect(() => {
  //   //     const s = obs$.subscribe(update);
  //   //     return () => s.unsubscribe();
  //   //   }, [observable$]);
  //   return value;
  //   return [value, changeValue];
  // }
}
