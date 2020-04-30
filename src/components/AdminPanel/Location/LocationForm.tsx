import { Box, Button, Card, CardContent, LinearProgress, Tab, Tabs } from "@material-ui/core";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { http } from "src/core/http";
import { wait } from "src/core/utils/helpers";
import { useFileDropzone } from "../common/input/FileDropzone";
import { TextInput } from "../common/input/TextInput";
import { Show } from "../common/ShouldShow";
import { useEditOrCreateView } from "../common/hooks/useEditOrCreateView";
import { useUrls } from "../common/hooks/useUrls";
import { Location } from "./Location";
import { validLocation } from "./validLocation";
// const Box;

export function LocationForm({ isUpdate }: { isUpdate: boolean }) {
  // Tabs
  const [tab, setTab] = useState(0);

  // Edit or delete
  const { onSubmit, goBack: cancel, form } = useEditOrCreateView({
    transform: Location.create,
    method: isUpdate ? "PUT" : "POST",
    config: { validationSchema: validLocation },
  });

  // file upload
  const [Dropzone, files] = useFileDropzone({ files: [] });
  const urls = useUrls();

  // Progress
  const [progress, setProgress] = useState<number>(0);
  const progressRef = useRef(progress);
  const incProgress = useCallback(
    (val?: number) => {
      const newVal = val ?? progressRef.current + 70 / files.length / 2;
      progressRef.current = newVal;
      setProgress(newVal);
    },
    [files.length],
  );

  const stepSubmit = async (data: Partial<Location>) => {
    incProgress(15);
    const savedLocation = await onSubmit(data, false);
    if (!savedLocation) return;

    incProgress(30);
    files.forEach(async (file, i) => {
      incProgress();
      const fd = new FormData();
      fd.append("file", file.file);

      await wait(100 * i);
      http
        .post(
          urls.remoteItem({ resourceName: Location.NAME, resourceId: savedLocation.id }) +
            "/images",
          fd,
        )
        .then(res => {
          console.log("success");

          incProgress();
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  return (
    <Card>
      <Tabs variant="fullWidth" value={tab} onChange={(e, val) => setTab(val)}>
        <Tab label="Basic" />
        <Tab label="Workhous" />
        <Tab label="Photos" />
      </Tabs>
      <CardContent>
        <form onSubmit={form.handleSubmit}>
          {tab === 0 && (
            <div>
              <TextInput name="name" form={form} />
              <TextInput name="address" form={form} />
              <TextInput name="phoneNumber" form={form} label="Phone number" />
              <TextInput name="email" form={form} type="email" />
              <TextInput name="lat" form={form} type="number" />
              <TextInput name="long" form={form} type="number" />
            </div>
          )}{" "}
          {tab === 1 && (
            <div>
              <TextInput name="workingHours.monday" label="Monday" form={form} />
              <TextInput name="workingHours.tuesday" label="Tuesday" form={form} />
              <TextInput name="workingHours.wednesday" label="Wednesday" form={form} />
              <TextInput name="workingHours.thursday" label="Thursday" form={form} />
              <TextInput name="workingHours.friday" label="Friday" form={form} />
              <TextInput name="workingHours.saturday" label="Saturday" form={form} />
              <TextInput name="workingHours.sunday" label="Sunday" form={form} />
            </div>
          )}
          {tab === 2 && (
            // <Dropzon
            <Box py={2}>
              {/* <FileDropzone files={files} /> */}
              <Dropzone />
            </Box>
          )}
          <div className="flex">
            <Box pr={1} flexGrow={1}>
              <Button
                type="button"
                onClick={cancel}
                fullWidth
                /* https://github.com/jaredpalmer/formik/issues/2004 */
                key="nosubmit"
                variant="contained"
                size="large"
              >
                Cancel
              </Button>
            </Box>
            {tab > 0 && (
              <Fragment>
                <Box flexGrow={1} pr={0.5}>
                  <Button
                    type="button"
                    onClick={() => setTab(tab - 1)}
                    fullWidth
                    key="nosubmit"
                    variant="contained"
                    size="large"
                  >
                    Previous
                  </Button>
                </Box>
              </Fragment>
            )}
            {tab < 2 && (
              <Box pr={0.5} flexGrow={1}>
                <Button
                  type="button"
                  onClick={() => setTab(tab + 1)}
                  fullWidth
                  key="nosubmit"
                  variant="contained"
                  size="large"
                >
                  Next page
                </Button>
              </Box>
            )}

            {(tab === 2 || isUpdate) && (
              <Box flexGrow={1} pl={0.5}>
                <Button
                  type="submit"
                  className="pl-1"
                  disabled={form.isSubmitting}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Box>
            )}
          </div>
        </form>
        {progress !== 0 && (
          <Box pt={3} pb={1}>
            <LinearProgress value={progress ?? 0} variant="determinate" />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
