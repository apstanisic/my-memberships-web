import {
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Box,
  LinearProgress,
} from "@material-ui/core";
// import { DropzoneArea } from "material-ui-dropzone";

// import { Padding } from "src/components/common/Padding";
import { Form, Formik } from "formik";
import React, { Fragment, useState, useRef, useCallback } from "react";
import { TextInput } from "../Common/Input/TextInput";
import { useEditOrCreateView } from "../Common/useEditOrCreateView";
import { Location } from "./Location";
import { validLocation } from "./validLocation";
import { useFileDropzone } from "../Common/Input/FileDropzone";
import { ShouldShow } from "../Common/ShouldShow";
import { http } from "src/core/http";
import { useUrls } from "../Common/useUrls";
import { useSnackbar } from "notistack";
import { wait } from "src/core/utils/helpers";
import { useMutable } from "../Common/hooks/useMutable";
import { useObservable } from "react-use";
import { BehaviorSubject } from "rxjs";
// const Box;

export function LocationForm({ isUpdate }: { isUpdate: boolean }) {
  // Tabs
  const [tab, setTab] = useState(0);

  // Edit or delete
  const [location, onSubmit, cancel] = useEditOrCreateView({
    transform: Location.create,
    method: isUpdate ? "PUT" : "POST",
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

  return (
    <Formik
      initialValues={location || {}}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={async data => {
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
            .post(`${urls.remote(Location.NAME, savedLocation.id)}/images`, fd)
            .then(res => {
              console.log("success");

              incProgress();
            })
            .catch(e => {
              console.log(e);
            });
        });
      }}
      validationSchema={validLocation}
    >
      {props => (
        <Card>
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={(e, val) => setTab(val)}
          >
            <Tab label="Basic" />
            <Tab label="Workhous" />
            <Tab label="Photos" />
          </Tabs>
          <CardContent>
            <Form>
              {tab === 0 && (
                <div>
                  <TextInput name="name" form={props} />
                  <TextInput name="address" form={props} />
                  <TextInput
                    name="phoneNumber"
                    form={props}
                    label="Phone number"
                  />
                  <TextInput name="email" form={props} type="email" />
                  <TextInput name="lat" form={props} type="number" />
                  <TextInput name="long" form={props} type="number" />
                </div>
              )}{" "}
              {tab === 1 && (
                <div>
                  <TextInput
                    name="workingHours.monday"
                    label="Monday"
                    form={props}
                  />
                  <TextInput
                    name="workingHours.tuesday"
                    label="Tuesday"
                    form={props}
                  />
                  <TextInput
                    name="workingHours.wednesday"
                    label="Wednesday"
                    form={props}
                  />
                  <TextInput
                    name="workingHours.thursday"
                    label="Thursday"
                    form={props}
                  />
                  <TextInput
                    name="workingHours.friday"
                    label="Friday"
                    form={props}
                  />
                  <TextInput
                    name="workingHours.saturday"
                    label="Saturday"
                    form={props}
                  />
                  <TextInput
                    name="workingHours.sunday"
                    label="Sunday"
                    form={props}
                  />
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
                      disabled={props.isSubmitting}
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
            </Form>
            <ShouldShow show={progress !== 0}>
              <Box pt={3} pb={1}>
                <LinearProgress value={progress ?? 0} variant="determinate" />
              </Box>
            </ShouldShow>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
