class LeavesController < ApplicationController
   skip_before_action :verify_authenticity_token
   def new
    @leave = Leave.new
    render 'new', formats: [:html], layout: false
   end

   def index
   end

   def create
     @leave = Leave.new(leave_params)
      if @leave.save
	 flash[:notice] = "请假单创建成功。"
	 redirect_to root_path
      end
   end

   def fetch
     @leaves = Leave.where(requestor: current_user.username)
     render json: @leaves
   end

   def fetch_toapprove
     @leaves = Leave.where(approve_status: "待审批")
     render json: @leaves
   end

 #  def toapprove
 #    leave = Leave.where(:id => params["id"])
 #    leave.first["approve_status"]= "已批准"
#     leave.save!
 #  end

# Handle approve button
 def toapprove
  leave = Leave.find(params[:id])
  leave.update(approve_status: "已批准")
  #redirect_to root_path, notice: "请假单已批准。"
 end

 def toreject
  leave = Leave.find(params[:id])
  leave.update(approve_status: "已拒绝")
 end

private

  def leave_params
    params.require(:leave).permit(:start_date, :end_date, :reason, :leave_type, :requestor, :approve_status)
  end
end
