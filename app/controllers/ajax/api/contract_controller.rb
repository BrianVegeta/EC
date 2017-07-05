class Ajax::Api::ContractController < ApplicationController
  include WardenHelper
  

  # 取回自己的合約
  def get_my_contract
    
    obj = ::Api::Contract::ApiGetMyContracts.new contract_of_me_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  

  protected
  def contract_of_me_params
     #role_type : String =>  BOTH / OWNER / LESSEE
     #type : String => ITEM / SERVICE / SPACE
     params.permit(:role_type, :type).merge(current_uid_params);
  end
  
end