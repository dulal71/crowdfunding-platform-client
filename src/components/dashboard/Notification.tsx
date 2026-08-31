"use client";

import deleteNotification from "@/app/lib/service/deleteNotification";
import { INotification } from "@/types/campaign";
import Link from "next/link";
import { useEffect } from "react";
import { AiOutlineBell, AiOutlineClose } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { getNotificationUrl } from "./getNotificationUrl";
import readNotification from "@/app/lib/service/readNotification";
import { useRouter } from "next/navigation";

type NotificationProps = {
  isNotifOpen: boolean;
  setIsNotifOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unreadCount: number;
  notifRef: React.RefObject<HTMLDivElement | null>;
  notifications: INotification[];
};

const Notification = ({
  isNotifOpen,
  setIsNotifOpen,
  unreadCount,
  notifRef,
  notifications,
}: NotificationProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifRef, setIsNotifOpen]);
  const  router = useRouter()
  const handleDelete = async (id: string) => {
  try {
  const res =  await deleteNotification(id);
  console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const handleNotificationClick = async (n: INotification) => {
  try {
    await readNotification(n._id, { isRead: true });

    router.push(getNotificationUrl(n));
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div ref={notifRef} className="relative z-50">
      {/* Notification Button */}
      <button
        type="button"
        aria-label="Notifications"
        onClick={()=>setIsNotifOpen((prev) => !prev)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-600 transition hover:bg-zinc-50"
      >
        <AiOutlineBell className="text-xl text-accent" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isNotifOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="text-md font-semibold text-zinc-700">
              Notifications{" "}
              
                {unreadCount > 0 && (
                   <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                     {unreadCount}
                     </span>
                ) }
             
            </div>

            <button
              type="button"
              onClick={() => setIsNotifOpen(false)}
              className="rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            >
              <AiOutlineClose />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-b px-2 py-2 text-xs">
            <button
              type="button"
              className="cursor-pointer text-green-700 hover:underline"
            >
              Mark all as read
            </button>

            <button
              type="button"
              className="cursor-pointer text-zinc-600 hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Notifications */}
          {notifications.length === 0 ? (
            <p className="px-2 py-4 text-sm text-zinc-500">
              You're all caught up.
            </p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div  key={n._id} className=" flex items-center justify-between border-b px-2 py-3 transition last:border-b-0 hover:bg-zinc-50">
                  <div  onClick={()=>handleNotificationClick(n)}>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-medium ${!n.isRead ? 'text-text' :'text-muted'} `}>
                      {n.title}
                    </p>

                    {!n.isRead && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-green-600" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                     <p className={`mt-1 text-[13px] ${n.isRead ?'text-text' :'text-muted'} text-muted`}>
                    {n.message.split(/\s+/).slice(0, 3).join(" ")}
                    {n.message.trim().split(/\s+/).length > 3
                      ? "..."
                      : ""}
                  </p>
                  
                  </div>
                  </div>
                      <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDelete(n._id);
      }}
      className="cursor-pointer p-1"
    >
      <RiDeleteBinLine className="text-red-500" />
    </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;