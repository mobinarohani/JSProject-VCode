import { getToken } from "../../funcs/utils.js";

const homeNotificationModalList = document.querySelector(
  ".home-notification-modal-list"
);
const notificationsTemplate = (notifications) => {
  homeNotificationModalList.innerHTML = "";
  if (notifications.length) {
    notifications.forEach((notification) => {
      homeNotificationModalList.insertAdjacentHTML(
        "beforeend",
        `
              <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">${
                    notification.msg
                  }</span>
                  <a class="home-notification-modal-see" onclick='seenNotification(${JSON.stringify(
                    notifications
                  )},${JSON.stringify(notification._id)})'>متوجه شدم </a>
              </li>
              `
      );
    });
  } else {
    homeNotificationModalList.insertAdjacentHTML(
      "beforeend",
      `
              <li class="home-notification-modal-item" style="justify-content: center">
                  <span class="home-notification-modal-text" style="color: #de2020;">پیغامی وجود ندارد </span>
              </li>
              `
    );
  }
};

const seenNotification = async (notifications, notificationId) => {
  const res = await fetch(
    `http://127.0.0.1:4000/v1/notifications/see/${notificationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  removeNotification(notifications, notificationId);
  
  const resultSeen = await res.json();
};

const removeNotification = (notifications, notificationId) => {
  const notificationsArrayFiltered = notifications.filter(
    (notif) => notif._id !== notificationId
  );

  notificationsTemplate(notificationsArrayFiltered);
};

export { notificationsTemplate, seenNotification };
