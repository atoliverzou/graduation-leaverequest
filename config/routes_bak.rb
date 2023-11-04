Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  #root to: 'home#index'

  authenticated :user do
  root 'home#index', as: :authenticated_root
  end
  #devise_for :users
  #devise_for :users, controllers: {
  #sessions: 'users/sessions'
  #    }
  devise_for :users, controllers: { registrations: 'users/registrations' }
  unauthenticated do
    root 'devise/sessions#new'
  end
  get 'about', to: 'home#about'
  get 'contact', to: 'home#contact'
  patch '/leaves/approve/:id', to: 'leaves#toapprove'
  patch '/leaves/reject/:id', to: 'leaves#toreject'

  resources :leaves, only: [:new, :create]

  get '/leaves/fetch', to: 'leaves#fetch'
  get '/leaves/fetch_toapprove', to: 'leaves#fetch_toapprove'

devise_scope :user do
  get "/users/fetch_balance", to: "users/sessions#fetch_balance"
end
  #get '/users/fetch_balance', to: 'users/sessions#fetch_balance'
  # Defines the root path route ("/")
  # root "articles#index"
  devise_for :users do
    delete 'users/sign_out', to: 'devise/sessions#destroy'
  end
end


