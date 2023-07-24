import NotificationServices from "@/api/api_common/notification_common";
import { NotificationModel } from "@/types/notification";
import { dateFormat } from "@/utils/formatDateTime";
import { Col } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

import "./noti.scss";
import { useNavigate } from "react-router-dom";

const NotiPopover = ({ myProps: props }: any) => {
  const [listNotification, setListNotification] = useState<NotificationModel[]>(
    []
  );

  const isCallData: boolean = props.isCall;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllNoti = async () => {
      setIsLoading(true);
      setListNotification([]);
      const res: any = await NotificationServices.getNotificationsByUser();

      if (res.status === 200) {
        res.data.map((element: any) => {
          const noti: NotificationModel = element.notification;

          setListNotification((prev) => [...prev, noti]);
        });
      }

      setIsLoading(false);
    };

    getAllNoti();
  }, [isCallData]);

  const navigate = useNavigate();
  return (
    <>
      {!isLoading ? (
        <div>
          {listNotification.length === 0 ? (
            <p>No Notifcations Yet</p>
          ) : listNotification.length > 5 ? (
            <div>
              {listNotification
                .slice(0, 5)
                .map((noti: NotificationModel, index: number) => (
                  <Col key={index} className="noti-css">
                    <p className="date">
                      {moment(noti.createdAt).format(dateFormat)}
                    </p>
                    <p className="noti-title">{noti.title}</p>
                    <p>{noti.message}</p>
                    <div className="line" />
                  </Col>
                ))}
              <p
                className="show-all"
                // onClick={() => navigate("/notifications")}
              >
                Show more
              </p>
            </div>
          ) : (
            listNotification.map((noti: NotificationModel, index: number) => (
              <Col key={index} className="noti-css">
                <p className="date">
                  {moment(noti.createdAt).format(dateFormat)}
                </p>
                <p className="noti-title">{noti.title}</p>
                <p>{noti.message}</p>
                <div className="line" />
              </Col>
            ))
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default NotiPopover;
