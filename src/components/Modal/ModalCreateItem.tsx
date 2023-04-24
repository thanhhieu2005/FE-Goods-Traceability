import { Modal } from "antd";

export const ShowModalCreateNewItem = ({ myProps: props }: any) => {
    return (
      <>
        <Modal
          title={props.title}
          open={props.isOpen}
          onOk={props.onCreate}
          onCancel={props.onCancel}
          okText={props.okText ?? "Create"}
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{
            fontWeight: "500",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {props.content}
        </Modal>
      </>
    );
  };