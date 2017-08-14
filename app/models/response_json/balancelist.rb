class ResponseJson::BalanceList
  class << self
    def structure
      {
        id: nil,
        #  -long
        account_id: nil,
        #  -long
        balance_type: nil,
        #  -string
        args_type: nil,
        #  -string
        args: nil,
        #  -string
        args_no: nil,
        #  -string
        remark: nil,
        #  -string
        transaction_time: nil,
        # -long (millisecond)
      }
    end
  end
end
