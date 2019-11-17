import { Button, Card, CardContent, Tab, Tabs } from "@material-ui/core";
import { Padding } from "components/common/Padding";
import { Http } from "core/http";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TextInput } from "../TextInput";
import { Location } from "./Location";
import { validLocation } from "./LocationValidation";

export function LocationEdit() {
  const history = useHistory();
  const { companyId, locationId } = useParams();
  const url = `/companies/${companyId}/locations/${locationId}`;
  const [location, setLocation] = useState<Partial<Location>>({});
  const [tab, setTab] = useState(0);

  useEffect(() => {
    Http.get(url).then(res => setLocation(new Location(res.data)));
  }, [url]);

  function onSubmit(values: Partial<Location>) {
    Http.put(`${url}`, values).then(() => history.push(`${url}/show`));
  }

  return (
    <Formik
      initialValues={location}
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
              {tab === 0 ? (
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
              ) : (
                <div className="flex">
                  <Padding grow={true} side="r" size={1}>
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
                  <Padding grow={true} side="l" size={1}>
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
                </div>
              )}
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
