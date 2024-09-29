import { getAdminInformation } from "./funcs/utils.js";
import { notificationsTemplate ,seenNotification} from "./funcs/notifications.js";
const $ = document;
const adminName = $.querySelector("#admin-name");
const adminWelcomeName = $.querySelector("#admin-welcome-name");
const homeNotificationIcon = $.querySelector(".home-notification");
const homeNotificationModalBox = $.querySelector(".home-notification-modal");

window.seenNotification=seenNotification

window.addEventListener("load", () => {
  getAdminInformation().then((admin) => {
    // Protect Cms Routes
    if (admin.role === "ADMIN") {
      // Show Admin Name in Cms Homeoage
      adminName.innerHTML = admin.name;
      adminWelcomeName.innerHTML = admin.name;
    } else {
      location.replace("./../../login.html");
    }

    // show notifications
    homeNotificationIcon.addEventListener("mouseenter", () => {
      homeNotificationModalBox.classList.add("active-modal-notfication");
    });

    homeNotificationModalBox.addEventListener("mouseleave", () => {
      homeNotificationModalBox.classList.remove("active-modal-notfication");
    });

    notificationsTemplate(admin.notifications)

    console.log(admin);
  });
});
