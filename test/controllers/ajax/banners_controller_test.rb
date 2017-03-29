require 'test_helper'

class Ajax::BannersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ajax_banner = ajax_banners(:one)
  end

  test "should get index" do
    get ajax_banners_url
    assert_response :success
  end

  test "should get new" do
    get new_ajax_banner_url
    assert_response :success
  end

  test "should create ajax_banner" do
    assert_difference('Ajax::Banner.count') do
      post ajax_banners_url, params: { ajax_banner: {  } }
    end

    assert_redirected_to ajax_banner_url(Ajax::Banner.last)
  end

  test "should show ajax_banner" do
    get ajax_banner_url(@ajax_banner)
    assert_response :success
  end

  test "should get edit" do
    get edit_ajax_banner_url(@ajax_banner)
    assert_response :success
  end

  test "should update ajax_banner" do
    patch ajax_banner_url(@ajax_banner), params: { ajax_banner: {  } }
    assert_redirected_to ajax_banner_url(@ajax_banner)
  end

  test "should destroy ajax_banner" do
    assert_difference('Ajax::Banner.count', -1) do
      delete ajax_banner_url(@ajax_banner)
    end

    assert_redirected_to ajax_banners_url
  end
end
