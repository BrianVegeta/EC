Rails.application.routes.draw do
  root 'index#pages'
  get '/p/(*all)', to: 'index#pages', as: :pages

  namespace :ajax, format: true, constraints: { format: :json } do
    resources :banners, only: :index
    resources :items, only: :index
    resources :categories, only: :index
    resources :addresses, only: [] do
      collection do
        get 'cities'
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
