class AddRemainingLeaveToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :remaining_leave, :integer
  end
end
