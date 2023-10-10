import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
/*
const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStories {
      id
      ...StoryFragment
    }
  }
`;
*/

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

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});

  const storyEdges = data.viewer.newsfeedStories.edges;

  console.log(data);

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => (
        <Story story={storyEdge.node} key={storyEdge.node.id} />
      ))}
    </div>
  );
}
