import { MasterDetail } from "./MasterDetail";

export function Task1() {
  return (
    <MasterDetail>
      {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
      <MasterDetail.Item payload={{ content: "Hello Peers" }}>
        Intro
      </MasterDetail.Item>
      <MasterDetail.Item payload={{ content: "Welcome to Ampeers Energy" }}>
        Welcome
      </MasterDetail.Item>
      {/* </div> */}

      <MasterDetail.Detail>{(payload) => payload.content}</MasterDetail.Detail>
    </MasterDetail>
  );
}
