import { useQuery, gql } from "@apollo/client";
import { MasterDetail } from "../Task1/MasterDetail";

type GithubResponse = {
  viewer: {
    repositories: { nodes: Array<{ name: string; description: string }> };
  };
};

export function Task2() {
  const query = gql`
    query {
      viewer {
        repositories(first: 10) {
          nodes {
            name
            description
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery<GithubResponse>(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <MasterDetail>
      {data?.viewer.repositories.nodes.map((node) => (
        <MasterDetail.Item payload={{ content: node.name }}>
          {node.name}
        </MasterDetail.Item>
      ))}

      <MasterDetail.Detail>{(payload) => payload.content}</MasterDetail.Detail>
    </MasterDetail>
  );
}
