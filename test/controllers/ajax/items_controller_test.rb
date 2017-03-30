require 'test_helper'

class Ajax::ItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ajax_item = ajax_items(:one)
  end

  test "should get index" do
    get ajax_items_url
    assert_response :success
  end

  test "should get new" do
    get new_ajax_item_url
    assert_response :success
  end

  test "should create ajax_item" do
    assert_difference('Ajax::Item.count') do
      post ajax_items_url, params: { ajax_item: {  } }
    end

    assert_redirected_to ajax_item_url(Ajax::Item.last)
  end

  test "should show ajax_item" do
    get ajax_item_url(@ajax_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_ajax_item_url(@ajax_item)
    assert_response :success
  end

  test "should update ajax_item" do
    patch ajax_item_url(@ajax_item), params: { ajax_item: {  } }
    assert_redirected_to ajax_item_url(@ajax_item)
  end

  test "should destroy ajax_item" do
    assert_difference('Ajax::Item.count', -1) do
      delete ajax_item_url(@ajax_item)
    end

    assert_redirected_to ajax_items_url
  end
end
