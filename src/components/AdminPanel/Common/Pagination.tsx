import { Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Padding } from "components/common/Padding";
import React from "react";
import { useHistory } from "react-router-dom";
import { PaginationMetadata } from "types";
import { AppIcons } from "../Icons";

export function Pagination({ meta }: { meta?: PaginationMetadata }) {
  const history = useHistory();

  if (!meta) return <span></span>;

  return (
    <div className="flex justify-end items-center">
      <Toolbar>
        <Button
          startIcon={<AppIcons.PreviousPage />}
          disabled={meta.isFirstPage}
          onClick={() => {
            if (meta.previousUrl) {
              history.push(`/admin-panel${meta.previousUrl}`);
            }
          }}
        >
          Prev
        </Button>

        <Padding side="l" size={5}>
          <Button
            endIcon={<AppIcons.NextPage />}
            disabled={meta.isLastPage}
            onClick={() => {
              if (meta.nextUrl) {
                history.push(`/admin-panel${meta.nextUrl}`);
              }
            }}
          >
            Next
          </Button>
        </Padding>
      </Toolbar>
    </div>
  );
}
