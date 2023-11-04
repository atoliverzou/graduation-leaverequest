# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  #GET /resource/sign_in
  def new
    super
  end

  def fetch_balance
    @user = current_user
    @remaining_leave = @user.remaining_leave
    render json: { remaining_leave: @remaining_leave }
  end

  #POST /resource/sign_in
  def create
    super
  end

  #DELETE /resource/sign_out
  #def destroy
  #  super
  #end

  def destroy
    sign_out(current_user)
    redirect_to user_session_path, notice: "您已成功退出。"
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end
