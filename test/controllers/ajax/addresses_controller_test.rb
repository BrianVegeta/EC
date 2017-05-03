require 'test_helper'

class Ajax::AddressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ajax_address = ajax_addresses(:one)
  end

  test "should get index" do
    get ajax_addresses_url
    assert_response :success
  end

  test "should get new" do
    get new_ajax_address_url
    assert_response :success
  end

  test "should create ajax_address" do
    assert_difference('Ajax::Address.count') do
      post ajax_addresses_url, params: { ajax_address: {  } }
    end

    assert_redirected_to ajax_address_url(Ajax::Address.last)
  end

  test "should show ajax_address" do
    get ajax_address_url(@ajax_address)
    assert_response :success
  end

  test "should get edit" do
    get edit_ajax_address_url(@ajax_address)
    assert_response :success
  end

  test "should update ajax_address" do
    patch ajax_address_url(@ajax_address), params: { ajax_address: {  } }
    assert_redirected_to ajax_address_url(@ajax_address)
  end

  test "should destroy ajax_address" do
    assert_difference('Ajax::Address.count', -1) do
      delete ajax_address_url(@ajax_address)
    end

    assert_redirected_to ajax_addresses_url
  end
end
