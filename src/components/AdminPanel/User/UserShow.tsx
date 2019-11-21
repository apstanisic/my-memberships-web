import React from "react";
import { Card, Paper, CardContent } from "@material-ui/core";
import { useShow } from "../Common/useShow";
import { User } from "core/auth/User";
import { ShowItem } from "../Common/ShowItem";
import { Padding } from "components/common/Padding";

export function UserShow() {
  const [user, Header] = useShow<User>(User.NAME);
  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <Header title={user?.name} />
        <div className="flex">
          <div className="w-1/2">
            <Padding side="y" size={8}>
              <ShowItem name="Email" val={user?.email} />
              <ShowItem name="Phone number" val={user?.phoneNumber} />
            </Padding>
          </div>
          <div className="w-1/2">
            <Padding size={4}>
              <Paper>
                <img
                  alt={user?.name}
                  src={user?.avatar?.md}
                  style={{ minHeight: 200 }}
                />
              </Paper>
            </Padding>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
