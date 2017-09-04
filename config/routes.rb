Rails.application.routes.draw do
  root 'index#pages'
  get '/p/(*all)', to: 'index#pages', as: :pages

  namespace :ajax, format: true, constraints: { format: :json } do
    get :startup, to: 'startup#index'

    scope module: :auth do
      # registeration
      post 'phone_register', to: 'registration#phone'
      post 'email_register', to: 'registration#email'
      # verification
      post 'phone_verify', to: 'verification#phone'
      post 'email_verify', to: 'verification#email'
      # resend
      post 'phone_verify_resend', to: 'verification#phone_resend'
      post 'email_verify_resend', to: 'verification#email_resend'
      # sessions
      post 'facebook_login_callback', to: 'sessions#facebook'
      post 'phone_login', to: 'sessions#phone'
      post 'email_login', to: 'sessions#email'
      delete 'logout', to: 'sessions#destroy'
    end

    namespace :api do
      # CONTRACT
      # /client/contract/getMyContractUnreadCount
      post 'contract/calendar', to: 'contract#calendar' #
      post 'contract/cancel', to: 'contract#cancel'
      post 'contract/end_contract', to: 'contract#end_contract'
      post 'contract/find_can_report', to: 'contract#find_can_report' #
      post 'contract/get_my_contract', to: 'contract#get_my_contract' #
      post 'contract/get_our_contracts', to: 'contract#get_our_contracts' #
      post 'contract/get_report', to: 'contract#get_report'
      # post 'contract/get', to: 'contract#get' #
      post 'contract/image_upload', to: 'contract#image_upload'
      post 'contract/item_create', to: 'contract#item_create'
      post 'contract/item_update', to: 'contract#item_update'
      post 'contract/logs', to: 'contract#logs'
      post 'contract/read', to: 'contract#read'
      post 'contract/receive_goods', to: 'contract#receive_goods'
      post 'contract/reject', to: 'contract#reject'
      post 'contract/report', to: 'contract#report'
      post 'contract/return_goods', to: 'contract#return_goods'
      post 'contract/score', to: 'contract#score'

      post 'contract/service_end', to: 'contract#service_end'
      # post 'contract/service_update', to: 'contract#service_update'
      post 'contract/ship_goods', to: 'contract#ship_goods'
      post 'contract/sign', to: 'contract#sign'
      post 'contract/space_create', to: 'contract#space_create'
      post 'contract/space_end', to: 'contract#space_end'
      post 'contract/space_update', to: 'contract#space_update'

      #ITEM
      post 'item/item_add', to: 'item#item_add'
      post 'item/item_update', to: 'item#item_update'
      post 'item/space_add', to: 'item#space_add'
      post 'item/space_update', to: 'item#space_update'
      post 'item/get_item', to: 'item#get_item' #
      post 'item/get_item_by_user', to: 'item#get_item_by_user' #
      post 'item/get_item_by_name', to: 'item#get_item_by_name' #
      post 'item/remove_items', to: 'item#remove_items' #
      post 'item/relative_item', to: 'item#relative_item' #
      post 'item/report', to: 'item#report' #
      post 'item/category_list', to: 'item#category_list' #
      post 'item/message', to: 'item#message' #
      post 'item/message_add', to: 'item#message_add' #

      #SYNC
      # post 'sync/notification', to: 'sync#notification' #
      # post 'sync/notification_unread', to: 'sync#notification_unread' #
      # post 'sync/notification_unread_count', to: 'sync#notification_unread_count' #
      # post 'sync/notification_read', to: 'sync#notification_read' #
      post 'sync/chat_rooms', to: 'sync#chat_rooms' #
      post 'sync/chat_logs', to: 'sync#chat_logs' #


      #USERPROFILE
      post 'userprofile/search', to: 'userprofile#search' #
      post 'userprofile/fb_user_update_name', to: 'userprofile#fb_user_update_name'
      post 'userprofile/track_count', to: 'userprofile#track_count' #
      post 'userprofile/get_track_user', to: 'userprofile#get_track_user' #
      post 'userprofile/bank_info_auto_wire', to: 'userprofile#bank_info_auto_wire' #
      post 'userprofile/bank_info_request_out', to: 'userprofile#bank_info_request_out' #

      #WISHLIST
      #post 'wishlist/save', to: 'wishlist#save' #
      #post 'wishlist/search', to: 'wishlist#search' #
      #post 'wishlist/remove', to: 'wishlist#remove' #
    end

    scope module: :api do
      #PAYMENT
      post 'creditcard_payment', to: 'payment#pay_creditcard'
      post 'get_paymentinfo', to: 'payment#get_order'
      #SEARCH
      post 'multi', to: 'search#multi_search' #
      post 'search_user', to: 'userprofile#search' #
      post 'search_item', to: 'item#get_item_by_name' #
      post 'serach_wish', to: 'wishlist#search' #
      #NOTIFICATION
      post 'get_unread_notify', to: 'sync#notification_unread' #
      post 'count_unread_notify', to: 'sync#notification_unread_count' #
      post 'get_notify', to: 'sync#notification_read' #
      #SUE
      post 'send_sue_request', to: 'contract#report'
      post 'get_sue_report', to: 'contract#get_report'
      #CONTRACT
      post 'reserve_space', to: 'contract#space_create'
      post 'reserve_space_update', to: 'contract#space_update'
      post 'reserve_goods', to: 'contract#item_create'
      post 'reserve_goods_update', to: 'contract#item_update'
      post 'reserve_service', to: 'contract#service_create'
      post 'reserve_service_update', to: 'contract#service_update'
      post 'get_my_order', to: 'contract#get_my_contract' #
      post 'reject_order', to: 'contract#reject' #
      post 'cancel_order', to: 'contract#cancel' #
      post 'accept_order', to: 'contract#sign' #
      post 'ship_item_goods', to: 'contract#ship_goods' #
      post 'return_item_goods', to: 'contract#return_goods' #
      post 'receive_confirm', to: 'contract#receive_goods' #
      post 'score_order', to: 'contract#score' #
      post 'end_service', to: 'contract#service_end' #
      post 'end_space', to: 'contract#space_end' #

      #PAYMENT
      post 'get_balance_list', to: 'payment#search'

      #CALENDAR
      post 'get_calendar', to: 'contract#calendar' #

      #MESSAGEBOARD
      post 'get_message_board', to: 'item#message' #
      post 'add_message', to: 'item#message_add' #

      #OREDERDETAIL
      post 'get_order', to: 'contract#get' #
      post 'get_order_images', to: 'contract#images'
      post 'get_order_logs', to: 'contract#logs'

      #COMMENTS
      post 'get_owner_comments', to: 'userprofile#owner_comments' #
      post 'get_lessee_comments', to: 'userprofile#lessee_comments' #

      #MARKETING
      post 'get_coupon', to: 'marketing#coupon_list' #

      #FOLLOW
      post 'add_follow', to: 'userprofile#track' #
      post 'remove_follow', to: 'userprofile#untrack'
      post 'check_follow', to: 'userprofile#is_tracked' #

      #FAVORITE
      post 'add_fav', to: 'favorite#add' #
      post 'get_fav', to: 'favorite#my_favorite' #
      post 'remove_fav', to: 'favorite#remove' #

      # ITEM
      post 'delete_item', to: 'item#remove_items' #
      post 'item_detail', to: 'item#view_item' #
      post 'create_goods_item', to: 'item#item_add'
      post 'update_goods_item', to: 'item#item_update'
      post 'create_service_item', to: 'item#service_add'
      post 'update_service_item', to: 'item#service_update'
      post 'create_space_item', to: 'item#space_add'
      post 'update_space_item', to: 'item#space_update'

      # WISHLIST
      post 'wish/save', to: 'wishlist#save' #
      post 'get_wish_pond', to: 'wishlist#search' #
      post 'get_wish', to: 'wishlist#get' #
      post 'wish/remove', to: 'wishlist#remove' #

      # MARKETING
      get 'my_coupons', to: 'marketing#coupon_list'
      # ITEMS
      scope :item do
        post 'list', to: 'item#search_item_list'
      end

      # ======================================
      # FORGOT PASSWROD
      # ======================================
      scope :forgot_password do
        post 'email_get_verify', to: 'forgetpassword#email_resend_verify'
        post 'email_get_token', to: 'forgetpassword#mail_get_token'
        post 'email_reset_password', to: 'forgetpassword#mail_reset'
        post 'phone_get_verify', to: 'forgetpassword#mobile_resend_verify'
        post 'phone_get_token', to: 'forgetpassword#mobile_get_token'
        post 'phone_reset_password', to: 'forgetpassword#mobile_reset'
      end

      # ======================================
      # USERPROFILE CONTROLLER
      # ======================================
      post 'user_info', to: 'userprofile#user_general_info'
      post 'get_userprofile', to: 'userprofile#get'
      post 'save_userprofile', to: 'userprofile#save'
      post 'user_bind_facebook', to: 'userprofile#set_facebook'
      post 'user_unbind_facebook', to: 'userprofile#facebook_unbind'
      scope :bank do
        post 'bankacc_update', to: 'userprofile#bank_info_update'
        post 'bankacc', to: 'userprofile#bank_info'
        get 'bankacc/ready', to: 'userprofile#bank_info_ready'
        get 'bankacc/info_ready', to: 'userprofile#bank_info_display_ready'
      end
      scope :password do
        post 'update', to: 'userprofile#update_password'
        get 'exist', to: 'userprofile#is_pwd_exist'
        post 'create', to: 'userprofile#create_password'
        post 'check', to: 'userprofile#checkpwd'
      end
      scope :user do
        post 'update/phone', to: 'userprofile#get_phone_verify_code'
        post 'update/email', to: 'userprofile#get_email_verify_code'
        post 'update/phone/confirm', to: 'userprofile#update_phone'
        post 'update/email/confirm', to: 'userprofile#update_email'
      end
    end

    #SEARCH
    scope :search do
      post 'user', to: 'search#user'
      post 'item', to: 'search#item'
      post 'wish', to: 'search#wish'
      post 'multi', to: 'search#multi'
    end

    scope module: :options do
      # OTHERS
      get 'banks', to: 'banks#index'
      post 'bank_branchs', to: 'banks#branchs'
      get 'cities', to: 'cities#index'
      post 'city_areas', to: 'cities#areas'
      # ITEM
      get 'categories', to: 'categories#index'
    end

    namespace :auth do
      get 'sync', to: 'index#sync'
      get 'get_current_user', to: 'index#get_current_user'
      get 'get_user_info', to: 'index#get_user_info'
      # get 'notifications/test', to: 'notifications#activities'
      resources :notifications, only: :index do
        collection do
          get 'activities'
          get 'contracts'
          get 'systems'
        end
      end
    end

    namespace :mine do
      get 'items', to: 'items#index'
      delete 'items_remove', to: 'items#multi_remove'
      get 'coupons', to: 'coupons#index'
    end

    namespace :user do
      get 'profile/get', to: 'profile#get'
    end

    get 'test', to: 'test#test'
    get 'test2', to: 'test#test2'

    resources :banners, only: :index
    resources :items, only: [:index, :edit], param: :pid
    resources :images, only: [] do
      collection do
        put 'item_cover'
        put 'sue_picture/:cid_no', action: :sue_picture
        put 'avatar/:uid', action: :avatar
        put 'wish/:uid', action: :wish
      end
    end

    resources :addresses, only: [] do
      collection do
        get 'cities'
        get 'zones'
      end
    end
    resources :recommends, only: [] do
      collection do
        get 'categories'
        get 'goods'
        get 'service'
        get 'space'
      end
    end
  end
end
