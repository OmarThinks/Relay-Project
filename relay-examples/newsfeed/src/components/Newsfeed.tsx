import * as React from "react";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { OperationType, graphql } from "relay-runtime";
import Story from "./Story";
import { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
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

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    OperationType,
    NewsfeedContentsFragment$key
  >(NewsfeedContentsFragment, queryData);

  function onEndReached() {
    loadNext(3);
  }

  const storyEdges = data.viewer?.newsfeedStories?.edges || [];

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => {
        if (!storyEdge?.node) {
          return null;
        }

        return <Story story={storyEdge.node} key={storyEdge.node.id} />;
      })}

      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </div>
  );
}
