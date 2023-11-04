class AddFieldsToLeaves < ActiveRecord::Migration[7.0]
  def change
    add_column :leaves, :requestor, :string
    add_column :leaves, :status, :string
    add_column :leaves, :approver, :string
    add_column :leaves, :approve_status, :string
  end
end
