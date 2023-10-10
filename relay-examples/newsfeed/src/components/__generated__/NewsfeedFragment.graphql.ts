/**
 * @generated SignedSource<<cc9da0233ab4aa795d6548a817fe815e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewsfeedFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewsfeedContentsFragment">;
  readonly " $fragmentType": "NewsfeedFragment";
};
export type NewsfeedFragment$key = {
  readonly " $data"?: NewsfeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewsfeedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewsfeedFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewsfeedContentsFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "8c2ff777822779b188cefd234488480d";

export default node;
