Rails.application.routes.draw do
  root 'index#pages'
  get '/p/(*all)', to: 'index#pages', as: :pages

  namespace :ajax, format: true, constraints: { format: :json } do
    resources :banners, only: :index
    resources :items, only: :index do

    end
    resources :categories, only: [] do
      collection do
        get 'goods'
        get 'service'
        get 'space'
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
