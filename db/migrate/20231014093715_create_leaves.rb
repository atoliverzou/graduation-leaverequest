class CreateLeaves < ActiveRecord::Migration[7.0]
  def change
    create_table :leaves do |t|
      t.date :start_date
      t.date :end_date
      t.text :reason
      t.string :leave_type

      t.timestamps
    end
  end
end
