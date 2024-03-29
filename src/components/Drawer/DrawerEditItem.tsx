import { Button, Drawer, Space } from "antd";

export const ShowDrawerEdit = ({ myProps: props }: any) => {
    return (
      <>
        <Drawer
          width={720}
          title={props.title}
          onClose={props.onClose}
          open={props.onOpen}
          bodyStyle={{ paddingBottom: 80 }}
          closable={false}
          extra={
            <Space>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button onClick={props.onSubmit} loading={props.loading} type="primary">
                {props.nameButtonUpdate ?? 'Update'}
              </Button>
            </Space>
          }
        >
          {props.content}
        </Drawer>
      </>
    );
  };