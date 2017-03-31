require 'test_helper'

class Ajax::RecommendsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ajax_recommend = ajax_recommends(:one)
  end

  test "should get index" do
    get ajax_recommends_url
    assert_response :success
  end

  test "should get new" do
    get new_ajax_recommend_url
    assert_response :success
  end

  test "should create ajax_recommend" do
    assert_difference('Ajax::Recommend.count') do
      post ajax_recommends_url, params: { ajax_recommend: {  } }
    end

    assert_redirected_to ajax_recommend_url(Ajax::Recommend.last)
  end

  test "should show ajax_recommend" do
    get ajax_recommend_url(@ajax_recommend)
    assert_response :success
  end

  test "should get edit" do
    get edit_ajax_recommend_url(@ajax_recommend)
    assert_response :success
  end

  test "should update ajax_recommend" do
    patch ajax_recommend_url(@ajax_recommend), params: { ajax_recommend: {  } }
    assert_redirected_to ajax_recommend_url(@ajax_recommend)
  end

  test "should destroy ajax_recommend" do
    assert_difference('Ajax::Recommend.count', -1) do
      delete ajax_recommend_url(@ajax_recommend)
    end

    assert_redirected_to ajax_recommends_url
  end
end
