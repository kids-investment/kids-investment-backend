export interface IGResponse {
  graphql: {
    user: {
      edge_followed_by: { count: number };
    };
  };
}
