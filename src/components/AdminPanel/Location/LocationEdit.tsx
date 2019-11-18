import { Button, Card, CardContent, Tab, Tabs } from "@material-ui/core";
import { Padding } from "components/common/Padding";
import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { TextInput } from "../Common/TextInput";
import { useEdit } from "../Common/useEdit";
import { Location } from "./Location";
import { validLocation } from "./validLocation";

export function LocationEdit() {
  const [tab, setTab] = useState(0);
  const [location, onSubmit, goBack] = useEdit(Location.NAME, Location.create);

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
                <Padding side="r" size={2} grow>
                  <Button
                    type="button"
                    onClick={goBack}
                    fullWidth
                    /* https://github.com/jaredpalmer/formik/issues/2004 */
                    key="nosubmit"
                    variant="contained"
                    size="large"
                  >
                    Cancel
                  </Button>
                </Padding>
                {tab === 0 ? (
                  <Padding size={0} side="l" grow>
                    <Button
                      type="button"
                      onClick={() => setTab(1)}
                      fullWidth
                      /* https://github.com/jaredpalmer/formik/issues/2004 */
                      key="nosubmit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Next page
                    </Button>
                  </Padding>
                ) : (
                  <Fragment>
                    <Padding grow side="r" size={1}>
                      <Button
                        type="button"
                        onClick={() => setTab(0)}
                        fullWidth
                        /* https://github.com/jaredpalmer/formik/issues/2004 */
                        key="nosubmit"
                        variant="contained"
                        size="large"
                      >
                        Previous
                      </Button>
                    </Padding>
                    <Padding grow side="l" size={1}>
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
                    </Padding>
                  </Fragment>
                )}
              </div>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
