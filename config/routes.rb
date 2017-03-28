Rails.application.routes.draw do
  root 'index#pages'
  get 'test', to: 'index#test'
  get '/page/(*all)', to: 'index#pages'
  get 'gategory', to: 'api#category'
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
