import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import React from "react";
import { PaginationMetadata } from "types";

export const Pagination = ({
  page,
  perPage,
  total,
  setPage,
  data,
  ...rest
}: any) => {
  const dataArray: any[] = Object.values(data);
  if (dataArray.length === 0) return null;
  const meta: PaginationMetadata = dataArray[0].pagination;

  //   const nbPages = Math.ceil(total / perPage) || 1;
  const nbPages = 4;
  return nbPages > 1 ? (
    <Toolbar className="ml-auto">
      {page > 1 && (
        <Button
          color="primary"
          key="prev"
          endIcon={<ChevronLeft />}
          onClick={() => setPage(meta.previous)}
        >
          Prev
        </Button>
      )}
      {page !== nbPages && (
        <Button
          color="primary"
          key="next"
          endIcon={<ChevronRight />}
          onClick={() => setPage(meta.next)}
          // labelPosition="before"
        >
          Next
        </Button>
      )}
    </Toolbar>
  ) : (
    <div>1 page</div>
  );
};
