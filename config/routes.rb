Rails.application.routes.draw do
  root 'index#pages'
  get '/p/(*all)', to: 'index#pages', as: :pages

  namespace :ajax, format: true, constraints: { format: :json } do
    get :startup, to: 'startup#index'

    post 'facebook_login_callback', to: 'sessions#create_by_facebook'
    post 'phone_register', to: 'registration#create_by_phone'
    post 'email_register', to: 'registration#create_by_email'
    post 'phone_verify', to: 'registration#verify_by_phone'
    post 'email_verify', to: 'registration#verify_by_email'
    post 'phone_login', to: 'sessions#create_by_phone'
    post 'email_login', to: 'sessions#create_by_email'
    post 'logout', to: 'sessions#destroy'
    
    namespace :api do 
      post 'get_my_contracts', to: 'contract#get_my_contract'
    end
    namespace :auth do
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

    scope :search, as: :search do
      post 'user', to: 'search#user'
      post 'item', to: 'search#item'
      post 'wish', to: 'search#wish'
      post 'multi', to: 'search#multi'
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
      end
    end
    resources :categories, only: :index
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
