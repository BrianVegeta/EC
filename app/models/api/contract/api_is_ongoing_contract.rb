class Api::Contract::ApiIsOngoingContract < ApiAuthedBase
  
  PATH = '/client/contract/is_item_exist_in_ongoing_contract';
  
  def path
    PATH
  end

end