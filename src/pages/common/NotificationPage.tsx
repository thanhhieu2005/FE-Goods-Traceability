import NotificationServices from "@/api/api_common/notification_common";
import SpinApp from "@/components/Spin/SpinApp";
import { NotificationModel } from "@/types/notification";
import { dateFormat } from "@/utils/formatDateTime";
import { Col } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const NotificationPage = () => {
  const [listNotification, setListNotification] = useState<NotificationModel[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const observerRef: any = useRef(null);


  const getAllNoti = async () => {
    setIsLoading(true);
    setListNotification([]);
    const res: any = await NotificationServices.getNotificationsScrollByUser(
      page
    );

    if (res.status === 200) {
      res.data.map((element: any) => {
        const noti: NotificationModel = element.notification;

        setListNotification((prev) => [...prev, noti]);
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Col>
        <div className="content-page">
          {listNotification.length !== 0 ? (
            listNotification.map((noti: NotificationModel, index: number) => (
              <Col
                key={index}
                className="noti-css"
                style={{ paddingBottom: "8px" }}
              >
                <p className="date">
                  {moment(noti.createdAt).format(dateFormat)}
                </p>
                <p className="noti-title">{noti.title}</p>
                <p>{noti.message}</p>
                <div className="line" />
              </Col>
            ))
          ) : (
            <div></div>
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </Col>
    </>
  );
};

export default NotificationPage;
