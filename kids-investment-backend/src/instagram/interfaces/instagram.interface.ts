export interface IGResponse {
  graphql: {
    user: {
      edge_followed_by: { count: number };
      edge_owner_to_timeline_media: {
        edges: {
          node: {
            id: string;
            shortcode: string;
            thumbnail_src: string;
            taken_at_timestamp: number;
          };
        }[];
      };
    };
  };
}
