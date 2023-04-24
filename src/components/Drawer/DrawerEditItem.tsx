import { Button, Drawer, Space } from "antd";

export const ShowDrawerEdit = ({ myProps: props }: any) => {
    return (
      <>
        <Drawer
          width={640}
          title={props.title}
          onClose={props.onClose}
          open={props.onOpen}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button onClick={props.onSubmit} type="primary">
                Update
              </Button>
            </Space>
          }
        >
          {props.content}
        </Drawer>
      </>
    );
  };