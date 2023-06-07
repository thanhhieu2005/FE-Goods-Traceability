import { Modal } from "antd";

export const ShowModalCreateNewItem = ({ myProps: props }: any) => {
    return (
      <>
        <Modal
          title={props.title}
          open={props.isOpen}
          // footer={null}
          okText={props.okText}
          onOk={props.onOk}
          onCancel={props.onCancel}
          closable={props.closable ?? false}
          maskClosable={props.maskClosable ?? false}
          destroyOnClose={props.destroyOnClose ?? true}
          confirmLoading={props.confirmLoading}
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