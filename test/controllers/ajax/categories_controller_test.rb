require 'test_helper'

class Ajax::CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ajax_category = ajax_categories(:one)
  end

  test "should get index" do
    get ajax_categories_url
    assert_response :success
  end

  test "should get new" do
    get new_ajax_category_url
    assert_response :success
  end

  test "should create ajax_category" do
    assert_difference('Ajax::Category.count') do
      post ajax_categories_url, params: { ajax_category: {  } }
    end

    assert_redirected_to ajax_category_url(Ajax::Category.last)
  end

  test "should show ajax_category" do
    get ajax_category_url(@ajax_category)
    assert_response :success
  end

  test "should get edit" do
    get edit_ajax_category_url(@ajax_category)
    assert_response :success
  end

  test "should update ajax_category" do
    patch ajax_category_url(@ajax_category), params: { ajax_category: {  } }
    assert_redirected_to ajax_category_url(@ajax_category)
  end

  test "should destroy ajax_category" do
    assert_difference('Ajax::Category.count', -1) do
      delete ajax_category_url(@ajax_category)
    end

    assert_redirected_to ajax_categories_url
  end
end
