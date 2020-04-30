import React, { useState } from "react";
import { WithId } from "src/types";
import { Struct } from "src/core/utils/helpers";

export function useTableSelection(data: WithId[]) {
  const [selected, setSelected] = useState<Struct>({});

  const selectedLength = Object.keys(selected).length;
  const allSelected = selectedLength === data.length && data.length > 0;
  const intermidiate = selectedLength < data.length && selectedLength > 0;

  function changeOne(key: string, checked: boolean) {
    if (checked) {
      setSelected({ ...selected, [key]: true });
    } else {
      const copied = { ...selected };
      delete copied[key];
      setSelected(copied);
    }
  }

  function changeAll(checked: boolean) {
    if (checked) {
      const ids: Struct = {};
      data.forEach(item => (ids[item.id] = true));
      setSelected(ids);
    } else {
      setSelected({});
    }
  }

  return { changeAll, changeOne, selected, allSelected, intermidiate };
}
