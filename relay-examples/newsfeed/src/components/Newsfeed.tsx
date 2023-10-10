import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
import {
  NewsfeedFragment$data,
  NewsfeedFragment$key,
} from "./__generated__/NewsfeedFragment.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedFragment
  }
`;

/*
const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    viewer {
      newsfeedStories(first: 3) {
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
*/

const NewsfeedFragment = graphql`
  fragment NewsfeedFragment on Query {
    ...NewsfeedContentsFragment
  }
`;

/*
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
*/

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

  const data1 = useFragment<NewsfeedFragment$key>(NewsfeedFragment, queryData);

  const { data: a, loadNext } = usePaginationFragment(
    NewsfeedContentsFragment,
    data1 as NewsfeedContentsFragment$key
  );
  //a.viewer.newsfeedStories.edges;

  const storyEdges = a.viewer.newsfeedStories.edges;

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => (
        <Story story={storyEdge.node} key={storyEdge.node.id} />
      ))}
    </div>
  );
}
