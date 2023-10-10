import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedContentsFragment
  }
`;

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query {
    viewer {
      newsfeedStories {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;

export default function Newsfeed() {
  const queryData = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});

  const data = useFragment<NewsfeedContentsFragment$key>(
    NewsfeedContentsFragment,
    queryData
  );

  const storyEdges = data.viewer.newsfeedStories.edges;

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => (
        <Story story={storyEdge.node} key={storyEdge.node.id} />
      ))}
    </div>
  );
}
