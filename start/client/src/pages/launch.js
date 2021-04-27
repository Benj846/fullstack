import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { LAUNCH_TILE_DATA } from "./launches";
import { Loading, Header, LaunchDetail } from "../components";
import { ActionButton } from "../containers";
import { RouteComponentProps } from "@reach/router";

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        F
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;
const Launch = ({ launchId }) => {
  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { launchId },
  });
  if (loading) return <Loading />;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>Not Found</p>;

  return (
    <Fragment>
      <Header image={}>
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default Launch;
