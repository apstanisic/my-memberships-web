import { Box, IconButton, Toolbar } from "@material-ui/core";
import { ChevronLeft, ChevronRight, FirstPage } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { PaginationMetadata } from "src/types";
import { PaginationPerPage } from "./PaginationPerPage";

/**
 * @Todo Implement "go to last page"
 */
export function Pagination({ meta }: { meta?: PaginationMetadata }) {
  const history = useHistory();

  // If meta not provided, render nothing
  if (!meta) return <span></span>;

  return (
    <div className="flex justify-end items-center">
      <Toolbar>
        <PaginationPerPage />

        <IconButton
          disabled={meta.isFirstPage}
          onClick={() => history.push(`/admin-panel${meta.firstUrl}`)}
        >
          <FirstPage />
        </IconButton>

        <Button
          startIcon={<ChevronLeft />}
          disabled={meta.isFirstPage}
          onClick={() => history.push(`/admin-panel${meta.previousUrl}`)}
        >
          Prev
        </Button>

        {/* Vertical inline spacer */}
        <Box px={2} display="inline"></Box>

        <Button
          endIcon={<ChevronRight />}
          disabled={meta.isLastPage}
          onClick={() => history.push(`/admin-panel${meta.nextUrl}`)}
        >
          Next
        </Button>
      </Toolbar>
    </div>
  );
}
