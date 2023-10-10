import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";
import { graphql } from "relay-runtime";
import Story from "./Story";
import { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
import { NewsfeedFragment$key } from "./__generated__/NewsfeedFragment.graphql";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import * as React from "react";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedFragment
  }
`;

const NewsfeedFragment = graphql`
  fragment NewsfeedFragment on Query {
    ...NewsfeedContentsFragment
  }
`;

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  )
  @refetchable(queryName: "NewsfeedContentsRefetchQuery") {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
        @connection(key: "NewsfeedContentsFragment_newsfeedStories") {
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

  const newsFeedData = useFragment<NewsfeedFragment$key>(
    NewsfeedFragment,
    queryData
  );

  const { data, loadNext } = usePaginationFragment(
    NewsfeedContentsFragment,
    newsFeedData as NewsfeedContentsFragment$key
  );

  const storyEdges = data.viewer?.newsfeedStories?.edges || [];

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => {
        if (!storyEdge?.node) {
          return null;
        }

        return <Story story={storyEdge.node} key={storyEdge.node.id} />;
      })}
    </div>
  );
}
