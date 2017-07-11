class Ajax::Api::SyncController < ApplicationController
  include WardenHelper

  ###################### ACTION ##################################
  # 取得通知訊息
  def notification
    obj = ::Api::Sync::Notification.new notification_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 取得未讀通知
  def notification_unread
    obj = ::Api::Sync::NotificationUnread.new notification_unread_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 未讀數量
  def notification_unread_count
    obj = ::Api::Sync::NotificationUnreadCount.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 已讀通知書量
  def notification_read
    obj = ::Api::Sync::NotificationRead.new notification_read_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 取回聊天室
  def chat_rooms
    obj = ::Api::Sync::ChatRooms.new chat_rooms_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 取回聊天內容
  def chat_logs
    obj = ::Api::Sync::ChatLogs.new chat_logs_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  ###################### PARAMS ##################################
  protected
  def notification_params
    # type : String =>  NOTIFY_PROPANGANDA, NOTIFY_CONTRACT, NOTIFY_XMPP, REPORT, NOTIFY_ITEM, NOTIFY_LOGISTICS, SYSTEM;
    # create_time : long => 上次最後更新時間
    params.permit(:type, :create_time).merge(current_uid_params)
  end

  def notification_unread_params
    # size : Int => 未讀訊息數量
    params.permit(:size).merge(current_uid_params)
  end

  def notification_read_params
    # type : String =>  NOTIFY_PROPANGANDA, NOTIFY_CONTRACT, NOTIFY_XMPP, REPORT, NOTIFY_ITEM, NOTIFY_LOGISTICS, SYSTEM
    params.permit(:type).merge(paging_params).merge(current_uid_params)
  end

  def chat_rooms_params
    # name : String => 搜尋名字 (option) 如果設NULL，只搜尋與自己有關的聊天室
    params.permit(:name).merge(paging_params).merge(current_uid_params)
  end

  def chat_logs_params
    # my_uid : String => 自己UID
    # target_uid : String => 對方UID
    # size: Int
    # index: Int
    params.permit(:my_uid, :target_uid).merge(paging_params)
  end

end
