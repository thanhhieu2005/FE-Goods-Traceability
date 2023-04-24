import { icWarning } from "@/assets";
import { Modal, Row } from "antd";

export const ShowModalConfirmDelete = ({ myProps: props }: any) => {
    return (
      <>
        <Modal
          title={props.title}
          open={props.isModalOpen}
          onOk={props.onConfirm}
          onCancel={props.onCancel}
        >
          <Row style={{ display: "flex", flexFlow: "row" }}>
            <img src={icWarning} width="48px" height="48px" />
            <p style={{ fontSize: "16px", display: "flex", marginLeft: "16px" }}>
              {props.content}
            </p>
          </Row>
        </Modal>
      </>
    );
  };