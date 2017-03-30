Rails.application.routes.draw do
  root 'index#pages'
  get '/page/(*all)', to: 'index#pages', as: :pages

  namespace :ajax, format: true, constraints: { format: :json } do
    resources :banners, only: :index
    resources :items, only: :index do
      get 'recommend/:category', on: :collection, to: 'items#recommend', as: :recommend
    end
  end
end
