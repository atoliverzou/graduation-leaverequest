require "test_helper"

class LeaveControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get leave_new_url
    assert_response :success
  end
end
