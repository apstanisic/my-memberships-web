import { Button, Card, CardContent, Tab, Tabs, Box } from "@material-ui/core";
// import { Padding } from "src/components/common/Padding";
import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { TextInput } from "../Common/Input/TextInput";
import { useEditView } from "../Common/useEditView";
import { Location } from "./Location";
import { validLocation } from "./validLocation";
// const Box;

export function LocationEdit() {
  const [tab, setTab] = useState(0);
  const [location, onSubmit, cancel] = useEditView(Location.create);

  return (
    <Formik
      initialValues={location || {}}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={onSubmit}
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
          </Tabs>
          <CardContent>
            <Form>
              {tab === 0 ? (
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
              ) : (
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
                {tab === 0 ? (
                  <Box pr={0.5} flexGrow={1}>
                    <Button
                      type="button"
                      onClick={() => setTab(1)}
                      fullWidth
                      key="nosubmit"
                      variant="contained"
                      size="large"
                    >
                      Next page
                    </Button>
                  </Box>
                ) : (
                  <Fragment>
                    <Box flexGrow={1} pr={0.5}>
                      <Button
                        type="button"
                        onClick={() => setTab(0)}
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
                <Box flexGrow pl={0.5}>
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
              </div>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
